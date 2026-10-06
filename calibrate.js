/* Real-piano calibration: room noise -> threshold, string tuning -> A4, guided note tests.
   Uses the app's own capture Worklet and pitch Worker; results stay on this device. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id),Seq=window.PianoSequence,name=Seq.noteName;
  const STORAGE='piano-mic-calibration-v1';
  const TESTS=[
    {id:'scale',title:'Thang âm',how:'Đi lên rồi đi xuống, từng nốt rõ ràng, không pedal.',notes:'C4 D4 E4 F4 G4 A4 B4 C5 C5 B4 A4 G4 F4 E4 D4 C4'},
    {id:'repeat',title:'Đánh lại cùng nốt',how:'Đánh lặp C4 tám lần rồi G4 tám lần, khoảng ba lần mỗi giây.',notes:'C4 C4 C4 C4 C4 C4 C4 C4 G4 G4 G4 G4 G4 G4 G4 G4'},
    {id:'bass',title:'Âm trầm',how:'Đánh chậm; chờ nốt vang rõ rồi mới sang nốt sau.',notes:'C2 E2 G2 C3 E3 G3'},
    {id:'dynamics',title:'Nhẹ và mạnh',how:'Bốn nốt đầu đánh thật nhẹ, bốn nốt sau đánh mạnh.',notes:'C4 E4 G4 C5 C4 E4 G4 C5'},
    {id:'pedal',title:'Có pedal',how:'Giữ pedal suốt bài, đánh từng nốt.',notes:'C4 E4 G4 C5 G4 E4 C4'}
  ].map(test=>({...test,expected:Seq.parseSequence(test.notes)}));
  const CHORDS=[['C','C4 E4 G4'],['F','F3 A3 C4'],['G','G3 B3 D4'],['Am','A3 C4 E4'],['Dm','D4 F4 A4'],['G7','G3 B3 D4 F4'],['C','C4 E4 G4']]
    .map(([symbol,notes])=>({symbol,notes:Seq.parseSequence(notes)}));
  const CHORD_FRAMES=5;
  const TUNING_NOTES=[69,60,64,67],TUNING_FRAMES=20,NOISE_SECONDS=3;
  const state={a4:440,thresholdDb:-66,noise:null,tuning:[],tests:{},chords:[],phase:'idle',selected:TESTS[0].id};
  let mic=null,phaseData=null;
  const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
  const median=values=>{const sorted=values.slice().sort((a,b)=>a-b);return sorted.length?sorted[Math.floor(sorted.length/2)]:null;};
  const db=rms=>20*Math.log10(Math.max(rms,1e-8));
  const setText=(id,text)=>{if($(id).textContent!==text)$(id).textContent=text;};

  try{const saved=JSON.parse(localStorage.getItem(STORAGE)||'null');
    if(saved&&saved.a4>=415&&saved.a4<=466)state.a4=saved.a4;
    if(saved&&saved.thresholdDb>=-75&&saved.thresholdDb<=-30)state.thresholdDb=saved.thresholdDb;}catch(_){}

  function configure(){
    if(!mic)return;
    // Tuning is measured against 440 Hz; every other phase listens with the calibrated A4.
    const a4=state.phase==='tuning'?440:state.a4,minRms=10**(state.thresholdDb/20);
    mic.node.port.postMessage({type:'config',minRms});
    mic.worker.postMessage({type:'config',config:{a4,minMidi:36,maxMidi:84,minRms}});
  }
  async function startMic(){
    $('mic-start').disabled=true;setText('status','Đang xin quyền micro…');
    let stream=null,context=null,worker=null;
    try{
      if(!isSecureContext||location.protocol==='file:')throw Error('Mở trang qua http://127.0.0.1:8765/calibrate.html để dùng micro.');
      if(!navigator.mediaDevices?.getUserMedia||!window.AudioWorkletNode||!window.Worker)throw Error('Trình duyệt này chưa hỗ trợ thu âm AudioWorklet.');
      stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:false,noiseSuppression:false,autoGainControl:false},video:false});
      context=new AudioContext({latencyHint:'interactive'});await context.resume();
      await context.audioWorklet.addModule('audio/mic-worklet.js?v=0a7152c-dirty');
      worker=new Worker('audio/pitch-worker.js?v=0a7152c-dirty');
      const node=new AudioWorkletNode(context,'piano-capture',{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1]});
      const channel=new MessageChannel();worker.postMessage({port:channel.port1},[channel.port1]);node.port.postMessage({port:channel.port2},[channel.port2]);
      const source=context.createMediaStreamSource(stream);source.connect(node);node.connect(context.destination);
      const track=stream.getAudioTracks()[0],settings=track.getSettings();
      mic={stream,context,worker,node,source,device:{label:track.label,contextRate:context.sampleRate,track:settings}};state.device=mic.device;
      worker.onmessage=({data})=>receive(data);
      worker.onerror=()=>{stopMic();setText('status','Bộ phân tích bị lỗi. Bật micro lại để thử tiếp.');};
      track.onended=()=>{stopMic();setText('status','Micro đã ngắt kết nối.');};
      configure();
      const processed=['echoCancellation','noiseSuppression','autoGainControl'].filter(key=>settings[key]!==false);
      setText('device',`${track.label||'Micro'} · ${context.sampleRate} Hz${processed.length?' · Trình duyệt chưa xác nhận tắt: '+processed.join(', '):''}`);
      setText('status','Đang nghe. Bắt đầu từ bước 1.');
      $('mic-start').textContent='Tắt micro';
    }catch(error){
      if(!mic){stream?.getTracks().forEach(t=>t.stop());worker?.terminate();context?.close().catch(()=>{});}
      stopMic();
      setText('status',({NotAllowedError:'Quyền micro bị từ chối. Cấp quyền trong trình duyệt rồi thử lại.',NotFoundError:'Không tìm thấy micro.',NotReadableError:'Micro đang bận hoặc không mở được.'})[error.name]||error.message);
    }finally{$('mic-start').disabled=false;render();}
  }
  function stopMic(){
    if(state.phase!=='idle')finishPhase(false);
    if(mic){mic.stream.getTracks().forEach(t=>{t.onended=null;t.stop();});mic.source.disconnect();mic.node.port.postMessage({type:'stop'});mic.node.disconnect();mic.worker.terminate();mic.context.close().catch(()=>{});}
    mic=null;$('mic-start').textContent='Bật micro';$('level').value=0;setText('live-note','—');render();
  }

  function receive(result){
    if(!mic)return;
    const age=mic.context.currentTime-result.time;if(age>.15||age<-.05)return;
    $('level').value=clamp((db(result.rawRms)+65)/65,0,1);
    if(result.status==='note')setText('live-note',name(result.midi));
    else if(result.status==='quiet')setText('live-note','—');
    if(state.phase==='noise')noiseFrame(result);
    else if(state.phase==='tuning')tuningFrame(result);
    else if(state.phase==='test')testFrame(result);
    else if(state.phase==='chords')chordFrame(result);
  }

  function startNoise(){state.phase='noise';phaseData={start:null,levels:[],pitched:0};configure();setText('noise-result','Giữ yên lặng…');render();}
  function noiseFrame(result){
    phaseData.start??=result.time;phaseData.levels.push(db(result.rawRms));if(result.status==='note')phaseData.pitched++;
    setText('noise-result',`Giữ yên lặng… ${Math.max(0,NOISE_SECONDS-(result.time-phaseData.start)).toFixed(1)} s`);
    if(result.time-phaseData.start>=NOISE_SECONDS)finishPhase(true);
  }
  function finishNoise(){
    const levels=phaseData.levels.slice().sort((a,b)=>a-b),p95=levels[Math.floor(levels.length*.95)],med=median(levels);
    // Room noise sits below the threshold with ~12 dB margin; the app's slider allows -75…-30 dBFS.
    state.thresholdDb=clamp(Math.round(p95+12),-75,-30);
    state.noise={medianDb:+med.toFixed(1),p95Db:+p95.toFixed(1),frames:levels.length,pitchedFrames:phaseData.pitched};
    setText('noise-result',`Ồn phòng: trung vị ${med.toFixed(1)} dBFS, p95 ${p95.toFixed(1)} dBFS.${phaseData.pitched?' Có tiếng mang cao độ lúc đo; nên đo lại khi yên hơn.':''}${p95+12>-30?' Phòng khá ồn; nốt nhẹ có thể không được nghe.':''}`);
  }

  function startTuning(){state.phase='tuning';state.tuning=[];phaseData={index:0,cents:[]};configure();renderTuning();render();}
  function tuningFrame(result){
    const target=TUNING_NOTES[phaseData.index];
    if(result.status==='note'&&result.midi===target){phaseData.cents.push(result.cents);if(phaseData.cents.length>=TUNING_FRAMES)nextTuning(false);else renderTuning();}
    else if(result.status==='note')setText('tune-prompt',`Đang nghe ${name(result.midi)}, cần ${name(target)}.`);
    else if(result.status==='uncertain'&&result.rawRms>10**(state.thresholdDb/20)*3)setText('tune-prompt',`Đánh ${name(target)} và giữ. Chưa nhận rõ; nếu đàn lệch nhiều (trên 40 cent) trang không đo được.`);
  }
  function nextTuning(skipped){
    const target=TUNING_NOTES[phaseData.index];
    state.tuning.push({midi:target,cents:skipped?null:+median(phaseData.cents).toFixed(1),frames:phaseData.cents.length});
    phaseData.index++;phaseData.cents=[];
    if(phaseData.index>=TUNING_NOTES.length)finishPhase(true);else renderTuning();
  }
  function finishTuning(){
    const measured=state.tuning.filter(t=>t.cents!==null).map(t=>t.cents);
    renderTuning();
    if(measured.length)state.a4=+clamp(440*2**(median(measured)/1200),415,466).toFixed(1);
    setText('tune-prompt',measured.length?`Đã đo ${measured.length}/${TUNING_NOTES.length} nốt.`:'Chưa đo được nốt nào; giữ A4 hiện tại.');
  }
  function renderTuning(){
    const target=TUNING_NOTES[phaseData?.index];
    if(state.phase==='tuning'&&target!==undefined)setText('tune-prompt',`Đánh và giữ ${name(target)} · ${phaseData.cents.length}/${TUNING_FRAMES}`);
    $('tune-table').hidden=!state.tuning.length;
    $('tune-table').tBodies[0].replaceChildren(...state.tuning.map(t=>{const row=document.createElement('tr');for(const text of [name(t.midi),t.cents===null?'bỏ qua':(t.cents>0?'+':'')+t.cents,t.frames])row.insertCell().textContent=text;return row;}));
  }

  function startTest(){
    const test=TESTS.find(t=>t.id===state.selected);
    state.phase='test';phaseData={test,heard:[],statusCounts:{},start:mic.context.currentTime};configure();renderTest();render();
  }
  function testFrame(result){
    phaseData.statusCounts[result.status]=(phaseData.statusCounts[result.status]||0)+1;
    if(result.status==='note'&&result.attack&&result.time>=phaseData.start){
      phaseData.heard.push({midi:result.midi,time:+(result.time-phaseData.start).toFixed(3),onsetTime:+(result.onsetTime-phaseData.start).toFixed(3),cents:+result.cents.toFixed(1),confidence:+result.confidence.toFixed(3)});
      renderTest();
    }
  }
  function finishTest(){
    const {test,heard,statusCounts}=phaseData,steps=Seq.align(test.expected,heard);
    state.tests[test.id]={notes:test.notes,heard,statusCounts,...Seq.summarize(steps)};
  }
  function renderTest(){
    const test=TESTS.find(t=>t.id===state.selected),running=state.phase==='test'&&phaseData.test===test,saved=state.tests[test.id];
    setText('test-how',test.how);
    let steps;
    if(running){
      // Trailing misses are notes not played yet: show them as upcoming.
      steps=Seq.align(test.expected,phaseData.heard);let end=steps.length;while(end>0&&steps[end-1].kind==='missed')end--;
      steps=[...steps.slice(0,end),...steps.slice(end).map((s,i)=>({...s,kind:i?'pending':'next'}))];
    }else if(saved)steps=Seq.align(test.expected,saved.heard);
    else steps=test.expected.map(expected=>({kind:'pending',expected}));
    $('test-chips').replaceChildren(...steps.map(s=>{const chip=document.createElement('span');chip.className='chip';chip.dataset.kind=s.kind;
      chip.textContent=s.kind==='extra'?`+${name(s.heard.midi)}`:s.kind==='octave'||s.kind==='wrong'?`${name(s.expected)}→${name(s.heard.midi)}`:name(s.expected);
      chip.title=({correct:'Đúng',octave:'Lệch quãng tám',wrong:'Sai nốt',missed:'Không nghe thấy',extra:'Nghe thừa',next:'Nốt tiếp theo',pending:'Chưa chơi'})[s.kind];return chip;}));
    setText('test-result',running?`Đã nghe ${phaseData.heard.length} lần đánh.`:saved?resultText(saved):'');
  }
  const resultText=r=>`Đúng ${r.correct}/${r.expected} · lệch quãng tám ${r.octave} · sai nốt ${r.wrong} · không nghe ${r.missed} · thừa ${r.extra}`;

  const pitchClasses=notes=>[...new Set(notes.map(n=>n%12))].sort((a,b)=>a-b).join();
  function startChords(){
    state.phase='chords';state.chords=[];phaseData={index:0,frames:{},seen:new Map()};
    mic.worker.postMessage({type:'guard-mode',mode:'observe'});configure();renderChords();render();
  }
  function chordFrame(result){
    const guard=result.guard||{status:'loading'},chord=guard.chord||{status:guard.status},target=CHORDS[phaseData.index];
    phaseData.frames[chord.status]=(phaseData.frames[chord.status]||0)+1;
    if(chord.status==='chord'){
      const key=chord.label+'|'+chord.notes.join(),entry=phaseData.seen.get(key)||{label:chord.label,notes:chord.notes,count:0};
      entry.count++;phaseData.seen.set(key,entry);
      setText('chord-heard',`Nghe: ${chord.label} · ${chord.notes.map(name).join(' + ')}`);
      // Advancing only moves the prompt; the detector never receives the target chord.
      if(entry.count>=CHORD_FRAMES&&pitchClasses(chord.notes)===pitchClasses(target.notes))nextChord(entry);
      return;
    }
    const pitches=(guard.pitches||[]).map(p=>name(p.midi)).join(' + ');
    setText('chord-heard',({loading:'Đang nạp bộ nghe hợp âm…',error:'Không nạp được bộ nghe hợp âm. Tắt rồi bật lại micro.',quiet:'Chờ tiếng đàn.',clipping:'Âm quá lớn; giảm âm lượng hoặc lùi micro ra xa.',stabilizing:'Đang xác định…',ambiguous:'Nhiều cách gọi: '+(chord.candidates||[]).map(c=>c.label).join(' / ')})[chord.status]||(pitches?`Chưa thành hợp âm rõ · nghe ${pitches}`:'Chưa chắc chắn.'));
  }
  function nextChord(matched){
    const target=CHORDS[phaseData.index],heard=matched||[...phaseData.seen.values()].sort((a,b)=>b.count-a.count)[0]||null;
    const heardNotes=heard?.notes||[];
    state.chords.push({target:target.symbol,targetNotes:target.notes,heardLabel:heard?.label??null,heardNotes,
      nameOk:!!heard&&pitchClasses(heardNotes)===pitchClasses(target.notes),notesOk:!!heard&&heardNotes.join()===target.notes.join(),
      missing:target.notes.filter(n=>!heardNotes.includes(n)),extra:heardNotes.filter(n=>!target.notes.includes(n)),frames:phaseData.frames});
    phaseData.index++;phaseData.frames={};phaseData.seen=new Map();setText('chord-heard','');
    if(phaseData.index>=CHORDS.length)finishPhase(true);else renderChords();
  }
  function renderChords(){
    const target=CHORDS[phaseData?.index];
    if(state.phase==='chords'&&target)setText('chord-prompt',`Đánh và giữ ${target.symbol} (${target.notes.map(name).join(' + ')}) · ${phaseData.index+1}/${CHORDS.length}`);
    $('chord-table').hidden=!state.chords.length;
    $('chord-table').tBodies[0].replaceChildren(...state.chords.map(c=>{const row=document.createElement('tr');
      for(const text of [c.target,c.heardLabel?`${c.heardLabel} · ${c.heardNotes.map(name).join(' + ')}`:'không nhận được',c.nameOk?'✓':'✗',c.notesOk?'✓':c.heardLabel?`thiếu ${c.missing.map(name).join(', ')||'—'} · thừa ${c.extra.map(name).join(', ')||'—'}`:'✗'])row.insertCell().textContent=text;return row;}));
  }
  const chordText=chords=>`Đúng tên ${chords.filter(c=>c.nameOk).length}/${chords.length} · đủ phím đúng quãng tám ${chords.filter(c=>c.notesOk).length}/${chords.length}`;

  function finishPhase(completed){
    const phase=state.phase;
    if(completed&&phase==='noise')finishNoise();
    if(completed&&phase==='tuning')finishTuning();
    if(completed&&phase==='test')finishTest();
    if(phase==='chords'){mic?.worker.postMessage({type:'guard-mode',mode:'off'});renderChords();setText('chord-prompt',completed?'Đã xong.':'Đã dừng.');setText('chord-heard','');}
    if(!completed&&phase==='noise')setText('noise-result','Đã hủy.');
    if(!completed&&phase==='tuning')setText('tune-prompt','Đã dừng.');
    state.phase='idle';phaseData=null;configure();render();
  }

  function report(){
    return {version:1,date:new Date().toISOString(),userAgent:navigator.userAgent,device:mic?.device??state.device??null,a4:state.a4,thresholdDb:state.thresholdDb,noise:state.noise,tuning:state.tuning,tests:state.tests,chords:state.chords};
  }
  function renderSummary(){
    const rows=[['A4',`${state.a4.toFixed(1)} Hz`],['Ngưỡng âm',`${state.thresholdDb} dBFS`]];
    let total={expected:0,correct:0,octave:0,wrong:0,missed:0,extra:0};
    for(const test of TESTS){const r=state.tests[test.id];if(!r)continue;rows.push([test.title,resultText(r)]);for(const key in total)total[key]+=r[key];}
    if(total.expected)rows.push(['Tổng',`${resultText(total)} (${Math.round(100*total.correct/total.expected)}%)`]);
    if(state.chords.length)rows.push(['Hợp âm (thử nghiệm)',chordText(state.chords)]);
    $('summary').replaceChildren(...rows.map(([label,value])=>{const row=document.createElement('tr');row.insertCell().textContent=label;row.insertCell().textContent=value;return row;}));
  }
  function render(){
    const live=!!mic,busy=state.phase!=='idle';
    setText('threshold',`${state.thresholdDb} dBFS`);setText('a4',`${state.a4.toFixed(1)} Hz`);
    for(const id of ['noise-card','tune-card','test-card','chord-card'])$(id).setAttribute('aria-disabled',String(!live));
    $('noise-run').disabled=!live||(busy&&state.phase!=='noise');$('noise-run').textContent=state.phase==='noise'?'Hủy':'Đo 3 giây im lặng';
    $('tune-run').disabled=!live||(busy&&state.phase!=='tuning');$('tune-run').textContent=state.phase==='tuning'?'Dừng':'Bắt đầu đo';$('tune-skip').hidden=state.phase!=='tuning';
    $('chord-run').disabled=!live||(busy&&state.phase!=='chords');$('chord-run').textContent=state.phase==='chords'?'Dừng':'Bắt đầu';$('chord-skip').hidden=state.phase!=='chords';
    $('test-run').disabled=!live||(busy&&state.phase!=='test');$('test-run').textContent=state.phase==='test'?'Xong':'Bắt đầu';
    $('test-tabs').replaceChildren(...TESTS.map(test=>{const button=document.createElement('button');button.type='button';button.textContent=test.title;
      button.setAttribute('aria-pressed',String(test.id===state.selected));button.dataset.done=String(!!state.tests[test.id]);button.disabled=busy;
      button.addEventListener('click',()=>{state.selected=test.id;render();});return button;}));
    renderTest();renderSummary();
    $('save').disabled=busy;$('download').disabled=busy||(!state.noise&&!state.tuning.length&&!Object.keys(state.tests).length&&!state.chords.length);
  }

  $('mic-start').addEventListener('click',()=>mic?stopMic():startMic());
  $('noise-run').addEventListener('click',()=>state.phase==='noise'?finishPhase(false):startNoise());
  $('tune-run').addEventListener('click',()=>state.phase==='tuning'?finishPhase(false):startTuning());
  $('tune-skip').addEventListener('click',()=>nextTuning(true));
  $('chord-run').addEventListener('click',()=>state.phase==='chords'?finishPhase(false):startChords());
  $('chord-skip').addEventListener('click',()=>nextChord(null));
  $('test-run').addEventListener('click',()=>state.phase==='test'?finishPhase(true):startTest());
  $('save').addEventListener('click',()=>{
    try{localStorage.setItem(STORAGE,JSON.stringify({a4:state.a4,thresholdDb:state.thresholdDb,date:new Date().toISOString()}));
      setText('save-status',`Đã lưu A4 ${state.a4.toFixed(1)} Hz và ngưỡng ${state.thresholdDb} dBFS. App dùng giá trị này từ lần mở tiếp theo.`);}
    catch(_){setText('save-status','Trình duyệt không cho lưu (chế độ riêng tư?). Hãy nhập tay A4 và ngưỡng trong Thiết lập micro.');}
  });
  $('download').addEventListener('click',()=>{
    const blob=new Blob([JSON.stringify(report(),null,2)],{type:'application/json'}),link=document.createElement('a');
    link.href=URL.createObjectURL(blob);link.download=`hieu-chinh-micro-${new Date().toISOString().slice(0,10)}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);
  });
  window.addEventListener('pagehide',stopMic);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&mic){stopMic();setText('status','Micro đã tắt khi rời tab.');}});
  window.pianoCalibration=()=>report();
  render();
})();
