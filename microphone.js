(() => {
  'use strict';
  const _t=globalThis.I18N?.t||((text,args)=>args?text.replace(/\{(\d+)\}/g,(m,i)=>args[i]):text);
  const $=id=>document.getElementById(id);
  const names=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
  class PianoMicrophone {
    constructor({onResult,onStart,onStop,onStateChange,isBlocked,observationOnly}){
      Object.assign(this,{onResult,onStart,onStop,onStateChange,isBlocked,observationOnly});this.generation=0;this.active=false;this.pending=false;this.metrics=[];
      // A4 and threshold saved by calibrate.html for this piano/room.
      try{const saved=JSON.parse(localStorage.getItem('piano-mic-calibration-v1')||'null');
        if(saved?.a4>=415&&saved.a4<=466)$('mic-a4').value=saved.a4;
        if(saved?.thresholdDb>=-75&&saved.thresholdDb<=-30){$('mic-threshold').value=saved.thresholdDb;$('mic-threshold-value').textContent=`${saved.thresholdDb} dBFS`;}}catch(_){}
      $('mic-toggle').addEventListener('click',()=>this.active||this.pending?this.stop():this.start());
      $('mic-a4').addEventListener('change',()=>this.configure());$('mic-threshold').addEventListener('input',()=>this.configure());
      $('mic-guard-toggle').addEventListener('change',()=>this.configureGuard());
      window.addEventListener('pagehide',()=>this.stop());
      document.addEventListener('visibilitychange',()=>{if(document.hidden)this.stop();});
    }
    configure(){
      const a4=Math.max(415,Math.min(466,Number($('mic-a4').value)||440));$('mic-a4').value=a4;
      const db=Number($('mic-threshold').value);$('mic-threshold-value').textContent=`${db} dBFS`;
      this.config={a4,minMidi:36,maxMidi:84,minRms:10**(db/20)};this.node?.port.postMessage({type:'config',minRms:this.config.minRms});this.worker?.postMessage({type:'config',config:this.config});
      this.clearNote(true);
      this.clearChord();
      if(this.active)this.onStart?.();
    }
    status(text){if($('mic-status').textContent!==text){$('mic-status').textContent=text;this.onStateChange?.();}}
    confidenceValue(result){return Number.isFinite(result.confidence)&&result.confidence>=0&&result.confidence<=1?result.confidence:null;}
    showConfidence(result){
      if(result.status!=='note'||!result.attack)return;
      const value=this.confidenceValue(result),available=value!==null;
      const text=available?_t("Tin cậy {0}%",[Math.round(value*100)]):_t('Tin cậy —');
      const output=$('mic-confidence');if(output.textContent!==text)output.textContent=text;
      output.dataset.state=available?'confirmed':'empty';
      output.title=_t("Chỉ số của lần đánh {0}{1} gần nhất, không phải xác suất nhận đúng.",[names[result.midi%12],Math.floor(result.midi/12)-1]);
    }
    configureGuard(){
      this.guardEnabled=$('mic-guard-toggle').checked||!!this.observationOnly?.();
      this.lastGuard=null;
      this.clearChord();$('mic-chord-panel').hidden=!this.guardEnabled;
      this.worker?.postMessage({type:'guard-mode',mode:this.guardEnabled?'observe':'off'});
      $('mic-guard-status').textContent=this.guardEnabled?(this.active?_t('Đang nạp mẫu phổ…'):_t('Bật micro để quan sát đa âm.')):'';
    }
    // Lesson chord target for the answer-aware verifier (null for single notes or none).
    // `options.reference`/`background` come from a per-exercise model and allow single-note targets.
    expect(notes,options={}){
      const next=Array.isArray(notes)&&notes.length>(options.reference?0:1)?notes.slice():null,extra=next&&options.reference?{background:options.background||[],reference:options.reference}:{};
      const key=JSON.stringify([next,extra]);if(key===this.expectKey)return;
      this.expectKey=key;this.expected=next;this.expectOptions=extra;this.worker?.postMessage({type:'expect',notes:next,...extra});
    }
    // Raw mono blocks for single-key takes, from the same microphone source as recognition.
    async startTakes(onBlock){
      if(!this.active||!this.context||!this.source)throw Error(_t('Bật micro trước khi thu phím.'));
      if(!this.takeModule){await this.context.audioWorklet.addModule('audio/take-worklet.js?v=9be74ce-1627866aaad1');this.takeModule=true;}
      this.stopTakes();
      this.takeNode=new AudioWorkletNode(this.context,'piano-take',{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1]});
      this.takeNode.port.onmessage=({data})=>onBlock(data.block,this.context?.sampleRate,data.time);
      this.source.connect(this.takeNode);this.takeNode.connect(this.context.destination);this.takeNode.port.postMessage({type:'arm'});
    }
    stopTakes(){if(!this.takeNode)return;this.takeNode.port.postMessage({type:'stop'});this.takeNode.port.onmessage=null;try{this.source?.disconnect(this.takeNode);}catch(_){}this.takeNode.disconnect();this.takeNode=null;}
    clearChord(message=_t('Bấm bắt đầu để nghe hợp âm.')){this.lastChord=null;this.chordText('—','',message);}
    chordText(label,notes,status){
      for(const [id,text] of [['mic-chord-name',label],['mic-chord-notes',notes],['mic-chord-state',status]])if($(id).textContent!==text)$(id).textContent=text;
    }
    showChord(guard){
      const chord=guard.chord||{status:guard.status};this.lastChord=chord;
      // Spell notes like the chord label (E♭, A♭, B♭) so one panel never mixes D♯ with E♭.
      const notes=(chord.noteNames||(chord.notes||[]).map(midi=>names[midi%12]+(Math.floor(midi/12)-1))).join(' + ');
      if(chord.status==='chord'){this.chordText(chord.label,notes,_t('Có thể là ')+chord.quality.toLowerCase()+_t(' · chưa chấm bài'));return;}
      const status={quiet:_t('Chờ tiếng đàn.'),single:_t('Cần ít nhất ba tên nốt khác nhau.'),insufficient:_t('Chưa đủ nốt để gọi tên hợp âm.'),stabilizing:_t('Đang xác định hợp âm…'),ambiguous:_t('Nhiều cách gọi: ')+(chord.candidates||[]).map(c=>c.label).join(' / '),uncertain:_t('Chưa chắc chắn · thử bấm đủ hợp âm, nhả pedal.'),loading:_t('Đang nạp bộ nghe…'),error:_t('Không nạp được bộ nghe · tắt/bật micro để thử lại.'),clipping:_t('Âm bị clipping · giảm mức đầu vào.'),off:_t('Bộ nghe hợp âm đã tắt.')}[chord.status]||_t('Đang phân tích…');
      this.chordText('—',notes,status);
    }
    async start(){
      this.lastError=null;
      const token=++this.generation;this.pending=true;$('mic-toggle').textContent=_t('Hủy micro');
      this.clearNote(true);$('mic-last-detection').hidden=true;$('mic-last-detection').textContent='';
      this.status(_t('Đang xin quyền micro…'));
      try{
        if(!isSecureContext||location.protocol==='file:')throw new Error(_t('Mở app qua http://127.0.0.1:8765 hoặc HTTPS để dùng micro.'));
        if(!navigator.mediaDevices?.getUserMedia||!window.AudioWorkletNode||!window.Worker)throw new Error(_t('Trình duyệt này chưa hỗ trợ thu âm AudioWorklet.'));
        const stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:false,noiseSuppression:false,autoGainControl:false},video:false});
        if(token!==this.generation){stream.getTracks().forEach(t=>t.stop());return;}
        this.stream=stream;
        this.context=new AudioContext({latencyHint:'interactive'});await this.context.resume();
        await this.context.audioWorklet.addModule('audio/mic-worklet.js?v=9be74ce-1627866aaad1');
        if(token!==this.generation)return;
        this.worker=new Worker('audio/pitch-worker.js?v=9be74ce-1627866aaad1');
        this.node=new AudioWorkletNode(this.context,'piano-capture',{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1]});
        this.node.onprocessorerror=()=>{if(token!==this.generation)return;this.stop();this.status(_t('Bộ thu âm bị lỗi · bật micro để thử lại.'));};
        const channel=new MessageChannel();this.worker.postMessage({port:channel.port1},[channel.port1]);this.node.port.postMessage({port:channel.port2},[channel.port2]);
        this.worker.onerror=()=>{if(token!==this.generation)return;this.stop();this.status(_t('Bộ phân tích bị lỗi · bật micro để thử lại.'));};
        this.worker.onmessage=({data})=>{if(token===this.generation)this.receive(data);};
        this.source=this.context.createMediaStreamSource(stream);this.source.connect(this.node);this.node.connect(this.context.destination);
        const track=stream.getAudioTracks()[0],settings=track.getSettings();
        this.settings={contextRate:this.context.sampleRate,analysisRate:this.context.sampleRate/Math.max(1,Math.floor(this.context.sampleRate/12000)),track:settings,baseLatency:this.context.baseLatency,outputLatency:this.context.outputLatency};
        const controls=['echoCancellation','noiseSuppression','autoGainControl'].map(key=>`${key}: ${settings[key]===undefined?_t('không báo'):settings[key]}`).join(' · ');
        $('mic-device-settings').textContent=_t("{0} · AudioContext {1} Hz · thiết bị {2} Hz · {3}",[track.label||'Micro',this.context.sampleRate,settings.sampleRate||_t('không báo'),controls]);
        $('mic-processing-warning').hidden=!['echoCancellation','noiseSuppression','autoGainControl'].some(key=>settings[key]!==false);
        track.onended=()=>{this.stop();this.status(_t('Micro đã ngắt kết nối.'));};
        if(!this.permissionReported){this.permissionReported=true;window.pianoAnalytics?.track('mic_permission',{result:'granted'});}
        this.active=true;this.pending=false;this.metrics=[];this.needsQuiet=false;this.quietFrames=0;$('mic-toggle').textContent=_t('■ Dừng micro');$('mic-toggle').setAttribute('aria-pressed','true');
        this.configure();this.configureGuard();this.worker.postMessage({type:'expect',notes:this.expected??null,...(this.expectOptions||{})});this.status(this.observationOnly?.()?_t('Đang nghe hợp âm · thử nghiệm'):_t('Đang nghe · đánh một nốt'));
      }catch(error){
        if(token!==this.generation)return;
        this.stop();
        window.pianoAnalytics?.track('mic_permission',{result:({NotAllowedError:'denied',NotFoundError:'no_device',NotReadableError:'busy',OverconstrainedError:'unsupported'})[error?.name]||'error'});
        this.lastError=({NotAllowedError:_t('Quyền micro bị từ chối · cấp quyền trong trình duyệt rồi thử lại.'),NotFoundError:_t('Không tìm thấy micro.'),NotReadableError:_t('Micro đang bận hoặc không thể mở.'),OverconstrainedError:_t('Thiết bị không chấp nhận cấu hình micro.')})[error.name]||error.message||_t('Không mở được micro.');
        this.status(this.lastError);
      }
    }
    receive(result){
      const age=this.context.currentTime-result.time;
      $('mic-level').value=Math.min(1,Math.max(0,(20*Math.log10(Math.max(result.rawRms,1e-8))+65)/65));
      const blocked=this.isBlocked?.();
      if(age>.15||age<-.05){this.status(_t('Thiết bị xử lý chậm · chưa chấm nốt'));this.clearNote();this.clearChord(_t('Khung âm quá cũ · chờ tín hiệu mới.'));return;}
      if(blocked){this.needsQuiet=true;this.quietFrames=0;this.status(blocked);$('mic-brief').textContent=blocked;delete $('mic-brief').dataset.result;this.clearNote();this.clearChord(_t('Tạm dừng khi app phát âm thanh.'));if(this.guardEnabled)$('mic-guard-status').textContent=_t('Bộ thử tạm dừng khi nghe mẫu.');return;}
      if(this.needsQuiet){
        this.quietFrames=result.status==='quiet'?this.quietFrames+1:0;
        this.status(_t('Nhả phím, chờ tiếng mẫu và âm ngân tắt…'));$('mic-brief').textContent=_t('Chờ yên lặng trước khi chấm');this.clearNote();
        this.clearChord(_t('Nhả phím và pedal, chờ tiếng mẫu tắt.'));
        if(this.quietFrames>=3){this.needsQuiet=false;this.worker?.postMessage({type:'config',config:this.config});}
        return;
      }
      const status={quiet:_t('Âm quá nhỏ · đưa micro gần đàn hơn'),clipping:_t('Âm bị clipping · giảm mức đầu vào'),uncertain:_t('Chưa chắc chắn · thử từng nốt, nhả pedal'),stabilizing:_t('Đang xác định nốt…'),'out-of-range':_t('Ngoài dải C2–C6')};
      if(this.guardEnabled){
        const guard=result.guard||{status:'loading'},pitches=(guard.pitches||[]).map(p=>names[p.midi%12]+(Math.floor(p.midi/12)-1)).join(' + ');
        this.lastGuard=guard;
        this.showChord(guard);
        const text=({off:_t('Đang dừng phân tích thử…'),loading:_t('Đang nạp mẫu phổ…'),error:_t('Không nạp được bộ mẫu thử · tắt/bật lại để thử.'),quiet:_t('Bộ thử: chờ tiếng đàn.'),clipping:_t('Bộ thử: tín hiệu clipping; giảm mức đầu vào.'),single:_t("Bộ thử: một cao độ {0}",[pitches]),multiple:_t("Bộ thử: có thể nhiều nốt {0}",[pitches]),uncertain:_t('Bộ thử: phổ chưa khớp mẫu; chưa chắc chắn.')})[guard.status]||_t('Bộ thử: đang phân tích…');
        if($('mic-guard-status').textContent!==text)$('mic-guard-status').textContent=text;
      }
      if(this.observationOnly?.()){
        this.clearNote(true);this.status(result.status==='clipping'?_t('Âm bị clipping · giảm mức đầu vào'):_t('Đang nghe hợp âm · thử nghiệm'));
        $('mic-brief').textContent=_t('Nghe tự do · không chấm bài');delete $('mic-brief').dataset.result;return;
      }
      // Chord targets: report the verifier, not single-note advice that would contradict the task.
      if(this.expected&&result.verify){
        this.status(({loading:_t('Đang nạp bộ nghe hợp âm…'),error:_t('Không nạp được bộ nghe hợp âm · tắt/bật micro để thử lại'),quiet:status.quiet,clipping:status.clipping,match:_t('Nghe đủ các phím của hợp âm'),missing:_t('Chưa nghe đủ các phím · đánh đủ hợp âm'),wrong:_t('Có phím không thuộc hợp âm'),uncertain:_t('Chưa chắc chắn · nhả pedal, đánh lại hợp âm')})[result.verify.status]||_t('Đang nghe hợp âm'));
        this.clearNote(false);this.onResult?.(result);return;
      }
      this.status(status[result.status]||_t('Đang nghe · từng nốt đơn'));
      this.showConfidence(result);
      if(result.status==='note'){
        const note=names[result.midi%12]+(Math.floor(result.midi/12)-1);
        const confidence=this.confidenceValue(result),confidenceText=confidence===null?'—':`${Math.round(confidence*100)}%`;
        $('mic-note').textContent=note;$('mic-note').title=_t("{0} Hz · {1} cent · chỉ số tin cậy {2} (không phải xác suất nhận đúng)",[result.frequency.toFixed(1),result.cents.toFixed(1),confidenceText]);
        document.querySelectorAll('#keyboard .key.mic-detected').forEach(key=>key.classList.remove('mic-detected'));
        const key=document.querySelector(`#keyboard [data-midi="${result.midi}"]`);key?.classList.add('mic-detected');
        if(key){const scroll=$('keyboard-scroll');if(key.offsetLeft<scroll.scrollLeft||key.offsetLeft>scroll.scrollLeft+scroll.clientWidth-30)scroll.scrollLeft=Math.max(0,key.offsetLeft-scroll.clientWidth*.5);}
        if(result.attack){
          $('mic-last-detection').hidden=false;$('mic-last-detection').textContent=_t("Lần vừa nhận: {0} · chỉ số tin cậy {1}.",[note,confidenceText]);
          this.metrics.push({midi:result.midi,confidence,onsetId:result.onsetId,audioTime:result.time,processingMs:result.processingMs,messageAgeMs:age*1000,onsetToUiEstimateMs:(this.context.currentTime-result.onsetTime)*1000,uiAt:performance.now()});if(this.metrics.length>1000)this.metrics.shift();
        }
      }else this.clearNote(false);
      $('mic-diagnostics').textContent=_t("Phân tích {0} ms · tuổi khung {1} ms · bỏ {2} khung khi bận. Độ trễ từ onset nội bộ không gồm đường thu của thiết bị.",[result.processingMs.toFixed(2),Math.max(0,age*1000).toFixed(1),result.dropped]);
      this.onResult?.(result);
    }
    clearNote(clearConfidence=false){$('mic-note').textContent='—';$('mic-note').removeAttribute('title');if(clearConfidence){const output=$('mic-confidence');{const empty=_t('Tin cậy —');if(output.textContent!==empty)output.textContent=empty;}output.dataset.state='empty';output.removeAttribute('title');}document.querySelectorAll('#keyboard .mic-detected').forEach(key=>key.classList.remove('mic-detected'));}
    stop(){
      this.stopTakes();this.takeModule=false;
      this.generation++;this.pending=false;this.active=false;
      this.stream?.getTracks().forEach(t=>{t.onended=null;t.stop();});this.stream=null;
      this.source?.disconnect();this.source=null;this.node?.port.postMessage({type:'stop'});this.node?.disconnect();this.node?.port.close();this.node=null;
      this.worker?.terminate();this.worker=null;this.context?.close().catch(()=>{});this.context=null;
      this.lastGuard=null;
      this.clearChord();
      $('mic-guard-status').textContent=$('mic-guard-toggle').checked?_t('Bật micro để quan sát đa âm.'):'';
      $('mic-toggle').textContent=_t('🎤 Bật micro');$('mic-toggle').setAttribute('aria-pressed','false');$('mic-level').value=0;this.clearNote(true);this.status(_t('Micro đã tắt'));this.onStop?.();
    }
  }
  window.PianoMicrophone=PianoMicrophone;
})();
