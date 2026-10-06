(() => {
  'use strict';
  const DATA = window.PIANO_DATA;
  if (!DATA || !Array.isArray(DATA.exercises)) return;
  const $ = id => document.getElementById(id);
  const initialRoute=location.hash;
  const progressKeys=['piano-journey-v1','piano-independence-done','piano-phrases-v1','piano-room','piano-songs-v1','piano-practice-view','piano-mic-mode-v1','piano-skill-view-v1','piano-reading-v1'];
  if(location.hash.startsWith('#import=')){
    try{
      const values=JSON.parse(decodeURIComponent(location.hash.slice(8)));
      for(const key of progressKeys)if(typeof values[key]==='string'&&values[key].length<500000)localStorage.setItem(key,values[key]);
      history.replaceState(null,'',location.pathname);
    }catch(_){}
  }
  const SEMI = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
  const WHITE = new Set([0,2,4,5,7,9,11]);
  const scoreEl = $('score');
  const keysEl = $('keyboard');
  let journey,composer,songs,microphone,skillGraph,reading;
  let micTargets=[],micTargetIndex=0,micMuteUntil=0,micHandEligibility={rh:false,lh:false,both:false};
  const micGrading=window.PianoMicPractice;
  let micTempoSession=null,micTempoRaf=0,micTempoLast=null,timedMic=false;
  let micMode='relaxed',micRound={exact:0,near:0,retry:0,self:0},micLastRound=null,micRoundContext='',micRounds=0;
  let practiceMode='listen',practiceStarting=false,practiceStartToken=0;
  const transportRunning=()=>state.playing||state.loading||!!micTempoSession?.running;
  const transportTime=()=>state.timelineOnly?performance.now()/1000:state.ctx?.currentTime??0;
  try{micMode=micGrading.mode(localStorage.getItem('piano-mic-mode-v1'));timedMic=localStorage.getItem('piano-timed-mic-v1')==='1';}catch(_){}
  const state = {index:0,events:[],tempo:60,playing:false,beat:0,ctx:null,piano:null,loading:false,startRequest:0,nodes:new Set(),scheduler:0,nextCycleTime:0,hand:'both',timelineOnly:false,loop:false,barStart:1,barEnd:4,raf:0,musicStart:0,offset:0,countIn:0,done:new Set(),lastScrollBar:-1};
  try { state.done = new Set(JSON.parse(localStorage.getItem('piano-independence-done') || '[]')); } catch (_) {}
  const num = n => String(n).padStart(2,'0');
  const ex = () => state.reading || state.song || DATA.exercises[state.index];
  function refreshToday(){
    const readingSession=reading?.diagnostics().saved.session;
    if(state.reading&&readingSession&&!readingSession.finished){
      $('today-lesson').textContent='Đọc nhạc mỗi ngày · '+state.reading.title;
      $('today-goal').textContent=state.reading.goal;
      $('today-progress').textContent=`Buổi ${readingSession.number} · bài ${readingSession.cursor+1}/${readingSession.items.length}`;return;
    }
    if(state.song){
      $('today-lesson').textContent=state.song.title;
      $('today-goal').textContent=state.song.goal;
      $('today-progress').textContent=$('song-card-progress').textContent;
      return;
    }
    const lesson=DATA.exercises[(journey?.resumeLesson()||state.index+1)-1];
    $('today-lesson').textContent=`Bài ${num(lesson.id)} · ${lesson.title}`;
    $('today-goal').textContent=lesson.goal;
    $('today-progress').textContent=$('journey-progress').textContent;
  }
  let exitFocusForNavigation=()=>{};
  function showView(view,route=true){
    if(!['today','journey','songs','practice','skills','reading'].includes(view))return;
    // A build may ship without songs (scripts/build-static.py --hide-song): the library falls back to the journey.
    if(view==='songs'&&!window.PIANO_SONGS?.length)view='journey';
    if(view!=='practice'){exitFocusForNavigation();reading?.leave();cancelPracticeStart();microphone?.stop();rememberPractice();stop(false);refreshToday();}
    document.body.dataset.view=view;
    for(const name of ['today','journey','songs','practice','skills','reading'])$(name+'-view').hidden=name!==view;
    if(view==='skills')skillGraph?.render();
    if(view==='reading')reading?.ready();
    document.querySelectorAll('.primary-nav [data-view],.mobile-nav [data-view]').forEach(button=>{
      if(button.dataset.view===view)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
    });
    $('practice-exit').hidden=view!=='practice';$('topbar-count').hidden=view!=='practice';
    $('view-label').textContent=({today:'LUYỆN TẬP HÔM NAY',journey:'KHÓA HỌC',songs:'BÀI HÁT',practice:'LUYỆN ĐÀN',skills:'BẢN ĐỒ KỸ NĂNG',reading:'ĐỌC NHẠC MỖI NGÀY'})[view];
    closeMenu();
    if(route)try{history.replaceState(null,'',view==='practice'?(state.reading?'#doc-nhac/tap':state.song?`#nhac-${state.song.id}`:`#bai-${ex().id}`):({today:'#hom-nay',journey:'#hanh-trinh',songs:'#bai-nhac',skills:'#ky-nang',reading:'#doc-nhac'})[view]);}catch(_){}
    window.scrollTo?.({top:0,behavior:'instant'});
    if(route)$(view+'-view').querySelector('h1')?.focus({preventScroll:true});
  }
  const barCount = () => ex().rh.length;
  function rememberPractice(){if(state.reading)reading?.snapshot();else if(!state.song)journey?.rememberSettings();}
  // Internal durations stay in quarter-note units, including compound meters.
  const beatSeconds=()=>60/(state.tempo*(ex().tempoBeat||1));
  const pulseSize=()=>ex().pulse||1;
  const pulseCount=()=>ex().meter/pulseSize();
  const totalBeats = () => ex().meter * barCount();
  const rangeStart = () => (state.barStart-1)*ex().meter;
  const rangeEnd = () => state.barEnd*ex().meter;
  const handEnabled = hand => state.hand==='both'||state.hand===hand;
  const fmt = sec => `${Math.floor(sec/60)}:${num(Math.floor(sec%60))}`;
  const pitchesOf = p => p == null ? [] : Array.isArray(p) ? p : [p];
  const midiOf = p => (Number(p.slice(-1))+1)*12 + SEMI[p[0]] + (p.includes('#')?1:p.includes('b')?-1:0);
  const roundBeat = b => Math.max(0,Math.min(totalBeats(),b));

  function flatten(e){
    const all=[];
    for(const hand of ['rh','lh']){
      let serial=0,held=null;
      e[hand].forEach((bar,bi)=>{
        let pos=0;
        bar.forEach(([p,d,notation],noteIndex)=>{
          const event={key:`${hand}-${serial++}`,hand,pitches:pitchesOf(p),start:bi*e.meter+pos,dur:d,bar:bi,beat:pos,notation,noteIndex};
          if(notation?.tie==='stop'||notation?.tie==='continue'){
            if(!held||JSON.stringify(held.pitches)!==JSON.stringify(event.pitches)||Math.abs(held.start+(held.attackDur||held.dur)-event.start)>1e-8)throw new Error('Invalid study tie');
            held.attackDur=(held.attackDur||held.dur)+d;held.tieKeys=[...(held.tieKeys||[]),event.key];event.continuationOf=held.key;if(notation.tie==='stop')held=null;
          }
          if(notation?.tie==='start')held=event;
          all.push(event);
          pos+=d;
        });
      });
    }
    for(const [hand,pitches] of Object.entries(e.holds||{})){
      const length=e[hand].length,firstKey=`${hand}-hold-0`;
      for(let bar=0;bar<length;bar++)all.push({key:`${hand}-hold-${bar}`,hand,voice:'hold',pitches,start:bar*e.meter,dur:e.meter,bar,beat:0,noteIndex:0,
        notation:{duration:e.meter===4?'w':'h',tie:length===1?undefined:bar===0?'start':bar===length-1?'stop':'continue'},
        ...(bar===0?{attackDur:length*e.meter}:{continuationOf:firstKey})});
    }
    return all;
  }
  // Sheet events remain separate; tied continuations don't create new attacks.
  const playbackEvents=()=>state.events.filter(ev=>!ev.continuationOf).map(ev=>ev.attackDur?{...ev,dur:ev.attackDur}:ev);
  function renderLessons(){
    const nav=$('lesson-list');nav.innerHTML='';
    DATA.stages.forEach(([name],stageIdx)=>{
      const group=document.createElement('section');group.className='stage-nav';
      const h=document.createElement('h3');h.textContent=`Chặng ${num(stageIdx+1)} · ${name}`;group.append(h);
      DATA.exercises.forEach((item,i)=>{
        if(item.stage!==stageIdx+1)return;
        const b=document.createElement('button');b.type='button';b.className='lesson-item'+(!state.song&&i===state.index?' current':'')+(state.done.has(item.id)?' done':'');b.setAttribute('aria-current',!state.song&&i===state.index?'true':'false');
        const n=document.createElement('span');n.className='lesson-num';n.textContent=num(item.id);
        const s=document.createElement('span');s.className='lesson-name';s.textContent=item.title;
        b.append(n,s);
        const stars=journey?.stars(item.id)||0;
        if(stars){const badge=document.createElement('span');badge.className='lesson-stars';badge.textContent='★'.repeat(stars);badge.setAttribute('aria-label',`${stars} sao`);b.append(badge);}
        b.addEventListener('click',()=>{loadLesson(i);closeMenu();});group.append(b);
      });
      nav.append(group);
    });
  }
  let scoreWidth = 1160;
  const SCORE_HEIGHT = 355;
  const SCORE_SCALE = 1.5;
  const measureBounds = [];
  const beatPositions = [];
  const motionPoints=[];
  function xForAbs(beat){
    if(!motionPoints.length)return 100;
    for(let i=1;i<motionPoints.length;i++){
      if(beat<=motionPoints[i].beat){
        const a=motionPoints[i-1],b=motionPoints[i],h=b.beat-a.beat,t=Math.max(0,(beat-a.beat)/h);
        // Monotone Hermite interpolation: exact note onsets, continuous velocity.
        return (2*t*t*t-3*t*t+1)*a.x+(t*t*t-2*t*t+t)*h*a.slope+(-2*t*t*t+3*t*t)*b.x+(t*t*t-t*t)*h*b.slope;
      }
    }
    return motionPoints[motionPoints.length-1].x;
  }
  function svgNode(tag,attributes){
    const node=document.createElementNS('http://www.w3.org/2000/svg',tag);
    Object.entries(attributes).forEach(([key,value])=>node.setAttribute(key,String(value)));
    return node;
  }
  function layoutScore(){
    const focus=document.body.classList.contains('practice-focus')&&document.body.dataset.view==='practice';
    const crop=state.reading?state.readingBounds?.top||0:focus?(ex().book?30:50):0,height=state.reading?state.readingBounds?.height||SCORE_HEIGHT:focus?(ex().book?315:265):SCORE_HEIGHT;
    const available=document.querySelector('.score-viewport').clientHeight;
    const scale=focus&&available>0?Math.min(SCORE_SCALE,available/height):SCORE_SCALE;
    state.sheetScale=scale;state.sheetCrop=crop;
    const key=`${focus}:${scale}:${scoreWidth}:${state.loopStripKey}`;
    if(state.scoreLayoutKey===key)return;state.scoreLayoutKey=key;state.scoreGeometry=null;
    const svg=scoreEl.querySelector('svg');
    if(svg){svg.setAttribute('viewBox',`0 ${crop} ${scoreWidth} ${height}`);svg.style.width=svg.style.minWidth=`${scoreWidth*scale}px`;svg.style.height=`${height*scale}px`;scoreEl.style.width=`${scoreWidth*scale}px`;}
    const strip=$('loop-score'),loop=strip?.querySelector('svg');
    if(loop&&state.loopMotion){const width=state.loopMotion.width*loop.querySelectorAll('[data-loop-tile]').length;loop.setAttribute('viewBox',`0 ${crop} ${width} ${height}`);loop.style.width=strip.style.width=`${width*scale}px`;loop.style.height=`${height*scale}px`;}
  }
  function drawScore(){
    state.scoreLayoutKey=null;
    state.visualSignature=null;
    state.scoreGeometry=null;state.scoreResidual=0;state.loopStripKey=null;motionPoints.length=0;scoreEl.style.transform='';
    const VF=window.Vex.Flow,e=ex(),tiedNotes={rh:null,lh:null},studySlurs={rh:new Map(),lh:new Map()};
    const hands=e.readingHands?.length?e.readingHands:['rh','lh'],lead=hands[0],staffY={rh:65,lh:195};
    if(e.reading){
      const step=p=>Number(p.slice(-1))*7+'CDEFGAB'.indexOf(p[0]);
      const extents=Object.fromEntries(hands.map(hand=>{
        const clef=e.readingClefs[hand],pitches=state.events.filter(ev=>ev.hand===hand).flatMap(ev=>ev.pitches).map(step);
        const top=clef==='bass'?3*7+5:5*7+3,bottom=clef==='bass'?2*7+4:4*7+2;
        return [hand,{above:Math.max(0,...pitches.map(p=>(p-top)*5)),below:Math.max(0,...pitches.map(p=>(bottom-p)*5))}];
      }));
      staffY[lead]=65+Math.max(0,extents[lead].above-15);
      if(hands.length===2)staffY.lh=staffY.rh+130+Math.max(0,extents.rh.below-25)+Math.max(0,extents.lh.above-25);
      state.readingBounds={top:25,height:Math.max(185,staffY[hands.at(-1)]+120+extents[hands.at(-1)].below-25)};
    }else state.readingBounds=null;
    const bandTop=staffY[lead]-5,bandBottom=staffY[hands.at(-1)]+110;state.sheetBand={top:bandTop,height:bandBottom-bandTop};

    scoreEl.innerHTML='';measureBounds.length=0;beatPositions.length=0;
    const renderer=new VF.Renderer(scoreEl,VF.Renderer.Backends.SVG);
    const widths=Array.from({length:barCount()},(_,bar)=>{
      const count=Math.max(...hands.map(hand=>state.events.filter(ev=>ev.hand===hand&&ev.bar===bar).length));
      const complexity=e.reading?Math.max(...hands.map(hand=>state.events.filter(ev=>ev.hand===hand&&ev.bar===bar).reduce((sum,ev)=>sum+ev.pitches.filter(p=>p.includes('#')||p.includes('b')).length*12+(ev.notation?.finger?8:0),0))):0;
      return Math.max(bar===0?310:265,count*(e.reading?32:25)+(bar===0?110:40)+complexity);
    });
    scoreWidth=35+widths.reduce((sum,width)=>sum+width,0)+20;
    renderer.resize(scoreWidth,SCORE_HEIGHT);
    const context=renderer.getContext();context.setFont('Arial',12);
    const svg=scoreEl.querySelector('svg');
    svg.setAttribute('viewBox',`0 0 ${scoreWidth} ${SCORE_HEIGHT}`);
    scoreEl.style.width=`${scoreWidth*SCORE_SCALE}px`;
    svg.style.width=`${scoreWidth*SCORE_SCALE}px`;
    svg.style.minWidth=`${scoreWidth*SCORE_SCALE}px`;
    svg.style.height=`${SCORE_HEIGHT*SCORE_SCALE}px`;
    svg.removeAttribute('width');svg.removeAttribute('height');svg.setAttribute('aria-hidden','true');
    const background=svgNode('g',{'aria-hidden':'true'});svg.insertBefore(background,svg.firstChild);
    let x=35;
    for(let bar=0;bar<barCount();bar++){
      const width=widths[bar];
      measureBounds.push({x,width});
      background.append(svgNode('rect',{id:`segment-${bar}`,class:'segment-band',x:x+1,y:bandTop,width:width-2,height:bandBottom-bandTop}));
      background.append(svgNode('rect',{id:`bar-${bar}`,class:'bar-current',x:x+1,y:bandTop,width:width-2,height:bandBottom-bandTop,opacity:0}));
      const measureGroup=context.openGroup('measure');measureGroup.setAttribute('data-score-bar',bar);
      const staves=Object.fromEntries(hands.map(hand=>[hand,new VF.Stave(x,staffY[hand],width)]));
      if(bar===0){
        for(const hand of hands){
          staves[hand].addClef(e.readingClefs?.[hand]||(hand==='rh'?'treble':'bass'));
          if(e.keySignature&&e.keySignature!=='C')staves[hand].addKeySignature(e.keySignature);
          staves[hand].addTimeSignature(e.timeSignature||`${e.meter}/4`);
        }
      }
      staves[lead].setMeasure(e.barNumbers?.[bar]||bar+1);
      const noteStart=Math.max(...hands.map(hand=>staves[hand].getNoteStartX()));
      Object.values(staves).forEach(stave=>stave.setNoteStartX(noteStart).setContext(context).draw());
      const label=e.studyLabels?.[bar]||e.harmony?.[bar]||e.dynamicLabels?.[bar];
      if(label){const text=svgNode('text',{class:'study-label',x:noteStart+8,y:53,'font-size':13,'font-weight':700,fill:'#5b3d7d'});text.textContent=label;measureGroup.append(text);}
      if(hands.length===2&&bar===0)new VF.StaveConnector(staves.rh,staves.lh).setType(VF.StaveConnector.type.BRACE).setContext(context).draw();
      if(hands.length===2)new VF.StaveConnector(staves.rh,staves.lh).setType(VF.StaveConnector.type.SINGLE_LEFT).setContext(context).draw();
      if(hands.length===2)new VF.StaveConnector(staves.rh,staves.lh).setType(bar===barCount()-1?VF.StaveConnector.type.BOLD_DOUBLE_RIGHT:VF.StaveConnector.type.SINGLE_RIGHT).setContext(context).draw();
      const records={},voices=[],positions=new Map();
      for(const hand of hands){
        const color=getComputedStyle(document.documentElement).getPropertyValue(hand==='rh'?'--teal':'--coral').trim()||(hand==='rh'?'#087f8c':'#bc564c');
        const events=state.events.filter(v=>v.hand===hand&&v.bar===bar);
        const notes=events.map(ev=>{
          const staff=ev.notation?.staff||hand;
          const rest=!ev.pitches.length,dotted=ev.dur===.75||ev.dur===1.5||ev.dur===3;
          const base=ev.notation?.duration||(ev.dur===4?'w':ev.dur>=2?'h':ev.dur>=1?'q':ev.dur===.25?'16':'8');
          const keys=rest?[hand==='rh'?'b/4':'d/3']:ev.pitches.slice().sort((a,b)=>midiOf(a)-midiOf(b)).map(p=>`${p.slice(0,-1).toLowerCase()}/${p.slice(-1)}`);
          const note=new VF.StaveNote({clef:e.readingClefs?.[staff]||(staff==='rh'?'treble':'bass'),keys,duration:base+(dotted?'d':'')+(rest?'r':''),auto_stem:true});
          if(dotted)VF.Dot.buildAndAttach([note],{all:true});
          if(!rest&&ev.notation?.finger)note.addModifier(new VF.FretHandFinger(String(ev.notation.finger)).setPosition(hand==='rh'?VF.Modifier.Position.ABOVE:VF.Modifier.Position.BELOW),0);
          if(!rest&&ev.notation?.fingers){
            const ordered=ev.pitches.map((pitch,index)=>({pitch,finger:ev.notation.fingers[index]})).sort((a,b)=>midiOf(a.pitch)-midiOf(b.pitch));
            ordered.forEach((item,index)=>{
              // Adjacent chord tones need separate columns so their digits don't overlap.
              const close=index>0&&midiOf(item.pitch)-midiOf(ordered[index-1].pitch)<=2;
              if(item.finger)note.addModifier(new VF.FretHandFinger(String(item.finger)).setFont('Arial',6,'bold').setPosition(close?VF.Modifier.Position.RIGHT:VF.Modifier.Position.LEFT),index);
            });
          }
          if(!rest&&ev.notation?.articulation==='staccato')note.addModifier(new VF.Articulation('a.').setPosition(hand==='rh'?VF.Modifier.Position.ABOVE:VF.Modifier.Position.BELOW),0);
          if(!rest&&ev.notation?.fermata)note.addModifier(new VF.Articulation('a@a').setPosition(VF.Modifier.Position.ABOVE),0);
          note.setStyle({fillStyle:color,strokeStyle:color}).setStave(staves[staff]);
          return note;
        });
        const tuplets=[];
        const groups=new Map();
        events.forEach((ev,i)=>{
          const spec=ev.notation?.tuplet;if(!spec)return;
          if(!groups.has(spec.group))groups.set(spec.group,{spec,notes:[]});
          groups.get(spec.group).notes.push(notes[i]);
        });
        for(const {spec,notes:group} of groups.values())tuplets.push(new VF.Tuplet(group,{num_notes:spec.numNotes,notes_occupied:spec.occupied,bracketed:true,location:hand==='rh'?VF.Tuplet.LOCATION_TOP:VF.Tuplet.LOCATION_BOTTOM}));
        const beams=VF.Beam.generateBeams(notes.filter((_,i)=>!events[i].voice),{groups:[new VF.Fraction(e.timeSignature==='6/8'?3:1,e.timeSignature==='6/8'?8:4)]});
        beams.forEach(beam=>beam.setStyle({fillStyle:color,strokeStyle:color}));
        const handVoices=[];
        for(const name of new Set(events.map(ev=>ev.voice||'main'))){
          const tickables=notes.filter((_,i)=>(events[i].voice||'main')===name);
          if(e.holds?.[hand])tickables.forEach(note=>note.setStemDirection(name==='hold'?VF.Stem.DOWN:VF.Stem.UP));
          const voice=new VF.Voice({num_beats:e.meter,beat_value:4}).addTickables(tickables);
          voices.push(voice);handVoices.push(voice);
        }
        records[hand]={events,notes,beams,tuplets,voices:handVoices};
      }
      VF.Accidental.applyAccidentals(voices,e.keySignature||'C');
      for(const hand of hands)records[hand].events.forEach((ev,i)=>{
        if(ev.notation?.courtesyAccidental)records[hand].notes[i].addModifier(new VF.Accidental(ev.notation.courtesyAccidental),0);
      });
      const formatter=new VF.Formatter();hands.forEach(hand=>formatter.joinVoices(records[hand].voices));
      formatter.format(voices,staves[lead].getNoteEndX()-noteStart-15);
      for(const hand of hands){
        const {events,notes,beams,tuplets}=records[hand];
        notes.forEach((note,i)=>{
          const ev=events[i],group=context.openGroup();
          group.setAttribute('id',`ev-${ev.key}`);group.setAttribute('class',`event ${hand}${ev.pitches.length?'':' rest-event'}`);
          const title=svgNode('title',{});title.textContent=`${ev.pitches.length?ev.pitches.join(' + '):'Nghỉ'} · ${ev.dur} phách`;group.append(title);
          note.setContext(context).draw();context.closeGroup();positions.set(ev.beat,note.getAbsoluteX());
        });
        beams.forEach(beam=>beam.setContext(context).draw());
        tuplets.forEach(tuplet=>{const group=context.openGroup('tuplet');group.classList.add(hand);tuplet.setContext(context).draw();context.closeGroup();});
        const slurs=studySlurs[hand];
        events.forEach((ev,i)=>{
          const tieHand=hand+':'+(ev.voice||'main');
          if(ev.notation?.tie==='stop'||ev.notation?.tie==='continue'){
            const group=context.openGroup('study-tie');group.classList.add(hand);
            const indices=ev.pitches.map((_,index)=>index);
            if(ev.voice==='hold'){
              indices.forEach(index=>new VF.StaveTie({first_note:tiedNotes[tieHand],last_note:notes[i],first_indices:[index],last_indices:[index]}).setDirection(index===0?VF.Stem.UP:VF.Stem.DOWN).setContext(context).draw());
            }else new VF.StaveTie({first_note:tiedNotes[tieHand],last_note:notes[i],first_indices:indices,last_indices:indices}).setContext(context).draw();
            context.closeGroup();tiedNotes[tieHand]=null;
          }
          if(ev.notation?.tie==='start'||ev.notation?.tie==='continue')tiedNotes[tieHand]=notes[i];
          for(const slur of ev.notation?.slurs||[]){
            const number=slur.number||'1';
            if(slur.type==='start')slurs.set(number,notes[i]);
            else{
              const group=context.openGroup('study-slur');group.classList.add(hand);
              new VF.Curve(slurs.get(number),notes[i],{position:VF.Curve.Position.NEAR_HEAD,position_end:VF.Curve.Position.NEAR_HEAD,invert:hand==='lh'}).setContext(context).draw();context.closeGroup();slurs.delete(number);
            }
          }
        });
      }
      beatPositions.push([...positions].map(([beat,x])=>({beat,x})).sort((a,b)=>a.beat-b.beat).concat({beat:e.meter,x:x+width-12}));
      context.closeGroup();
      x+=width;
    }
    if(e.reading&&svg.getBBox){
      const box=svg.getBBox();
      const top=Math.min(25,box.y-12),bottom=Math.max(bandBottom+12,box.y+box.height+12);
      state.readingBounds={top,height:bottom-top};
    }
    for(let i=0;i<beatPositions.length-1;i++)beatPositions[i][beatPositions[i].length-1].x=beatPositions[i+1][0].x;
    beatPositions.forEach((points,bar)=>points.forEach((point,index)=>{
      if(index===points.length-1&&bar<beatPositions.length-1)return;
      const next={...point,beat:Math.round((bar*e.meter+point.beat)*1e8)/1e8};
      if(motionPoints.length&&Math.abs(motionPoints[motionPoints.length-1].beat-next.beat)<1e-7)motionPoints[motionPoints.length-1]=next;
      else motionPoints.push(next);
    }));
    const slopes=motionPoints.slice(1).map((p,i)=>(p.x-motionPoints[i].x)/(p.beat-motionPoints[i].beat));
    motionPoints.forEach((p,i)=>{
      if(i===0)p.slope=slopes[0];else if(i===motionPoints.length-1)p.slope=slopes[i-1];
      else{
        const left=slopes[i-1],right=slopes[i];
        const h0=p.beat-motionPoints[i-1].beat,h1=motionPoints[i+1].beat-p.beat;
        const w0=2*h1+h0,w1=h1+2*h0;
        p.slope=left*right<=0?0:(w0+w1)/(w0/left+w1/right);
      }
    });
    if(e.lookAhead)svg.append(svgNode('line',{id:'reading-lookahead',x1:xForAbs(e.lookAhead),x2:xForAbs(e.lookAhead),y1:bandTop,y2:bandBottom,stroke:'#bc70e5','stroke-width':2,'stroke-dasharray':'6 5'}));
    svg.append(svgNode('line',{id:'playhead',x1:xForAbs(0),x2:xForAbs(0),y1:bandTop,y2:bandBottom,visibility:'hidden'}));
  }
  // A bounded strip of identical tiles: rebasing at a repeat seam changes no
  // visible pixels and keeps memory independent of the number of repetitions.
  function syncLoopStrip(){
    const enabled=state.loop&&($('follow-score').checked||practiceMode==='timed');
    let strip=$('loop-score');
    if(!strip){strip=document.createElement('div');strip.id='loop-score';strip.setAttribute('role','img');$('score-scroll').append(strip);}
    const changed=strip.hidden===enabled;
    strip.hidden=!enabled;scoreEl.style.display=enabled?'none':'';
    $('score-scroll').classList.toggle('continuous-loop',enabled);
    if(!enabled){if(state.loopMotion||changed){state.scoreGeometry=null;state.loopStripKey=null;}state.loopMotion=null;return;}
    const left=measureBounds[state.barStart-1].x,last=measureBounds[state.barEnd-1];
    const width=last.x+last.width-left,viewport=($('score-scroll').clientWidth||1200)/(state.sheetScale||SCORE_SCALE);
    const currentTile=Math.max(1,Math.ceil(viewport*.28/width)),tiles=currentTile+Math.ceil(viewport/width)+2;
    const key=`${state.barStart}:${state.barEnd}:${state.hand}:${tiles}:${currentTile}`;
    if(state.loopStripKey===key)return;
    strip.setAttribute('aria-label',`Khuông nhạc hai tay, ô ${state.barStart}–${state.barEnd}, nối tiếp khi lặp`);
    state.loopStripKey=key;state.scoreGeometry=null;state.visualSignature=null;state.loopActiveSignature=null;
    strip.replaceChildren();strip.style.width=`${width*tiles*SCORE_SCALE}px`;
    const svg=svgNode('svg',{width:width*tiles,height:state.readingBounds?state.readingBounds.top+state.readingBounds.height:SCORE_HEIGHT,viewBox:`0 0 ${width*tiles} ${SCORE_HEIGHT}`});
    svg.style.width=`${width*tiles*SCORE_SCALE}px`;svg.style.height=`${SCORE_HEIGHT*SCORE_SCALE}px`;
    for(let tile=0;tile<tiles;tile++){
      const frame=svgNode('svg',{x:tile*width,y:0,width,height:state.readingBounds?state.readingBounds.top+state.readingBounds.height:SCORE_HEIGHT,viewBox:`${left} 0 ${width} ${state.readingBounds?state.readingBounds.top+state.readingBounds.height:SCORE_HEIGHT}`,overflow:'hidden','data-loop-tile':tile});
      frame.style.width=`${width}px`;frame.style.height=`${frame.getAttribute('height')}px`;
      for(let bar=state.barStart-1;bar<state.barEnd;bar++){
        const group=scoreEl.querySelector(`[data-score-bar="${bar}"]`).cloneNode(true);
        for(const node of [group,...group.querySelectorAll('[id]')]){
          const id=node.getAttribute('id');if(id?.startsWith('ev-'))node.setAttribute('data-loop-event',id.slice(3));
          if(id)node.setAttribute('id',`loop-${tile}-${id}`);
        }
        group.querySelectorAll('.active').forEach(node=>node.classList.remove('active'));
        frame.append(group);
      }
      svg.append(frame);
    }
    strip.append(svg);
    const points=motionPoints.filter(p=>p.beat>=rangeStart()&&p.beat<rangeEnd()).map(p=>({...p}));
    points.push({beat:rangeEnd(),x:points[0].x+width});
    const slopes=points.slice(1).map((p,i)=>(p.x-points[i].x)/(p.beat-points[i].beat));
    points.forEach((p,i)=>{
      const previous=i===0?points.length-2:i-1,next=i===points.length-1?0:i;
      const a=slopes[previous],b=slopes[next];
      const h0=points[previous+1].beat-points[previous].beat,h1=points[next+1].beat-points[next].beat;
      const w0=2*h1+h0,w1=h1+2*h0;
      p.slope=a*b<=0?0:(w0+w1)/(w0/a+w1/b);
    });
    state.loopMotion={points,left,width,tile:currentTile};state.scoreLayoutKey=null;
    layoutScore();
  }
  function visualX(beat){
    const loop=state.loopMotion;if(!loop)return xForAbs(beat);
    // Retain enough preceding tiles to keep the cursor anchored even for tiny ranges.
    const b=rangeStart()+((beat-rangeStart())%(rangeEnd()-rangeStart())+(rangeEnd()-rangeStart()))%(rangeEnd()-rangeStart());
    const points=loop.points;
    for(let i=1;i<points.length;i++)if(b<=points[i].beat){
      const a=points[i-1],p=points[i],h=p.beat-a.beat,t=(b-a.beat)/h;
      return loop.tile*loop.width-loop.left+(2*t*t*t-3*t*t+1)*a.x+(t*t*t-2*t*t+t)*h*a.slope+(-2*t*t*t+3*t*t)*p.x+(t*t*t-t*t)*h*p.slope;
    }
    return loop.tile*loop.width-loop.left+points[0].x;
  }
  function renderKeyboard(){
    keysEl.innerHTML='';let whiteIndex=0;const blacks=[];
    for(let midi=36;midi<=84;midi++){
      const chroma=midi%12,oct=Math.floor(midi/12)-1;
      if(WHITE.has(chroma)){
        const key=document.createElement('div');key.className='key white';key.style.left=`${whiteIndex*30}px`;key.dataset.midi=midi;
        if(chroma===0){const lab=document.createElement('span');lab.className='key-label';lab.textContent=`C${oct}`;key.append(lab);}
        keysEl.append(key);whiteIndex++;
      }else{blacks.push({midi,x:whiteIndex*30-10});}
    }
    blacks.forEach(({midi,x})=>{const key=document.createElement('div');key.className='key black';key.style.left=`${x}px`;key.dataset.midi=midi;keysEl.append(key);});
    keysEl.style.width=`${whiteIndex*30}px`;
    if(window.innerWidth<900)$('keyboard-scroll').scrollLeft=200;
  }
  function updatePractice(){
    resetMicPractice();
    document.querySelectorAll('[data-hand]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.hand===state.hand)));
    document.querySelectorAll('#piece-phrases button').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.from)===state.barStart&&Number(button.dataset.to)===state.barEnd)));
    $('bar-start').value=state.barStart;$('bar-end').value=state.barEnd;
    const name=state.hand==='both'?'cả hai tay':state.hand==='rh'?'tay phải':'tay trái';
    $('practice-hint').textContent=`Nghe ${name} · Ô ${state.barStart}–${state.barEnd}. ${state.hand==='both'?'':'Tay còn lại vẫn hiện trên sheet để bạn tự chơi. '}Bật “Lặp đoạn” để tập nhiều lượt.`;
    scoreEl.querySelectorAll('.event,.vf-tuplet,.vf-study-slur,.vf-study-tie').forEach(node=>{
      node.classList.toggle('muted-hand',!handEnabled(node.classList.contains('rh')?'rh':'lh'));
    });
    for(let b=0;b<barCount();b++){
      $(`segment-${b}`).setAttribute('visibility',b>=state.barStart-1&&b<state.barEnd?'visible':'hidden');
    }
    state.events.forEach(ev=>$(`ev-${ev.key}`)?.classList.toggle('outside-segment',ev.bar<state.barStart-1||ev.bar>=state.barEnd));
    const starts=['rh','lh'].map(hand=>{
      const event=state.events.find(v=>v.hand===hand&&v.pitches.length&&v.start>=rangeStart()&&v.start<rangeEnd());
      return `${hand==='rh'?'P':'T'}: ${event?event.pitches.join(' + '):'nghỉ'}`;
    });
    songs?.refreshCheck();
    $('start-notes').textContent=`Nốt đầu đoạn — ${starts.join(' · ')}. Tìm phím trước khi phát.`;
  }
  function setActive(beat){
    const active=state.events.filter(v=>handEnabled(v.hand)&&v.pitches.length&&v.start<rangeEnd()&&v.start+v.dur>rangeStart()&&beat>=v.start-.002&&beat<v.start+v.dur-.002);
    const bar=Math.min(barCount()-1,Math.floor(Math.min(beat,totalBeats()-.001)/ex().meter));
    const moving=transportRunning();
    const signature=active.map(ev=>ev.key).join(',')+':'+bar+':'+moving+':'+(Math.abs(beat-rangeStart())<.002);
    if(signature!==state.visualSignature){
    state.visualSignature=signature;
    scoreEl.querySelectorAll('.event.active').forEach(el=>el.classList.remove('active'));
    scoreEl.querySelectorAll('.bar-current').forEach(el=>el.setAttribute('opacity','0'));
    const ready=!moving&&Math.abs(beat-rangeStart())<.002;
    $('keyboard-title').textContent=ready?'Phím bắt đầu đoạn':state.playing?'Các phím đang vang':'Phím tại vị trí đã chọn';
    const activeMap=new Map();
    for(const ev of active){
      const node=$(`ev-${ev.key}`);if(node)node.classList.add('active');
      for(const p of ev.pitches){const m=midiOf(p);if(!activeMap.has(m))activeMap.set(m,new Set());activeMap.get(m).add(ev.hand);}
    }
    keysEl.querySelectorAll('.key').forEach(k=>k.classList.remove('active-rh','active-lh','active-both','ready-rh','ready-lh','ready-both'));
    for(const [m,hands] of activeMap){const key=keysEl.querySelector(`[data-midi="${m}"]`);if(key)key.classList.add(`${ready?'ready':'active'}-${hands.size===2?'both':hands.has('rh')?'rh':'lh'}`);}
    if(moving && activeMap.size){
      const midiVals=[...activeMap.keys()],mid=(Math.min(...midiVals)+Math.max(...midiVals))/2;
      const key=keysEl.querySelector(`[data-midi="${Math.round(mid)}"]`) || keysEl.querySelector(`[data-midi="${Math.min(...midiVals)}"]`);
      const scroll=$('keyboard-scroll');
      if(key && (key.offsetLeft<scroll.scrollLeft+35 || key.offsetLeft>scroll.scrollLeft+scroll.clientWidth-45)){
        const left=Math.max(0,key.offsetLeft-scroll.clientWidth*.48);
        if(scroll.scrollTo)scroll.scrollTo({left,behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});else scroll.scrollLeft=left;
      }
    }
    const names=[...new Set(active.flatMap(v=>v.pitches))];$('active-notes').textContent=names.length?names.join(' · '):'—';
    const barEl=$(`bar-${bar}`);if(barEl)barEl.setAttribute('opacity','1');
    }
    if(state.loopMotion&&signature!==state.loopActiveSignature){
      state.loopActiveSignature=signature;
      $('loop-score').querySelectorAll('.active').forEach(node=>node.classList.remove('active'));
      for(const ev of active)$('loop-score').querySelector(`[data-loop-tile="${state.loopMotion.tile}"] [data-loop-event="${ev.key}"]`)?.classList.add('active');
    }
    if(state.reading?.hidePlayed)for(const ev of state.events){const node=$(`ev-${ev.key}`);if(node)node.style.opacity=ev.start+ev.dur<=beat?'0':'1';}
    if(state.reading?.lookAhead){const marker=$('reading-lookahead');if(marker){marker.setAttribute('x1',xForAbs(Math.min(totalBeats(),beat+state.reading.lookAhead)));marker.setAttribute('x2',marker.getAttribute('x1'));}}
    if(moving&&($('follow-score').checked||state.timelineOnly))followScore(beat);
    const ph=$('playhead');ph.setAttribute('visibility',beat>0||moving?'visible':'hidden');ph.setAttribute('x1',xForAbs(beat));ph.setAttribute('x2',xForAbs(beat));
    if(!moving||!($('follow-score').checked||state.timelineOnly))paintCursor(beat);
  }
  function scoreGeometry(){
    if(!state.scoreGeometry){
      const scroll=$('score-scroll'),svg=state.loopMotion?$('loop-score').querySelector('svg'):scoreEl.querySelector('svg');
      state.scoreGeometry={scale:state.sheetScale||SCORE_SCALE,width:scroll.clientWidth,maximum:Math.max(0,scroll.scrollWidth-scroll.clientWidth),top:scroll.offsetTop+(parseFloat(getComputedStyle(scroll).paddingTop)||0)+(document.body.classList.contains('practice-focus')?Math.max(0,(scroll.clientHeight-(state.readingBounds?.height||265)*(state.sheetScale||SCORE_SCALE))/2):0)};
    }
    return state.scoreGeometry;
  }
  function paintCursor(beat){
    const cursor=$('score-cursor'),geometry=scoreGeometry();
    cursor.hidden=!(beat>0||transportRunning());
    cursor.style.top=`${geometry.top+((state.sheetBand?.top||60)-(state.sheetCrop||0))*geometry.scale}px`;
    cursor.style.height=`${(state.sheetBand?.height||245)*geometry.scale}px`;
    cursor.style.transform=`translate3d(${visualX(beat)*geometry.scale+(state.scoreResidual||0)-$('score-scroll').scrollLeft}px,0,0)`;
  }
  function followScore(beat){
    const scroll=$('score-scroll'),geometry=scoreGeometry();
    // Audio-clock position drives both cursor and scrolling on every animation frame.
    const desired=Math.min(geometry.maximum,Math.max(0,visualX(beat)*geometry.scale-geometry.width*.28));
    scroll.scrollLeft=desired;
    state.scoreResidual=scroll.scrollLeft-desired;
    (state.loopMotion?$('loop-score'):scoreEl).style.transform=`translate3d(${state.scoreResidual}px,0,0)`;
    paintCursor(beat);
  }
  function updateTime(){
    layoutScore();syncLoopStrip();layoutScore();
    const b=roundBeat(state.beat),sec=Math.max(0,b-rangeStart())*beatSeconds();
    $('time-current').textContent=fmt(sec);$('time-total').textContent=fmt((rangeEnd()-rangeStart())*beatSeconds());
    $('progress').min=rangeStart();$('progress').max=rangeEnd();$('progress').value=b;
    $('progress').style.setProperty('--played',`${(b-rangeStart())/(rangeEnd()-rangeStart())*100}%`);
    const bar=Math.min(barCount(),Math.floor(b/ex().meter)+1),within=b%ex().meter;
    const whole=Math.floor(within/pulseSize())+1;
    const rhythm=ex().rhythm;
    const subdivision=rhythm==='triplet'?` · nốt ${Math.min(3,Math.floor((within%1)*3+1e-8)+1)}/3`:rhythm==='swing'?` · ${within%1>=2/3?'ngắn':'dài'}`:rhythm==='mixed'?'':within%1>=.45?' và':'';
    $('position-label').textContent=b>=rangeEnd()?'Kết thúc đoạn':`Ô ${ex().barNumbers?.[bar-1]||bar}${ex().unfolded&&bar>45&&bar<77?" · lượt 2":""} · phách ${whole}${ex().timeSignature==='6/8'?` · móc đơn ${Math.floor(within/.5)+1}/6`:subdivision}`;
    const count=ex().timeSignature==='6/8'?'MỘT hai ba · HAI hai ba (♩. = BPM)':rhythm==='sixteenth'?'1 e và a · 2 e và a · 3 e và a · 4 e và a':rhythm==='swing'?`${Array.from({length:ex().meter},(_,i)=>i+1).join(' ')} · dài–ngắn`:rhythm==='mixed'?'Giữ phách · nhìn nhóm nốt':Array.from({length:ex().meter},(_,i)=>rhythm==='triplet'?`${i+1}-la-li`:i+1+' &').join('  ');$('count-label').textContent=count;
    setActive(b);
  }
  function loadLesson(index){
    cancelPracticeStart();
    rememberPractice();
    stop(true);reading?.leave();state.reading=null;clearReadingDisplay();state.song=null;songs?.deactivate();
    $('quest').hidden=false;$('lesson-practice').hidden=false;$('song-practice').hidden=true;
    state.index=Math.max(0,Math.min(DATA.exercises.length-1,index));const e=ex();state.barStart=1;state.barEnd=e.rh.length;state.events=flatten(composer?.prepare(e)||e);state.tempo=e.bpm;state.beat=0;state.lastScrollBar=-1;$('score-scroll').scrollLeft=0;
    setBarOptions();$('full-piece').textContent='Cả bài';
    $('lesson-title').textContent=`Bài ${num(e.id)} · ${e.title}`;
    $('lesson-goal').textContent=e.goal;
    skillGraph?.showLesson(e);
    $('stage-line').textContent=`${e.book?(e.book.label|| (e.book.volume===2?'Giáo trình · Tập 2':'Giáo trình · Tập 1')):'Chặng '+num(e.stage)} / ${DATA.stages[e.stage-1][0]}`;
    $('book-lesson-guide').hidden=!e.book;$('book-lesson-guide').open=false;
    if(e.book){
      const kind=({transcribed:'Dòng nhạc trong sách',excerpt:'Trích đoạn',adapted:'Bài chuyển soạn hoặc vận dụng'})[e.book.kind];
      $('book-lesson-reference').textContent=`Chương ${e.book.chapter} · ${e.book.reference} · PDF trang ${e.book.pages.join(', ')} · ${kind}.`;
      $('book-practice-steps').replaceChildren(...e.book.steps.map(step=>{const li=document.createElement('li');li.textContent=step;return li;}));
      $('book-repair').textContent=e.book.repair;$('book-review').textContent=e.book.review;
      const curriculum=(DATA.bookCurricula||[DATA.bookCurriculum]).find(c=>c.id===e.book.id);
      const sourceLink=$('book-source-link');
      if(sourceLink&&curriculum?.source)sourceLink.href=curriculum.source+'#page='+e.book.pages[0];
    }
    const sourceDownloads=document.documentElement.dataset.sourceDownloads!=='false';
    $('book-musicxml-link').hidden=!sourceDownloads||!e.book?.musicxml;
    if(sourceDownloads&&e.book?.musicxml)$('book-musicxml-link').href=e.book.musicxml;
    $('book-downloads').replaceChildren();
    for(const [hand,url] of Object.entries(sourceDownloads?(e.book?.midi||{}):{})){
      const a=document.createElement('a');a.href=url;a.download='';a.textContent=({both:'MIDI hai tay',right:'MIDI tay phải',left:'MIDI tay trái'})[hand];$('book-downloads').append(a);
    }
    $('book-repair-links').replaceChildren();
    for(const id of e.book?.repairLessons||[]){
      const a=document.createElement('a');a.href=`#bai-${id}`;a.textContent=`Ôn kỹ thuật ${num(id-130)} · ${DATA.exercises[id-1].title}`;$('book-repair-links').append(a);
    }
    $('piece-phrases').replaceChildren();$('piece-phrases').hidden=!e.phrases;
    for(const phrase of e.phrases||[]){
      const b=document.createElement('button');b.type='button';b.dataset.from=phrase.from;b.dataset.to=phrase.to;b.textContent=`${phrase.label} · ${phrase.from}–${phrase.to}`;
      b.addEventListener('click',()=>{if(!practiceStarting)changePractice(()=>{state.barStart=phrase.from;state.barEnd=phrase.to;});rememberPractice();});$('piece-phrases').append(b);
    }
    $('topbar-count').textContent=`${num(e.id)} / ${DATA.exercises.length}`;
    $('tempo').value=e.bpm;$('tempo-value').textContent=e.bpm;
    $('focus-text').textContent=`Tập trung: ${e.focus}`;
    $('notation-tip').textContent=e.timeSignature==='6/8'?'6/8 · Hai nhóm ba · BPM tính theo nốt đen chấm dôi':e.rhythm==='swing'?'Swing 2:1 · Nốt dài gấp đôi nốt ngắn':e.rhythm==='triplet'?'Nhóm 3 · Ba nốt trong một phách':e.rhythm==='mixed'?'Nhóm 3 = liên ba · Hai gạch = móc kép':'Khóa Sol: tay phải · Khóa Fa: tay trái';
    $('pass-rule').textContent=e.pass_rule;
    $('variation').textContent=`Biến thể: ${e.variation}`;
    $('finger-guide').hidden=!e.fingers;$('finger-guide').textContent=e.fingers?`Ngón tay: ${e.fingers}`:'';
    $('touch-guide').hidden=!e.touch;$('touch-guide').textContent=e.touch?`Cách chạm: ${e.touch}`:'';
    $('prev-lesson').disabled=index===0;$('next-lesson').disabled=index===DATA.exercises.length-1;
    $('done-button').setAttribute('aria-pressed',state.done.has(e.id)?'true':'false');
    $('done-button').textContent=state.done.has(e.id)?'✓ Đã tập':'✓ Đánh dấu đã tập';
    renderLessons();drawScore();updatePractice();updateTime();journey?.showLesson(e);
    showView('practice',false);refreshToday();
    try{history.replaceState(null,'',`#bai-${e.id}`);}catch(_){}
  }
  function setBarOptions(){
    for(const id of ['bar-start','bar-end']){
      $(id).replaceChildren();
      for(let i=1;i<=barCount();i++){
        const option=document.createElement('option');option.value=i;option.textContent=ex().unfolded?`${i} · ô ${ex().barNumbers[i-1]}`:i;$(id).append(option);
      }
    }
    scoreEl.setAttribute('aria-label',`${ex().readingHands?.length===1?'Khuông nhạc khóa '+(ex().readingClefs[ex().readingHands[0]]==='bass'?'Fa':'Sol'):'Khuông nhạc hai tay'}, ${barCount()} ô nhịp`);
  }
  function loadSong(song){
    cancelPracticeStart();
    rememberPractice();reading?.leave();state.reading=null;clearReadingDisplay();stop(true);state.song=song;state.barStart=1;state.barEnd=song.rh.length;state.beat=0;
    state.events=flatten(composer.prepare(song)||song);state.tempo=song.bpm;state.lastScrollBar=-1;
    $('score-scroll').scrollLeft=0;setBarOptions();
    $('quest').hidden=true;$('lesson-practice').hidden=true;$('song-practice').hidden=false;
    $('book-lesson-guide').hidden=true;
    $('piece-phrases').hidden=true;
    $('lesson-title').textContent=song.title;$('lesson-goal').textContent=song.goal;
    skillGraph?.showLesson(song);
    $('stage-line').textContent=`Chơi một bài nhạc / ${song.tempoLabel}`;
    $('topbar-count').textContent=song.unfolded?'Toàn bài · có lặp':`${song.availableBars} ô nhịp`;$('full-piece').textContent=song.unfolded?'Toàn bài · có lặp':'Chọn cả 47 ô';
    $('song-practice-title').textContent=`${song.title} · 47 ô nhịp${song.unfolded?' · theo dấu lặp':''}`;
    $('tempo').value=song.bpm;$('tempo-value').textContent=song.bpm;
    $('focus-text').textContent=song.focus;$('notation-tip').textContent='Nhịp 3/4 · Đếm 1–2–3 · Chưa dùng pedal khi ghép tay';
    $('finger-guide').hidden=true;$('touch-guide').hidden=false;$('touch-guide').textContent=song.touch;
    $('prev-lesson').disabled=true;$('next-lesson').disabled=true;
    renderLessons();drawScore();updatePractice();updateTime();
    showView('practice',false);
    try{history.replaceState(null,'',`#nhac-${song.id}`);}catch(_){}
  }
  async function ensureAudio(){
    if(!state.ctx)state.ctx=new (window.AudioContext||window.webkitAudioContext)();
    // Server engines render SFZ natively on localhost; 'web' streams the Salamander web bank; 'compact' is embedded.
    const engine=$('piano-engine').value,full=!['compact','web'].includes(engine),instrument=engine==='full'?'salamander':engine;
    const Kind=full?window.FullSalamanderPiano:engine==='web'?window.WebSalamanderPiano:window.SalamanderPiano;
    if(!state.piano||state.piano.constructor!==Kind||(full&&state.piano.instrument!==instrument)){
      state.piano?.dispose();
      state.piano=full?new Kind(state.ctx,instrument):new Kind(state.ctx);
    }
    await state.ctx.resume();
    state.piano.setRoom(Number($('room').value)/100);
    // Keys of the whole piece, so the web bank fetches only what this lesson or song uses.
    const keys=[...new Set(playbackEvents().flatMap(ev=>ev.pitches.map(midiOf)))];
    await state.piano.load((loaded,total)=>{$('audio-status').textContent=`Đang nạp mẫu đàn ${loaded}/${total}`;},keys);
    $('audio-status').textContent=full||engine==='web'?`${state.piano.info.instrument||state.piano.info.name} · ${state.piano.info.velocityLayers} lớp lực nhấn`:'Đã nạp · Dùng offline';
  }
  function fullSpec(from,until){
    const spb=beatSeconds(),notes=[];
    for(const ev of playbackEvents()){
      if(!handEnabled(ev.hand)||!ev.pitches.length||ev.start+ev.dur<=from||ev.start>=until)continue;
      const start=Math.max(ev.start,from),duration=Math.min(ev.start+ev.dur,until)-start,style=soundStyle(ev);
      const velocity=Math.max(1,Math.min(127,Math.round(style.velocity*Number($('piano-touch').value)/100)));
      for(const pitch of ev.pitches)notes.push({hand:ev.hand,midi:midiOf(pitch),velocity,at:(start-from)*spb,duration:duration*spb*style.gate});
    }
    return {notes,duration:(until-from)*spb,barSeconds:ex().meter*spb,barOffsetSeconds:(from%ex().meter)*spb,tuning:$('piano-tuning').value,pedal:$('piano-pedal').checked};
  }
  async function prepareFullSegments(request){
    if(!(state.piano instanceof window.FullSalamanderPiano))return;
    $('play-status').textContent='Đang chuẩn bị tiếng đàn SFZ…';
    const piano=state.piano,from=state.beat,until=rangeEnd(),begin=rangeStart(),loop=state.loop;
    const firstSpec=fullSpec(from,until),loopSpec=loop&&from!==begin?fullSpec(begin,until):null;
    const first=await piano.prepare(firstSpec);
    const repeated=loopSpec?await piano.prepare(loopSpec):first;
    if(request!==state.startRequest)return;
    state.fullBuffers=new Map([[`${from}:${until}`,first],[`${begin}:${until}`,repeated]]);
  }
  function soundStyle(ev){
    let level=ev.hand==='rh'?.12:.085,gate=.92;
    if(ex().id===11){gate=ev.hand==='rh'?.98:.43;}
    if(ex().id===12){gate=ev.hand==='lh'?.98:.43;}
    if(ex().id===13 || ex().id===30){level=ev.hand==='rh'?.15:.045;}
    if(ex().id===14){const rightLeads=ev.bar<2;level=((ev.hand==='rh')===rightLeads) ? .15 : .045;}
    if(ex().id===15 && ((ev.hand==='rh'&&ev.beat===0)||(ev.hand==='lh'&&ev.beat===2)))level*=1.5;
    const performance=ex().performance?.[ev.hand];
    if(performance){level*=performance.gainByBar?.[ev.bar]??performance.gain??1;gate=performance.gateByBar?.[ev.bar]??performance.gate??gate;}
    let velocity=Math.max(40,Math.min(104,40+(level-.045)/.105*64));
    if(state.song&&$('song-expression').value==='expressive'){
      const expressive=window.pianoSongExpression(state.song,ev);
      if(expressive)({level,gate,velocity}=expressive);
    }
    level/=Math.sqrt(Math.max(1,ev.pitches.length));
    return {level,gate,velocity};
  }
  function scheduleTone(p,when,seconds,style){
    const source=state.piano.play(midiOf(p),when,seconds,style.level,node=>state.nodes.delete(node),style.velocity,style.gate<.6);
    state.nodes.add(source);
  }
  function scheduleClick(when,strong){
    const ctx=state.ctx,o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(strong?1250:900,when);
    g.gain.setValueAtTime(.0001,when);g.gain.exponentialRampToValueAtTime(strong?.035:.022,when+.002);g.gain.exponentialRampToValueAtTime(.0001,when+.045);
    o.connect(g);g.connect(ctx.destination);o.start(when);o.stop(when+.075);state.nodes.add(o);o.onended=()=>{state.nodes.delete(o);o.disconnect();g.disconnect();};
  }
  function scheduleSegment(from,until,when){
    const spb=beatSeconds();
    if($('metronome').checked){
      const pulse=pulseSize();
      for(let k=Math.ceil(from/pulse)*pulse;k<until;k+=pulse)scheduleClick(when+(k-from)*spb,k%ex().meter===0);
    }
    if(state.piano instanceof window.FullSalamanderPiano){
      const buffer=state.fullBuffers.get(`${from}:${until}`);
      const source=state.piano.playBuffer(buffer,when,node=>state.nodes.delete(node));
      state.nodes.add(source);return;
    }
    for(const ev of playbackEvents()){
      if(!handEnabled(ev.hand)||!ev.pitches.length||ev.start+ev.dur<=from||ev.start>=until)continue;
      const start=Math.max(ev.start,from),duration=Math.min(ev.start+ev.dur,until)-start;
      const style=soundStyle(ev);
      ev.pitches.forEach(p=>scheduleTone(p,when+(start-from)*spb,duration*spb*style.gate,style));
    }
  }
  function scheduleAhead(){
    if(!state.playing||!state.loop)return;
    const length=(rangeEnd()-rangeStart())*beatSeconds();
    while(state.nextCycleTime<state.ctx.currentTime+.25){
      scheduleSegment(rangeStart(),rangeEnd(),state.nextCycleTime);
      state.nextCycleTime+=length;
    }
  }
  function schedule(from,countIn){
    const spb=beatSeconds(),now=state.ctx.currentTime+.07;
    state.offset=from;state.countIn=countIn?pulseCount():0;state.musicStart=now+state.countIn*spb*pulseSize();
    for(let i=0;i<state.countIn;i++)scheduleClick(now+i*spb*pulseSize(),i===0);
    scheduleSegment(from,rangeEnd(),state.musicStart);
    state.nextCycleTime=state.musicStart+(rangeEnd()-from)*spb;
    state.scheduler=setInterval(scheduleAhead,25);
  }
  function currentBeat(){
    const now=transportTime();
    if((!state.timelineOnly&&!state.ctx)||now<state.musicStart)return state.offset;
    const absolute=state.offset+(now-state.musicStart)/(beatSeconds());
    if(state.loop&&absolute>=rangeEnd())return rangeStart()+(absolute-rangeEnd())%(rangeEnd()-rangeStart());
    return Math.min(rangeEnd(),absolute);
  }
  function tick(){
    if(!state.playing)return;
    const spb=beatSeconds(),now=transportTime();
    if(now<state.musicStart){
      const remaining=Math.ceil((state.musicStart-now)/(spb*pulseSize()));
      $('play-status').textContent=`Đếm vào: ${Math.max(1,remaining)}`;
    }else{
      state.beat=currentBeat();
      $('play-status').textContent=state.timelineOnly?'Đang tập theo nhịp':'Đang phát';updateTime();
      if(!state.loop&&state.beat>=rangeEnd()){
        stop(false,true);state.beat=rangeEnd();updateTime();$('play-status').textContent='Hoàn thành đoạn';return;
      }
    }
    state.raf=requestAnimationFrame(tick);
  }
  async function start(countIn=true){
    if(practiceMode==='timed'&&!timedMic){startTimeline(countIn);return;}
    if(practiceMode!=='listen'){await beginPractice(countIn);return;}
    if(state.reading&&!reading.beforeStart('listen',state.beat<=rangeStart()||state.beat>=rangeEnd()))return;
    const request=++state.startRequest;
    if(state.beat<rangeStart()||state.beat>=rangeEnd())state.beat=rangeStart();
    state.loading=true;$('play-status').textContent='Đang nạp đàn…';
    updatePracticeUX();
    $('play-icon').textContent='Ⅱ';$('play-button').setAttribute('aria-label','Hủy phát');
    try{await ensureAudio();if(request!==state.startRequest)return;await prepareFullSegments(request);}catch(error){
      console.error(error);
      if(request===state.startRequest){stop(false);$('play-status').textContent='Không nạp được âm thanh';$('audio-status').textContent=$('piano-engine').value==='web'?'Không tải được bộ Salamander web · kiểm tra kết nối tới trang, rồi bấm phát lại':$('piano-engine').value!=='compact'?'Bản SFZ cần dịch vụ và mẫu đàn đã cài · Open Full Piano.command':'Nạp thất bại · Bấm phát để thử lại';}
      return;
    }
    if(request!==state.startRequest)return;
    state.loading=false;state.playing=true;$('play-button').setAttribute('aria-label','Tạm dừng');
    updatePracticeUX();
    syncLoopStrip();
    if($('follow-score').checked)followScore(state.beat);
    schedule(state.beat,countIn&&state.beat===rangeStart());tick();
  }
  function startTimeline(countIn=true){
    if(state.reading&&!reading.beforeStart('timed',state.beat<=rangeStart()||state.beat>=rangeEnd()))return;
    stop(false);microphone?.stop();
    if(state.beat<rangeStart()||state.beat>=rangeEnd())state.beat=rangeStart();
    state.timelineOnly=true;state.offset=state.beat;
    state.countIn=countIn&&state.beat===rangeStart()?pulseCount():0;
    state.musicStart=transportTime()+.07+state.countIn*beatSeconds()*pulseSize();
    state.playing=true;syncLoopStrip();updatePracticeUX();followScore(state.beat);tick();
  }
  function stop(reset,letRing=false){
    cancelMicTempo();
    if((state.playing&&!state.timelineOnly)||state.loading||state.nodes.size)micMuteUntil=performance.now()+1500;
    state.resumeAfterSeek=false;
    state.startRequest++;state.loading=false;
    if(state.playing&&(state.ctx||state.timelineOnly))state.beat=currentBeat();
    state.playing=false;cancelAnimationFrame(state.raf);clearInterval(state.scheduler);
    state.timelineOnly=false;
    if(!letRing){
      if(state.ctx)state.nodes.forEach(o=>{try{o.fadeOut?o.fadeOut():o.stop();}catch(_){}});
      state.nodes.clear();
    }
    if(reset)state.beat=rangeStart();
    $('play-icon').textContent='▶';$('play-button').setAttribute('aria-label','Phát bài');$('play-status').textContent=reset?'Sẵn sàng':'Tạm dừng';
    if(state.events.length)updateTime();
    updatePracticeUX();
  }
  function changePractice(change){
    cancelPracticeStart();
    const was=state.playing||state.loading;stop(false);change();state.beat=rangeStart();state.lastScrollBar=-1;
    updatePractice();updateTime();scrollToRange();$('play-status').textContent='Sẵn sàng';if(was)start(true);
  }
  function scrollToRange(){
    const scale=scoreEl.querySelector('svg').clientWidth/scoreWidth||1;
    $('score-scroll').scrollLeft=Math.max(0,measureBounds[state.barStart-1].x*scale-35);
  }
  function toggleMenu(open){$('sidebar').classList.toggle('open',open);$('mobile-backdrop').hidden=!open;$('menu-button').setAttribute('aria-expanded',String(open));}
  function closeMenu(){toggleMenu(false);}
  function wire(){
    document.querySelectorAll('[data-practice-mode]').forEach(button=>button.addEventListener('click',()=>selectPracticeMode(button.dataset.practiceMode)));
    for(const hand of ['rh','lh'])$('practice-recovery-'+hand).addEventListener('click',()=>{
      cancelPracticeStart();microphone?.stop();changePractice(()=>{state.hand=hand;});rememberPractice();journey?.rememberSettings();beginPractice(true);
    });
    $('practice-recovery-listen').addEventListener('click',()=>{selectPracticeMode('listen');if(ex().book?.freePlay)changePractice(()=>{state.hand='lh';});runPracticeAction();});
    $('practice-recovery-chords').addEventListener('click',()=>{selectPracticeMode('chords');beginPractice(true);});
    $('practice-recovery-range').addEventListener('click',()=>{$('practice-options').open=true;$('bar-start').focus();});
    $('practice-segment').addEventListener('click',()=>{const open=!$('practice-options').open;$('practice-options').open=open;$('practice-segment').setAttribute('aria-expanded',String(open));});
    $('practice-options').addEventListener('toggle',()=>$('practice-segment').setAttribute('aria-expanded',String($('practice-options').open)));
    let viewSettings={landscapeControls:true,focus:false,keyboard:true,tempo:true,play:true,replay:true,timeline:true,follow:true};
    try{const saved=JSON.parse(localStorage.getItem('piano-practice-view')||'null');for(const key in viewSettings)if(typeof saved?.[key]==='boolean')viewSettings[key]=saved[key];}catch(_){}
    const lessonNav=document.querySelector('.lesson-nav');
    const playbackCluster=document.querySelector('.playback-cluster');
    const lessonHeading=document.querySelector('.lesson-heading');
    const viewTools=document.querySelector('.practice-view-tools');
    const transportMain=document.querySelector('.transport-main');
    const practiceView=$('practice-view');
    const controlsToggle=document.createElement('button');controlsToggle.id='focus-controls-toggle';controlsToggle.type='button';controlsToggle.className='focus-controls-toggle';controlsToggle.setAttribute('aria-controls','focus-transport');document.querySelector('.transport').id='focus-transport';practiceView.append(controlsToggle);
    let ownFullscreen=false,orientationRequested=false,focusRequest=0;
    const orientationHint=document.createElement('p');orientationHint.id='focus-orientation-hint';orientationHint.hidden=true;orientationHint.setAttribute('role','status');orientationHint.textContent='Xoay điện thoại ngang để xem sheet và bàn phím rộng hơn.';transportMain.append(orientationHint);
    const mobileFocus=()=>!!window.matchMedia?.('(max-width:850px)')?.matches;
    function updateOrientationHint(){orientationHint.hidden=!(viewSettings.focus&&mobileFocus()&&innerHeight>innerWidth);}
    function unlockFocusOrientation(){
      if(orientationRequested){orientationRequested=false;try{window.screen?.orientation?.unlock?.();}catch(_){}}
    }
    async function enterFocusFullscreen(request){
      const root=document.documentElement,enter=root.requestFullscreen||root.webkitRequestFullscreen;
      if(enter){
        ownFullscreen=true;
        try{await enter.call(root,{navigationUI:'hide'});}catch(_){if(request===focusRequest)ownFullscreen=false;updateOrientationHint();return;}
      }
      if(request!==focusRequest||!viewSettings.focus){
        if(!viewSettings.focus&&ownFullscreen&&(document.fullscreenElement||document.webkitFullscreenElement)){try{await (document.exitFullscreen||document.webkitExitFullscreen)?.call(document);}catch(_){}}
        return;
      }
      if(mobileFocus()&&window.screen?.orientation?.lock){
        orientationRequested=true;
        try{await window.screen.orientation.lock('landscape');}catch(_){unlockFocusOrientation();}
        if(!viewSettings.focus)unlockFocusOrientation();
      }
      updateOrientationHint();
    }
    exitFocusForNavigation=()=>{if(viewSettings.focus){focusRequest++;viewSettings.focus=false;applyViewSettings();}};
    const displayIds={keyboard:'show-keyboard',tempo:'show-tempo',play:'show-play',replay:'show-replay',timeline:'show-timeline',follow:'follow-score'};
    function applyViewSettings(){
      document.body.classList.toggle('practice-focus',viewSettings.focus);
      document.body.classList.toggle('focus-controls-hidden',!viewSettings.landscapeControls);
      controlsToggle.textContent=viewSettings.landscapeControls?'Ẩn điều khiển':'☰ Hiện điều khiển';controlsToggle.setAttribute('aria-expanded',String(viewSettings.landscapeControls));
      if(viewSettings.focus){if(lessonNav.parentElement!==playbackCluster)playbackCluster.append(lessonNav);if(viewTools.parentElement!==transportMain)transportMain.append(viewTools);}
      else{if(lessonNav.parentElement!==lessonHeading)lessonHeading.append(lessonNav);if(viewTools.parentElement!==practiceView)lessonHeading.after(viewTools);unlockFocusOrientation();if((document.fullscreenElement||document.webkitFullscreenElement)&&ownFullscreen){try{const exit=(document.exitFullscreen||document.webkitExitFullscreen)?.call(document);exit?.catch?.(()=>{});}catch(_){}}}
      updateOrientationHint();
      state.scoreGeometry=null;
      $('focus-mode').setAttribute('aria-pressed',String(viewSettings.focus));$('focus-mode').textContent=viewSettings.focus?'⛶ Thoát tập trung':'⛶ Tập trung';
      $('keyboard-view').hidden=!viewSettings.keyboard;
      document.querySelector('.tempo-control').hidden=!viewSettings.tempo;
      $('play-button').hidden=!viewSettings.play;$('stop-button').hidden=!viewSettings.replay;
      $('score-timeline').hidden=!viewSettings.timeline;
      for(const [key,id] of Object.entries(displayIds))$(id).checked=viewSettings[key];
      if(state.events.length){layoutScore();syncLoopStrip();layoutScore();paintCursor(state.beat);}
      try{localStorage.setItem('piano-practice-view',JSON.stringify(viewSettings));}catch(_){}
    }
    controlsToggle.addEventListener('click',()=>{viewSettings.landscapeControls=!viewSettings.landscapeControls;applyViewSettings();});
    $('focus-mode').addEventListener('click',()=>{
      const request=++focusRequest;viewSettings.focus=!viewSettings.focus;
      if(viewSettings.focus){viewSettings.keyboard=true;$('keyboard-view').open=true;$('practice-options').open=false;window.scrollTo?.({top:0,behavior:'instant'});enterFocusFullscreen(request);}
      applyViewSettings();
    });
    const fullscreenChanged=()=>{if(!document.fullscreenElement&&!document.webkitFullscreenElement&&ownFullscreen){ownFullscreen=false;focusRequest++;viewSettings.focus=false;applyViewSettings();}state.scoreGeometry=null;layoutScore();paintCursor(state.beat);};
    document.addEventListener('fullscreenchange',fullscreenChanged);document.addEventListener('webkitfullscreenchange',fullscreenChanged);
    window.screen?.orientation?.addEventListener?.('change',updateOrientationHint);
    for(const [key,id] of Object.entries(displayIds))$(id).addEventListener('change',()=>{viewSettings[key]=$(id).checked;applyViewSettings();syncLoopStrip();paintCursor(state.beat);if(key==='follow'&&viewSettings.follow)followScore(state.beat);});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&viewSettings.focus){viewSettings.focus=false;applyViewSettings();$('focus-mode').focus();}});
    applyViewSettings();
    if(window.ResizeObserver){
      const scoreResize=new ResizeObserver(()=>{state.scoreGeometry=null;if(state.events.length){layoutScore();syncLoopStrip();layoutScore();if($('follow-score').checked)followScore(state.beat);else paintCursor(state.beat);}});scoreResize.observe($('score-scroll'));scoreResize.observe(document.querySelector('.score-viewport'));
    }
    window.addEventListener('resize',()=>{state.scoreGeometry=null;updateOrientationHint();});
    $('score-scroll').addEventListener('scroll',()=>{if(!state.playing||!$('follow-score').checked)paintCursor(state.beat);},{passive:true});
    document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.view)));
    $('today-resume').addEventListener('click',()=>{
      const id=journey.resumeLesson();
      if(state.reading&&!reading?.diagnostics().saved.session?.finished){reading?.begin();return;}
      if(state.song||ex().id===id)showView('practice');else loadLesson(id-1);
    });
    $('practice-exit').addEventListener('click',()=>showView(state.reading?'reading':'today'));
    const showExpression=()=>{$('song-expression-note').textContent=$('song-expression').value==='expressive'?'Giai điệu có hướng đi, phần đệm nhẹ, cuối câu dịu xuống. Nhịp vẫn giữ đều.':'Lực nhấn ổn định để dễ ghép hai tay.';};
    $('song-expression').addEventListener('change',()=>{
      const was=state.playing||state.loading;stop(false);showExpression();songs?.refreshCheck();if(was)start(false);
    });
    const localServer=location.protocol==='http:'&&['localhost','127.0.0.1'].includes(location.hostname);
    // localhost: native SFZ; other http(s) (e.g. GitHub Pages): web bank; file://: embedded compact bank.
    const fileMode=location.protocol==='file:';
    for(const option of $('piano-engine').options){
      if(option.value==='web')option.disabled=fileMode;
      else if(option.value!=='compact'&&!localServer){option.disabled=true;if(!option.textContent.includes('cần server'))option.textContent=option.textContent.replace(/ \((mở server|chưa cài)\)$/,'')+' (cần server)';}
    }
    $('piano-engine').value=localServer?'full':fileMode?'compact':'web';
    const instrumentDetails=new Map();
    const showEngine=()=>{
      const engine=$('piano-engine').value,full=!['compact','web'].includes(engine),instrument=engine==='full'?'salamander':engine;
      const ivy=engine.startsWith('piano162'),vcsl=engine==='vcsl-model-b',converted=instrumentDetails.get(engine)?.edition==='converted-korg';
      $('instrument-name').textContent=vcsl?'♪ VCSL · S Model B':ivy?'♪ Piano in 162 · Ivy Audio':'♪ Salamander Grand Piano';
      $('piano-tuning-control').hidden=ivy||vcsl;
      $('full-piano-options').hidden=!full;
      $('full-piano-link').hidden=location.protocol!=='file:';
      $('full-piano-hint').textContent=vcsl?'Grand piano S Model B · VCSL Keys · SFZ gốc, có mẫu pedal và nhả phím.':ivy?'Piano in 162 · '+(engine.endsWith('ambient')?'Ambient · âm phòng thu':'Close · thu gần')+(converted?' · bản chuyển từ Korg, 5 mức lực nhấn dựng lại'+(engine.endsWith('ambient')?' · không có mẫu pedal-on riêng':' · có mẫu pedal-on/off'):' · SFZ gốc · 5 lớp lực nhấn.'):full?'SFZ gốc · 16 lớp lực nhấn · tiếng nhả phím, cộng hưởng và pedal.':engine==='web'?'Salamander web · đủ 30 phím thu thật × 8 lớp lực nhấn · tải theo bài, không cần server.':localServer?'Đang dùng bộ MP3 gọn. Chọn “Salamander · SFZ” để nghe bộ mẫu gốc.':'Bản đầy đủ: mở Open Full Piano.command, rồi bấm liên kết phía trên để giữ tiến độ.';
      if(instrumentDetails.get(engine)?.description)$('full-piano-hint').textContent=instrumentDetails.get(engine).description;
    };
    showEngine();
    if(localServer)fetch('/api/piano/status').then(response=>response.json()).then(info=>{
      $('piano162-install-note').hidden=(info.instruments||[]).some(item=>item.id.startsWith('piano162')&&item.available);
      for(const item of info.instruments||[]){
        instrumentDetails.set(item.id,item);
        const option=[...$('piano-engine').options].find(option=>option.value===item.id);
        if(option){option.disabled=!item.available;option.textContent=item.name+(item.available?'':' (chưa cài)');}
      }
      showEngine();
    }).catch(()=>{});
    $('piano-pedal').addEventListener('change',()=>songs?.refreshCheck());
    $('piano-touch').addEventListener('input',()=>{$('piano-touch-value').textContent=$('piano-touch').value+'%';});
    for(const id of ['piano-engine','piano-tuning','piano-pedal','piano-touch'])$(id).addEventListener('change',()=>{
      const was=state.playing||state.loading;stop(false);showEngine();if(was)start(false);
    });
    $('full-piano-link').addEventListener('click',()=>{
      rememberPractice();const values={};
      try{for(const key of progressKeys){const value=localStorage.getItem(key);if(value!==null)values[key]=value;}}catch(_){}
      $('full-piano-link').href='http://127.0.0.1:8765/#import='+encodeURIComponent(JSON.stringify(values));
    });
    try{const saved=Number(localStorage.getItem('piano-room')??40);if(Number.isFinite(saved))$('room').value=Math.max(0,Math.min(100,saved));}catch(_){}
    $('room-value').textContent=$('room').value+'%';
    $('room').addEventListener('input',()=>{
      $('room-value').textContent=$('room').value+'%';
      state.piano?.setRoom(Number($('room').value)/100);
      try{localStorage.setItem('piano-room',$('room').value);}catch(_){}
    });
    document.querySelectorAll('[data-hand]').forEach(button=>button.addEventListener('click',()=>{
      if(state.hand===button.dataset.hand)return;
      const keepListening=practiceMode==='step'&&microphone?.active&&micHandEligibility[button.dataset.hand];
      cancelPracticeStart();if(practiceMode!=='listen'&&!keepListening)microphone?.stop();
      const was=state.playing||state.loading;stop(false);state.hand=button.dataset.hand;updatePractice();updateTime();rememberPractice();if(was)start(false);
      if(keepListening){
        microphone.needsQuiet=true;microphone.quietFrames=0;microphone.clearNote();
        state.beat=micTargets[0]?.beat??rangeStart();updateTime();followScore(state.beat);
        $('mic-brief').textContent='Nhả phím rồi tập '+(state.hand==='rh'?'tay phải':'tay trái');
      }
    }));
    $('bar-start').addEventListener('change',e=>changePractice(()=>{state.barStart=Number(e.target.value);state.barEnd=Math.max(state.barStart,state.barEnd);}));
    $('bar-end').addEventListener('change',e=>changePractice(()=>{state.barEnd=Number(e.target.value);state.barStart=Math.min(state.barStart,state.barEnd);}));
    $('full-piece').addEventListener('click',()=>changePractice(()=>{state.barStart=1;state.barEnd=barCount();}));
    $('loop').addEventListener('change',()=>{const was=state.playing||state.loading;stop(false);state.loop=$('loop').checked;updateTime();if($('follow-score').checked)followScore(state.beat);if(was)start(false);});
    $('play-button').addEventListener('click',()=>{
      runPracticeAction();
    });
    $('stop-button').addEventListener('click',()=>{cancelPracticeStart();stop(true);followScore(rangeStart());start(true);});
    $('prev-lesson').addEventListener('click',()=>{try{if(state.reading)reading.move(-1);else loadLesson(state.index-1);}catch(err){console.error(err);$('play-status').textContent=String(err.message||err);}});
    $('next-lesson').addEventListener('click',()=>{try{if(state.reading)reading.move(1);else loadLesson(state.index+1);}catch(err){console.error(err);$('play-status').textContent=String(err.message||err);}});
    $('tempo').addEventListener('input',e=>{const was=state.playing||state.loading;if(was)stop(false);state.tempo=Number(e.target.value);$('tempo-value').textContent=state.tempo;updateTime();if(was)start(false);});
    $('metronome').addEventListener('change',()=>{if(state.playing){stop(false);start(false);}});
    $('progress').addEventListener('input',e=>{
      const chosen=Number(e.target.value);
      if(state.playing||state.loading){stop(false);state.resumeAfterSeek=true;}
      state.beat=Math.max(rangeStart(),Math.min(rangeEnd(),chosen));updateTime();followScore(state.beat);
    });
    $('progress').addEventListener('change',e=>{const chosen=Number(e.target.value),was=state.playing||state.loading||state.resumeAfterSeek;state.resumeAfterSeek=false;if(state.playing||state.loading)stop(false);state.beat=Math.max(rangeStart(),Math.min(rangeEnd(),chosen));updateTime();followScore(state.beat);if(was)start(false);});
    $('done-button').addEventListener('click',()=>{if(state.song||state.reading)return;const id=ex().id;if(state.done.has(id))state.done.delete(id);else state.done.add(id);try{localStorage.setItem('piano-independence-done',JSON.stringify([...state.done]));}catch(_){}$('done-button').setAttribute('aria-pressed',state.done.has(id)?'true':'false');$('done-button').textContent=state.done.has(id)?'✓ Đã tập':'✓ Đánh dấu đã tập';renderLessons();});
    $('menu-button').addEventListener('click',()=>toggleMenu(!$('sidebar').classList.contains('open')));
    $('mobile-backdrop').addEventListener('click',closeMenu);
    document.addEventListener('keydown',e=>{if(e.code==='Space'&&!$('practice-view').hidden&&!e.target.closest?.('button,input,select,summary,a,textarea')){e.preventDefault();runPracticeAction();}if(e.key==='Escape')closeMenu();});
    ['bar-start','bar-end','loop','metronome','progress'].forEach(id=>$(id).addEventListener('change',()=>state.reading?rememberPractice():journey?.rememberSettings()));
    $('tempo').addEventListener('input',()=>state.reading?rememberPractice():journey?.rememberSettings());
    window.addEventListener('pagehide',()=>state.reading?rememberPractice():journey?.rememberSettings());
    window.addEventListener('hashchange',()=>{
      if(/^#ky-nang(?:\/[^/]+)?$/.test(location.hash)){showSkillRoute(location.hash);return;}
      if(location.hash==='#doc-nhac/tap'){reading?.begin();return;}
      const routes={'#doc-nhac':'reading','#hom-nay':'today','#hanh-trinh':'journey','#bai-nhac':'songs'};
      if(routes[location.hash]){showView(routes[location.hash],false);return;}
      const m=location.hash.match(/^#bai-(\d+)$/),song=location.hash.match(/^#nhac-(.+)$/);
      if(m&&(state.reading||state.song||Number(m[1])!==ex().id))loadLesson(Number(m[1])-1);
      else if(m)showView('practice',false);
      if(song&&state.song?.id!==song[1]&&window.PIANO_SONGS.some(item=>item.id===song[1]))$('song-open').click();
      else if(song&&state.song?.id===song[1])showView('practice',false);
    });
  }
  function targetsForHand(hand){
    const groups=new Map();
    for(const ev of playbackEvents()){if((hand!=='both'&&ev.hand!==hand)||!ev.pitches.length||ev.start<rangeStart()||ev.start>=rangeEnd())continue;const key=Math.round(ev.start*1e7)/1e7;if(!groups.has(key))groups.set(key,{beat:ev.start,pitches:new Set(),eventKeys:[]});groups.get(key).eventKeys.push(ev.key,...(ev.tieKeys||[]));for(const pitch of ev.pitches)groups.get(key).pitches.add(midiOf(pitch));}
    return [...groups.values()].sort((a,b)=>a.beat-b.beat).map(group=>({...group,pitches:[...group.pitches]}));
  }
  function canGradeTargets(targets){return !ex().book?.freePlay&&targets.length>0&&targets.every(t=>t.pitches.length>0&&t.pitches.every(p=>p>=36&&p<=84));}
  function resetMicPractice(){
    cancelMicTempo();micTempoSession=null;micTempoLast=null;closeMicTempoResult();
    scoreEl.querySelectorAll('[data-mic-grade]').forEach(node=>node.removeAttribute('data-mic-grade'));
    micTargets=targetsForHand(state.hand);micTargetIndex=0;
    for(const hand of ['rh','lh','both'])micHandEligibility[hand]=canGradeTargets(hand===state.hand?micTargets:targetsForHand(hand));
    const context=JSON.stringify([state.song?'song':'exercise',ex().id,state.hand,state.barStart,state.barEnd,micMode,practiceMode==='timed',micTargets]);
    if(context!==micRoundContext){micRoundContext=context;micLastRound=null;micRounds=0;}
    micRound={exact:0,near:0,retry:0,self:0};
    $('mic-feedback').textContent='';showMicTarget();updateMicSummary();updateMicFlow();
    // After micTargets is rebuilt: a changed piece, hand, range or tempo needs its own model.
    if(scoreModel.key!==modelKey()&&!learning)refreshScoreModel();
  }
  function micRoundText(round){return `${round.exact} đúng quãng tám · ${round.near} lệch quãng tám · ${round.retry} lần thử lại${round.self?` · ${round.self} tự kiểm`:''}`;}
  function updateMicSummary(){
    $('mic-round-summary').textContent=`Đã qua ${micTargetIndex}/${micTargets.length} vị trí · ${micRoundText(micRound)}`;
    $('mic-last-round').textContent=micLastRound?`Lượt ${micRounds} đã hoàn thành: ${micRoundText(micLastRound)}. ${micLastRound.acceptedNear?'Có nốt gần đúng được đi tiếp; hãy luyện lại đúng quãng tám.':'Tất cả vị trí đã được đánh đúng nốt và quãng tám.'}`:'';
    $('mic-last-round').hidden=!micLastRound;
    updateStepTarget();expectMicTarget();
  }
  function updateStepTarget(){
    const target=micTargets[micTargetIndex],hand=state.hand==='rh'?'Tay phải':state.hand==='lh'?'Tay trái':'Hai tay';
    textIfChanged('mic-step-target',target?`${hand} · Cần ${target.pitches.map(noteName).join(' + ')}${selfCheckTarget(target)?' · tự kiểm':''} · ${micTargetIndex+1}/${micTargets.length}`:micLastRound?`${hand} · Hoàn thành ${micTargets.length} nốt`:`${hand} · Chọn đoạn luyện`);
  }
  function updateMicMode(){
    $('mic-grading-mode').value=micMode;
    $('mic-mode-hint').textContent=practiceMode==='timed'?(micMode==='relaxed'?'Đúng nốt nhận trọn điểm cao độ; cùng tên nốt lệch quãng tám nhận nửa điểm. Nhịp có khoảng dung sai rộng hơn.':'Đúng nốt và quãng tám mới có điểm cao độ. Nhịp có khoảng dung sai hẹp hơn.'):micMode==='relaxed'?'Đúng tên nốt nhưng lệch quãng tám: đi tiếp, ghi gần đúng màu vàng. Nốt khác: thử lại.':'Đúng nốt và quãng tám mới đi tiếp. Lệch quãng tám: hướng dẫn chỉnh và thử lại.';
  }
  function updateMicFlow(){
    updateMicMode();
    $('mic-flow-hint').textContent=practiceMode==='timed'?'Sheet chạy sau một ô đếm vào. Điểm: 70% cao độ + 30% nhịp. Nốt chưa rõ được ghi riêng.':'Sheet chờ bạn đánh từng nốt. Chưa chấm nhịp; âm chưa rõ không tính sai.';
    $('loop').disabled=false;
    if(!transportRunning())$('play-button').setAttribute('aria-label','Phát bài');
    updatePracticeUX();
  }
  const textIfChanged=(id,text)=>{if($(id).textContent!==text)$(id).textContent=text;};
  const attrIfChanged=(element,name,value)=>{if(element.getAttribute(name)!==String(value))element.setAttribute(name,String(value));};
  const propertyIfChanged=(element,name,value)=>{if(element[name]!==value)element[name]=value;};
  // Timed microphone scoring: single notes via YIN, chords via the Worker verifier; octave-doubled
  // chords (self-check in step practice) are skipped and left out of the score.
  const timedTargetsSupported=()=>canGradeTargets(micTargets);
  function practiceSupported(){return practiceMode==='timed'?!timedMic||timedTargetsSupported():practiceMode==='chords'||canGradeTargets(micTargets);}
  function practiceUnavailableReason(){
    if(ex().book?.freePlay)return 'Ứng tác tự do: nghe nền tay trái rồi tự chơi trên đàn; bài này không có đáp án để chấm bằng micro.';
    if(!micTargets.length)return 'Tay và đoạn đang chọn không có nốt để chấm. Đổi tay hoặc đoạn luyện.';
    return 'Đoạn này có nốt ngoài C2–C6, vượt dải chấm của micro. Đổi tay, đoạn luyện hoặc nghe mẫu để tự tập.';
  }
  function updatePracticeUX(){
    const listening=practiceMode==='listen',timeline=practiceMode==='timed',scored=timeline&&timedMic,stepping=practiceMode==='step',observing=practiceMode==='chords',busy=practiceStarting||!!microphone?.pending;
    const running=listening||timeline?state.playing||state.loading||!!micTempoSession?.running:!!microphone?.active&&!busy;
    document.querySelectorAll('#piece-phrases button').forEach(button=>propertyIfChanged(button,'disabled',!!micTempoSession?.running||busy));
    attrIfChanged(document.body,'data-practicing',running||busy);
    attrIfChanged(document.body,'data-input-mode',practiceMode);
    for(const button of document.querySelectorAll('[data-practice-mode]')){const selected=String(button.dataset.practiceMode===practiceMode);if(button.getAttribute('aria-pressed')!==selected)button.setAttribute('aria-pressed',selected);}
    propertyIfChanged($('mic-controls'),'hidden',listening||(timeline&&!scored)||(!stepping&&!scored&&!microphone?.active&&!microphone?.pending&&!micLastRound));
    propertyIfChanged($('timed-mic-option'),'hidden',!timeline);propertyIfChanged($('timed-mic'),'checked',timedMic);propertyIfChanged($('mic-timed-live'),'hidden',!scored);
    propertyIfChanged($('mic-step-target'),'hidden',!stepping||!practiceSupported());
    syncSelfCheck();
    propertyIfChanged($('mic-settings'),'hidden',listening||(timeline&&!scored));
    propertyIfChanged($('progress'),'disabled',stepping||!!micTempoSession?.running);
    propertyIfChanged($('mic-chord-panel'),'hidden',timeline||stepping||(!observing&&!microphone?.guardEnabled));
    for(const id of ['mic-mode-hint','mic-flow-hint','mic-grading-mode'])propertyIfChanged($(id).tagName==='SELECT'?$(id).closest('label'):$(id),'hidden',observing);
    propertyIfChanged(document.querySelector('.practice-feedback-detail'),'hidden',observing);
    propertyIfChanged($('mic-guard-toggle').closest('label'),'hidden',observing);
    textIfChanged('mic-input-help',observing?'Đánh đủ hợp âm và nhả pedal; ưu tiên C3–C6. Âm thanh được xử lý trên thiết bị. Tên và quãng tám nghe được có thể sai; chưa dùng để chấm bài.':'Đánh từng nốt hoặc hợp âm trong C2–C6, nhả pedal. Âm thanh được xử lý trên thiết bị. Hợp âm được so với đúng các phím cần đánh; bộ nghe còn có thể nhầm. Chưa chấm trường độ hoặc lực nhấn.');
    const unavailable=!listening&&!(timeline&&!scored)&&!observing&&!busy&&!running&&!practiceSupported();
    propertyIfChanged($('play-button'),'disabled',false);
    propertyIfChanged($('practice-recovery'),'hidden',!unavailable);
    for(const hand of ['rh','lh'])propertyIfChanged($('practice-recovery-'+hand),'hidden',!micHandEligibility[hand]||hand===state.hand);
    propertyIfChanged($('practice-recovery-chords'),'hidden',!!ex().book?.freePlay);
    attrIfChanged($('play-button'),'aria-describedby',unavailable?'practice-guidance practice-recovery':'practice-guidance');
    const label=busy?'Hủy mở micro':timeline?(running?'Tạm dừng':'Bắt đầu tập'):observing?(running?'Dừng nghe':'Bắt đầu nghe'):listening?(state.loading?'Hủy tải':state.playing?'Tạm dừng':'Nghe mẫu'):running?'Kết thúc tập':unavailable?'Chọn cách tập':'Bắt đầu tập';
    textIfChanged('play-label',label);attrIfChanged($('play-button'),'aria-label',label);propertyIfChanged($('play-button'),'title',label+' · Space');
    textIfChanged('play-icon',running||busy?'Ⅱ':'▶');
    if(!listening&&practiceMode==='step')textIfChanged('play-status',busy?'Đang chuẩn bị…':running?'Tập từng nốt':micLastRound?'Hoàn thành lượt':'Sẵn sàng');
    if(observing)textIfChanged('play-status',busy?'Đang chuẩn bị…':running?'Nghe hợp âm':'Sẵn sàng');
    propertyIfChanged($('metronome').closest('label'),'hidden',!listening);
    propertyIfChanged($('loop').closest('label'),'hidden',false);
    textIfChanged('practice-segment',`Ô ${state.barStart}–${state.barEnd} ▾`);
    propertyIfChanged($('practice-segment'),'disabled',!!micTempoSession?.running||busy);
    document.querySelectorAll('[data-hand]').forEach(button=>{
      propertyIfChanged(button,'disabled',!!micTempoSession?.running||busy);
      propertyIfChanged(button,'title','');
    });
    let guidance=scored&&practiceSupported()?'Sheet chạy theo tempo sau một ô đếm vào; micro chấm cao độ (70%) và nhịp (30%) từng nốt và hợp âm, tổng kết cuối lượt.':timeline&&!scored?'Sheet chạy theo tempo để bạn tự chơi trên đàn. Không cần micro, không chấm điểm.':observing?'Bấm bắt đầu, rồi đánh đủ hợp âm trên đàn. Ưu tiên C3–C6; nhả pedal để các nốt rõ hơn. Chưa chấm hoặc chạy sheet.':listening?'Chọn tay và tempo rồi nghe câu mẫu.':!practiceSupported()?practiceUnavailableReason():`Chọn tay, bấm Bắt đầu tập rồi đánh nốt trên đàn. Micro nghe ${state.hand==='rh'?'tay phải':state.hand==='lh'?'tay trái':'hai tay'}; đúng nốt thì sheet đi tiếp.`;
    if(!listening&&!(timeline&&!scored)&&microphone?.lastError&&!microphone.active&&!busy)guidance=microphone.lastError;
    if(busy)guidance=microphone?.pending?'Cho phép micro trong trình duyệt để bắt đầu.':'Nhả phím và chờ tiếng mẫu tắt…';
    if(evalRun?.round===2)guidance=`Lượt 2 · đánh giá: ở ${evalRun.slips.length} nốt viền cam, đánh phím ngay bên phải (cao hơn nửa cung); các nốt khác chơi đúng.`;
    else if(evalRun)guidance='Lượt 1 · đánh giá: chơi đúng cả đoạn theo nhịp; app đang thu để so các cách chấm.';
    textIfChanged('practice-guidance',guidance);
  }
  function cancelPracticeStart(){
    practiceStartToken++;const pending=practiceStarting||microphone?.pending;practiceStarting=false;
    if(pending)microphone?.stop();
    updatePracticeUX();
  }
  function selectPracticeMode(next){
    if(!['listen','step','timed','chords'].includes(next))return;
    cancelPracticeStart();stop(false);microphone?.stop();
    practiceMode=next;
    if(microphone)microphone.lastError=null;
    microphone?.configureGuard();
    $('mic-settings').open=false;$('practice-options').open=false;
    updatePractice();state.beat=rangeStart();updateTime();updatePracticeUX();
  }
  async function beginPractice(countIn=true){
    if(practiceMode==='timed'&&!timedMic){startTimeline(countIn);return;}
    if(practiceStarting||microphone?.pending)return;
    if(!practiceSupported()){updatePracticeUX();$('practice-recovery').focus();$('practice-recovery').scrollIntoView?.({behavior:'smooth',block:'nearest'});return;}
    stop(false);const token=++practiceStartToken,mode=practiceMode;practiceStarting=true;updatePracticeUX();
    try{
      // Build or load the per-exercise model while the microphone opens; wait for it before grading.
      const modelBuild=mode!=='chords'?refreshScoreModel():null;
      if(!microphone.active)await microphone.start();
      if(token!==practiceStartToken||mode!==practiceMode||!microphone.active)return;
      const until=performance.now()+8000;
      while(microphone.active&&(microphone.needsQuiet||performance.now()<micMuteUntil)&&performance.now()<until){
        await new Promise(resolve=>setTimeout(resolve,50));if(token!==practiceStartToken||mode!==practiceMode)return;
      }
      if(!microphone.active||token!==practiceStartToken)return;
      if(microphone.needsQuiet||performance.now()<micMuteUntil){microphone.stop();microphone.lastError='Âm chưa tắt. Nhả phím và pedal rồi bấm bắt đầu lại.';return;}
      await modelBuild;if(token!==practiceStartToken||mode!==practiceMode||!microphone.active)return;
      practiceStarting=false;
      if(mode==='timed')startMicTempo(countIn);
      else if(mode==='chords'){$('mic-settings').open=false;}
      else{resetMicPractice();state.beat=micTargets[0]?.beat??rangeStart();updateTime();followScore(state.beat);$('mic-settings').open=false;}
    }finally{if(token===practiceStartToken){practiceStarting=false;updatePracticeUX();}}
  }
  function runPracticeAction(){
    if(practiceStarting||microphone?.pending||transportRunning()||(['step','chords'].includes(practiceMode)&&microphone?.active)){
      cancelPracticeStart();stop(false);if(practiceMode!=='listen')microphone.stop();updatePracticeUX();return;
    }
    if(practiceMode!=='listen'&&!practiceSupported()){beginPractice(true);return;}
    start(true);document.querySelector('.score-panel').scrollIntoView?.({behavior:'smooth',block:'start'});
  }
  function lockMicTempoControls(locked){
    for(const id of ['tempo','progress','bar-start','bar-end','full-piece','loop','metronome'])$(id).disabled=locked;
    document.querySelectorAll('[data-hand]').forEach(button=>button.disabled=locked);
  }
  function closeMicTempoResult(){const dialog=$('mic-timed-result');if(dialog.open){if(dialog.close)dialog.close();else dialog.open=false;}}
  function cancelMicTempo(){
    if(!micTempoSession?.running)return;
    if(evalRun){textIfChanged(`eval-round${evalRun.round}-status`,'Lượt đã dừng · chưa đánh giá.');evalRun=null;markSlips([]);microphone?.stopTakes();}
    micTempoSession.running=false;cancelAnimationFrame(micTempoRaf);lockMicTempoControls(false);
    $('play-icon').textContent='▶';$('play-button').setAttribute('aria-label','Bắt đầu luyện theo tempo');$('play-status').textContent='Lượt đã dừng';
    $('mic-timed-live').textContent='Lượt đã dừng · chưa có điểm tổng';
    $('mic-feedback').textContent='Lượt đã dừng. Bấm Bắt đầu lượt để tập lại.';
    updatePracticeUX();
  }
  function markMicTempo(target){
    for(const key of target.eventKeys||[])$(`ev-${key}`)?.setAttribute('data-mic-grade',target.status);
  }
  function updateMicTempoSummary(){
    const summary=micTempoSession.summary();
    $('mic-round-summary').textContent=`Đã xử lý ${summary.resolved}/${summary.total-summary.skipped} nốt${summary.skipped?` (${summary.skipped} mục trùng quãng tám không chấm)`:''} · ${summary.exact} đúng · ${summary.near} lệch quãng tám · ${summary.wrong} khác nốt · ${summary.missed} chưa ghi nhận · ${summary.unreadable} chưa rõ`;
    $('mic-timed-live').textContent=`Theo tempo · ${summary.resolved}/${summary.total-summary.skipped} nốt`;
  }
  function finishMicTempo(){
    const session=micTempoSession,evalDone=evalRun;micTempoLast={...session.summary(),tempo:state.tempo,mode:micMode,hand:state.hand,barStart:state.barStart,barEnd:state.barEnd};
    cancelAnimationFrame(micTempoRaf);lockMicTempoControls(false);microphone.stop();
    $('play-icon').textContent='▶';$('play-button').setAttribute('aria-label','Bắt đầu luyện theo tempo');$('play-status').textContent='Hoàn thành lượt';
    $('mic-timed-live').textContent='Đã có điểm tổng';$('mic-brief').textContent='Hoàn thành lượt theo tempo';delete $('mic-brief').dataset.result;
    const r=micTempoLast;$('mic-timed-score').textContent=r.score===null?'—':`${r.score}/100`;
    $('mic-timed-breakdown').textContent=`Cao độ: ${r.noteScore??'—'}/100 · Nhịp: ${r.timingScore??'—'}/100. ${r.exact} đúng · ${r.near} lệch quãng tám · ${r.wrong} khác nốt · ${r.missed} chưa ghi nhận. ${r.early} sớm · ${r.late} muộn · ${r.extra} lần đánh thêm.${r.skipped?` ${r.skipped} mục có phím trùng tên khác quãng tám không được chấm.`:''}`;
    $('mic-timed-coverage').textContent=`Đánh giá ${r.evaluated}/${r.total-r.skipped} nốt; ${r.unreadable} nốt chưa rõ được loại khỏi điểm. ${r.coverage<75?'Bộ nghe chưa rõ nhiều nốt; hãy kiểm tra micro và tập lại.':'Điểm dựa trên những gì micro ghi nhận; bộ nghe vẫn có thể nhầm.'}`;
    $('mic-timed-context').textContent=`${ex().title} · ${state.hand==='rh'?'Tay phải':state.hand==='lh'?'Tay trái':'Hai tay'} · Ô ${state.barStart}–${state.barEnd} · ${state.tempo} BPM`;
    const dialog=$('mic-timed-result');if(dialog.showModal)dialog.showModal();else dialog.open=true;
    updatePracticeUX();
    if(evalDone)finishEvalRound(evalDone);
  }
  function tickMicTempo(){
    const session=micTempoSession;if(!session?.running||!microphone.active||!microphone.context)return;
    const now=microphone.context.currentTime,changes=session.advance(now);changes.forEach(markMicTempo);if(changes.length)updateMicTempoSummary();
    // Point the verifier at the chord whose window is open or next; it switches once the previous
    // window closes, before the next one opens, so no attack inside a window is lost.
    const due=session.current(now),options=due&&due.status!=='skipped'?modelOptions(session.targets.indexOf(due)):null;
    microphone.expect(options?due.pitches:due?.chord&&due.status!=='skipped'?due.pitches:null,options||{});
    state.beat=session.beatAt(now);updateTime();
    if(now<session.startTime){
      const remaining=Math.ceil((session.startTime-now)/(session.spb*pulseSize()));$('play-status').textContent=`Đếm vào: ${Math.min(pulseCount(),remaining)}`;
    }else{$('play-status').textContent=state.beat>=rangeEnd()?'Chờ phản hồi nốt cuối…':`Tập · phách ${Math.floor((state.beat%ex().meter)/pulseSize())+1}`;}
    if(!session.running){finishMicTempo();return;}
    micTempoRaf=requestAnimationFrame(tickMicTempo);
  }
  function startMicTempo(countIn=true){
    if(!microphone?.active){$('mic-feedback').textContent='Bấm Bắt đầu lượt để mở micro và luyện theo nhịp.';updatePracticeUX();return;}
    if(microphone.needsQuiet||performance.now()<micMuteUntil){$('mic-feedback').textContent='Nhả phím, chờ tiếng mẫu tắt trước khi bắt đầu lượt theo tempo.';return;}
    stop(false);resetMicPractice();
    if(!timedTargetsSupported()){
      $('mic-feedback').textContent='Đoạn này chưa chấm được theo nhịp: chọn tay hoặc đoạn có nốt trong C2–C6.';$('practice-options').open=true;return;
    }
    state.loop=false;$('loop').checked=false;syncLoopStrip();state.beat=rangeStart();
    micTempoSession=new window.PianoMicTempo.Session({targets:micTargets.map(t=>({...t,skip:selfCheckTarget(t)})),tempo:state.tempo*(ex().tempoBeat||1),startTime:microphone.context.currentTime+.1+(countIn?ex().meter*beatSeconds():0),fromBeat:rangeStart(),endBeat:rangeEnd(),mode:micMode});
    // With a model every target (single notes too) is graded through verification.
    if(modelReady())for(const t of micTempoSession.targets)if(t.status!=='skipped')t.chord=true;
    recordEvalRound();
    lockMicTempoControls(true);$('mic-settings').open=false;$('mic-target').textContent=`Luyện theo tempo · ô ${state.barStart}–${state.barEnd}`;
    $('mic-feedback').textContent='Theo nhịp đếm trên màn hình; sheet tiếp tục chạy khi bạn đánh sai.';
    $('play-icon').textContent='Ⅱ';$('play-button').setAttribute('aria-label','Dừng lượt luyện');updateMicTempoSummary();updatePracticeUX();tickMicTempo();
  }
  const noteName=midi=>['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'][midi%12]+(Math.floor(midi/12)-1);
  function showMicTarget(){
    delete $('mic-brief').dataset.result;
    const target=micTargets[micTargetIndex];
    $('mic-target').textContent=target?`Cần: ${target.pitches.map(noteName).join(' + ')} · ô ${Math.floor(target.beat/ex().meter)+1}`:'Đã hết đoạn luyện.';
    $('mic-brief').textContent=microphone?.active?(target?`Cần ${target.pitches.map(noteName).join(' + ')}`:'Hoàn thành đoạn'):'Chưa nghe micro';
  }
  // Chord targets (several keys at one onset, either hand) are verified against the expected
  // notes in the Worker; single notes keep the answer-blind YIN grading below.
  // Three or more keys with an octave-doubled pitch class (e.g. the same triad in both hands)
  // cannot be verified key by key: their partials coincide. The learner confirms these.
  const selfCheckTarget=target=>!!target&&target.pitches.length>2&&new Set(target.pitches.map(p=>p%12)).size<target.pitches.length;
  // Per-exercise model: built from the learner's single-key takes for this piece, hand, range and tempo.
  // When ready, every target (single notes too) is verified with its reference weights and the keys
  // still sounding per the score (experiments/score-informed: 64.9% -> 84.4% on rendered performances).
  let scoreModel={key:null,status:'none',missing:[],model:null,background:[]},modelWorker=null,modelRequest=0,learning=null;
  const modelKey=()=>`${state.song?'song:'+state.song.id:'ex:'+ex().id}|${state.hand}|${state.barStart}-${state.barEnd}|${state.tempo}`;
  function modelInputs(){
    const spb=beatSeconds(),from=rangeStart(),notes=fullSpec(from,rangeEnd()).notes.filter(n=>n.midi>=36&&n.midi<=96);
    const targets=micTargets.map(t=>({time:(t.beat-from)*spb,pitches:t.pitches.slice().sort((a,b)=>a-b)}));
    return {notes,targets,keys:[...new Set([...notes.map(n=>n.midi),...targets.flatMap(t=>t.pitches)])].sort((a,b)=>a-b)};
  }
  async function refreshScoreModel(){
    const key=modelKey(),request=++modelRequest;
    if(!window.PianoKeyTakes||!window.indexedDB||!window.Worker||!micTargets.length||ex().book?.freePlay){scoreModel={key,status:'none',missing:[],model:null,background:[]};renderScoreModel();return;}
    const inputs=modelInputs();let takes;
    try{takes=await window.PianoKeyTakes.load(inputs.keys);}catch(_){scoreModel={key,status:'error',error:'trình duyệt không cho lưu phím đã thu',missing:[],model:null,background:[]};renderScoreModel();return;}
    if(request!==modelRequest)return;
    const missing=inputs.keys.filter(midi=>!takes[midi]);
    if(missing.length){scoreModel={key,status:'missing',missing,have:inputs.keys.length-missing.length,model:null,background:[]};renderScoreModel();return;}
    scoreModel={key,status:'building',missing:[],model:null,background:[]};renderScoreModel();
    modelWorker??=new Worker('audio/model-worker.js?v=0a7152c-96802d346793');
    const result=await new Promise(resolve=>{
      modelWorker.onmessage=({data})=>{if(data.request===request)resolve(data);};modelWorker.onerror=event=>resolve({request,error:event.message||'lỗi Worker'});
      modelWorker.postMessage({type:'build',request,id:key,notes:inputs.notes,targets:inputs.targets,takes:Object.fromEntries(Object.entries(takes).map(([midi,take])=>[midi,{pcm:take.pcm,rate:take.rate}]))});
    });
    if(request!==modelRequest)return;
    scoreModel=result.error?{key,status:'error',error:result.error,missing:[],model:null,background:[]}:{key,status:'ready',missing:[],model:result.model,background:inputs.targets.map(t=>window.PianoScoreModel.backgroundAt(inputs.notes,t.time,t.pitches))};
    renderScoreModel();expectMicTarget();
  }
  const modelReady=()=>scoreModel.status==='ready'&&scoreModel.key===modelKey()&&scoreModel.model.targets.length===micTargets.length;
  const modelOptions=index=>modelReady()&&scoreModel.model.targets[index]?{reference:scoreModel.model.targets[index].reference,background:scoreModel.background[index]}:null;
  function renderScoreModel(){
    const m=scoreModel,text=m.key!==modelKey()?'Đang kiểm tra phím đã thu…':m.status==='ready'?`Chấm theo tiếng đàn của bạn cho đoạn này · ${m.model.targets.length} mục tiêu.`:m.status==='building'?'Đang dựng mô hình từ các phím đã thu…':m.status==='missing'?`Thu ${m.missing.length} phím (${m.missing.map(noteName).join(', ')}) để chấm theo tiếng đàn của bạn; đã có ${m.have}.`:m.status==='error'?`Không dựng được mô hình: ${m.error}.`:'Đang chấm theo bộ mẫu chung.';
    textIfChanged('score-model-status',text);propertyIfChanged($('score-model-learn'),'hidden',m.status!=='missing'||m.key!==modelKey());
    if($('eval-dialog').open)renderEval();
  }
  // Guided takes: each missing key once, medium touch; a wrong key is reported, not stored.
  async function learnKeys(){
    if(scoreModel.status!=='missing'||learning)return;
    const keys=scoreModel.missing.slice(),dialog=$('take-dialog'),wasActive=!!microphone?.active;let index=0;
    const show=()=>{textIfChanged('take-key',keys[index]!==undefined?noteName(keys[index]):'✓');textIfChanged('take-progress',`${Math.min(index,keys.length)}/${keys.length} phím`);
      document.querySelectorAll('#keyboard .take-target').forEach(key=>key.classList.remove('take-target'));document.querySelector(`#keyboard [data-midi="${keys[index]}"]`)?.classList.add('take-target');};
    learning={cancel:null};if(dialog.showModal)dialog.showModal();else dialog.open=true;textIfChanged('take-feedback','Đang mở micro…');show();
    try{
      stop(false);if(!microphone.active)await microphone.start();
      if(!microphone.active)throw Error(microphone.lastError||'Không mở được micro.');
      const rate=microphone.context.sampleRate,collector=new window.PianoKeyTakes.TakeCollector({rate,minRms:Math.max(.002,(microphone.config?.minRms||0)*4)});
      textIfChanged('take-feedback',`Đánh ${noteName(keys[0])} một lần, lực vừa, rồi nhả phím.`);
      await new Promise((resolve,reject)=>{
        learning.cancel=resolve;learning.skip=()=>{index++;if(index>=keys.length)resolve();else{show();textIfChanged('take-feedback',`Đã bỏ qua. Đánh ${noteName(keys[index])}.`);}};
        microphone.startTakes(async block=>{
          const pcm=collector.push(block);if(!pcm||index>=keys.length)return;
          const midi=keys[index],check=window.PianoKeyTakes.checkPitch(window.PianoPitch,pcm,rate,midi,microphone.config?.a4||440);
          if(!check.ok){textIfChanged('take-feedback',`Nghe ra ${noteName(check.heard)}, cần ${noteName(midi)} · đánh lại.`);return;}
          await window.PianoKeyTakes.save({midi,rate,pcm});index++;show();
          if(index>=keys.length)resolve();else textIfChanged('take-feedback',`Đã thu ${noteName(midi)}. Tiếp: ${noteName(keys[index])}.`);
        }).catch(reject);
      });
      textIfChanged('take-feedback',index>=keys.length?'Đã thu xong. Đang dựng mô hình…':'Đã dừng thu.');
    }catch(error){textIfChanged('take-feedback',error.message||'Không thu được.');}
    finally{
      // Leave the microphone as it was, so the primary button still means "start practice".
      microphone?.stopTakes();if(!wasActive)microphone?.stop();learning=null;document.querySelectorAll('#keyboard .take-target').forEach(key=>key.classList.remove('take-target'));
      scoreModel.key=null;await refreshScoreModel();
      if(scoreModel.status==='ready')textIfChanged('take-feedback','Mô hình đã sẵn sàng · lượt tập sau chấm theo tiếng đàn của bạn.');
    }
  }
  // Real-piano evaluation: two scored tempo rounds (clean, then with marked slips) are recorded raw from the
  // same microphone clock and re-scored offline by the generic and the model method on identical audio.
  let evalRun=null,evalRounds={},evalWorker=null,evalRequest=0;
  const openDialog=id=>{const d=$(id);if(d.open)return;if(d.showModal)d.showModal();else d.open=true;};
  const closeDialog=id=>{const d=$(id);if(!d.open)return;if(d.close)d.close();else d.open=false;};
  function chooseSlips(){
    const graded=micTargets.map((t,i)=>({t,i})).filter(({t,i})=>i>0&&i<micTargets.length-1&&!selfCheckTarget(t)),count=Math.min(6,Math.floor(graded.length/3));
    return count?Array.from({length:count},(_,k)=>graded[Math.floor((k+.5)*graded.length/count)].i):[];
  }
  function markSlips(indices){
    scoreEl.querySelectorAll('[data-eval-slip]').forEach(node=>node.removeAttribute('data-eval-slip'));
    for(const i of indices)for(const key of micTargets[i]?.eventKeys||[])$(`ev-${key}`)?.setAttribute('data-eval-slip','');
  }
  function renderEval(){
    const ready=modelReady(),busy=!!evalRun,m=scoreModel;
    textIfChanged('eval-context',`${state.song?state.song.title:ex().title} · ${state.hand==='rh'?'Tay phải':state.hand==='lh'?'Tay trái':'Hai tay'} · Ô ${state.barStart}–${state.barEnd} · ${state.tempo} BPM. Đổi bài, tay, đoạn hoặc tempo ở màn luyện trước khi mở hộp này.`);
    textIfChanged('eval-model',ready?`Mô hình theo tiếng đàn của bạn: sẵn sàng (${m.model.targets.length} mục tiêu).`:m.status==='missing'?`Cần thu ${m.missing.length} phím trước: ${m.missing.map(noteName).join(', ')}.`:m.status==='building'?'Đang dựng mô hình…':'Chưa có mô hình cho đoạn này.');
    propertyIfChanged($('eval-learn'),'hidden',m.status!=='missing');
    const slipCount=chooseSlips().length;
    propertyIfChanged($('eval-round1'),'disabled',!ready||busy);propertyIfChanged($('eval-round2'),'disabled',!ready||busy||!slipCount);
    if(!slipCount&&!evalRounds[2])textIfChanged('eval-round2-status','Chọn đoạn dài hơn (từ 5 nốt) để lượt 2 có nốt lỗi.');
    const rounds=Object.values(evalRounds),table=$('eval-table');table.hidden=!rounds.length;
    $('eval-download').disabled=$('eval-download-audio').disabled=!rounds.length;
    if(!rounds.length)return;
    const comparison=window.PianoEvaluation.compare(rounds),pct=(a,b)=>b?`${a}/${b} (${Math.round(100*a/b)}%)`:'—';
    table.tBodies[0].replaceChildren(...[['generic','Bộ mẫu chung'],['model','Theo tiếng đàn của bạn']].filter(([k])=>comparison[k]).map(([k,label])=>{
      const c=comparison[k],row=document.createElement('tr');
      for(const text of [label,pct(c.accepted,c.correct),c.slips?pct(c.slipsAccepted,c.slips):'chưa có lượt 2',c.medianTimingMs===null?'—':`${c.medianTimingMs} ms`])row.insertCell().textContent=text;return row;}));
    textIfChanged('eval-note','“Nốt đúng được nhận”: các nốt bạn chơi đúng mà bộ nghe chấm đúng. “Lỗi bị cho qua”: nốt viền cam (lượt 2) mà bộ nghe vẫn chấm đúng — càng thấp càng tốt. Nếu lượt 1 lỡ chơi sai, hãy thu lại lượt đó.');
  }
  async function startEvalRound(round){
    if(!modelReady()||evalRun)return;
    closeDialog('eval-dialog');
    if(practiceMode!=='timed')selectPracticeMode('timed');
    timedMic=true;$('timed-mic').checked=true;updatePracticeUX();
    const slips=round===2?chooseSlips():[];
    evalRun={round,slips,blocks:[],samples:0,firstTime:null,rate:null,params:null};
    markSlips(slips);
    await beginPractice(true);
    if(evalRun&&!evalRun.params){evalRun=null;markSlips([]);textIfChanged(`eval-round${round}-status`,'Chưa bắt đầu được lượt.');openDialog('eval-dialog');renderEval();}
  }
  function recordEvalRound(){
    if(!evalRun||evalRun.params)return;
    const run=evalRun;
    run.params={targets:micTargets.map(t=>({beat:t.beat,pitches:t.pitches.slice().sort((a,b)=>a-b),skip:selfCheckTarget(t)})),tempo:state.tempo*(ex().tempoBeat||1),fromBeat:rangeStart(),endBeat:rangeEnd(),
      startTime:micTempoSession.startTime,config:{...microphone.config},mode:micMode==='precise'?'precise':'relaxed',model:modelReady()?micTargets.map((_,i)=>modelOptions(i)):null};
    microphone.startTakes((block,rate,time)=>{if(evalRun!==run)return;run.rate=rate;if(run.firstTime===null)run.firstTime=time;run.blocks.push(block);run.samples+=block.length;}).catch(()=>{});
  }
  async function finishEvalRound(run){
    evalRun=null;markSlips([]);microphone?.stopTakes();closeMicTempoResult();openDialog('eval-dialog');
    const status=`eval-round${run.round}-status`;
    if(!run.params||!run.samples){textIfChanged(status,'Không thu được âm thanh · thử lại.');renderEval();return;}
    const pcm=new Float32Array(run.samples);let at=0;for(const block of run.blocks){pcm.set(block,at);at+=block.length;}
    textIfChanged(status,'Đang phân tích bằng cả hai cách chấm…');renderEval();
    evalWorker??=new Worker('audio/eval-worker.js?v=0a7152c-96802d346793');const request=++evalRequest;
    const result=await new Promise(resolve=>{
      evalWorker.onmessage=({data})=>{if(data.request===request)resolve(data);};evalWorker.onerror=event=>resolve({error:event.message||'lỗi Worker'});
      evalWorker.postMessage({type:'evaluate',request,pcm,rate:run.rate,...run.params,startTime:run.params.startTime-run.firstTime});
    });
    if(result.error){textIfChanged(status,`Không phân tích được: ${result.error}`);renderEval();return;}
    evalRounds[run.round]={slips:run.params.targets.map((_,i)=>run.slips.includes(i)),results:result.results,live:micTempoLast?{...micTempoLast}:null,params:{...run.params,model:!!run.params.model},audio:{pcm,rate:run.rate}};
    textIfChanged(status,`Đã thu và phân tích ${run.params.targets.length} mục tiêu.`);renderEval();
  }
  function evalReport(){
    return {version:1,date:new Date().toISOString(),userAgent:navigator.userAgent,device:microphone.settings??null,
      context:{piece:state.song?state.song.id:ex().id,title:state.song?state.song.title:ex().title,hand:state.hand,bars:[state.barStart,state.barEnd],tempo:state.tempo,modelBuildMs:scoreModel.model?.buildMs??null},
      comparison:window.PianoEvaluation.compare(Object.values(evalRounds)),
      rounds:Object.fromEntries(Object.entries(evalRounds).map(([round,r])=>[round,{slips:r.slips,results:r.results,live:r.live,params:r.params}]))};
  }
  function download(name,blob){const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);}
  function wavBlob(pcm,rate){
    const out=new DataView(new ArrayBuffer(44+pcm.length*2)),text=(at,s)=>{for(let i=0;i<s.length;i++)out.setUint8(at+i,s.charCodeAt(i));};
    text(0,'RIFF');out.setUint32(4,36+pcm.length*2,true);text(8,'WAVEfmt ');out.setUint32(16,16,true);out.setUint16(20,1,true);out.setUint16(22,1,true);out.setUint32(24,rate,true);out.setUint32(28,rate*2,true);out.setUint16(32,2,true);out.setUint16(34,16,true);text(36,'data');out.setUint32(40,pcm.length*2,true);
    for(let i=0;i<pcm.length;i++)out.setInt16(44+i*2,Math.round(Math.max(-1,Math.min(1,pcm[i]))*32767),true);
    return new Blob([out.buffer],{type:'audio/wav'});
  }
  function expectMicTarget(){
    const target=practiceMode==='step'?micTargets[micTargetIndex]:null,options=target&&!selfCheckTarget(target)?modelOptions(micTargetIndex):null;
    microphone?.expect(options?target.pitches:target?.pitches.length>1&&!selfCheckTarget(target)?target.pitches:null,options||{});
    syncSelfCheck();
  }
  function syncSelfCheck(){propertyIfChanged($('mic-self-check'),'hidden',!(practiceMode==='step'&&microphone?.active&&selfCheckTarget(micTargets[micTargetIndex])));}
  function confirmSelfCheck(){
    const target=micTargets[micTargetIndex];if(!microphone?.active||practiceMode!=='step'||!selfCheckTarget(target))return;
    micRound.self++;const brief=`Tự kiểm ${target.pitches.slice().sort((a,b)=>a-b).map(noteName).join(' + ')}`;
    $('mic-feedback').textContent=`${brief}: micro chưa phân biệt được các phím trùng tên khác quãng tám.`;$('mic-brief').textContent=brief;delete $('mic-brief').dataset.result;
    advanceMicTarget(brief);syncSelfCheck();
  }
  function gradeChord(result,target){
    const verify=result.verify,keys=target.pitches.slice().sort((a,b)=>a-b);
    if(!verify||verify.expected?.join()!==keys.join())return;
    if(verify.status==='loading'){$('mic-brief').textContent='Đang nạp bộ nghe hợp âm…';return;}
    if(verify.status==='error'){$('mic-feedback').textContent='Không nạp được bộ nghe hợp âm. Tắt rồi bật lại micro.';return;}
    if(!verify.fresh)return;
    if(verify.decision==='missing'){$('mic-brief').textContent=`Chưa nghe ${verify.missing.map(noteName).join(' + ')} · đánh đủ hợp âm`;delete $('mic-brief').dataset.result;return;}
    if(verify.decision==='wrong'){
      micRound.retry++;
      $('mic-feedback').textContent=`Có phím ${verify.intruders.map(noteName).join(' + ')} không cần đánh · cần ${keys.map(noteName).join(' + ')}. Thử lại nhé.`;
      $('mic-brief').textContent=`Phím lạ ${verify.intruders.map(noteName).join(' + ')} · thử lại`;$('mic-brief').dataset.result='wrong';updateMicSummary();return;
    }
    if(verify.decision!=='match')return;
    micRound.exact++;
    const brief=`✓ ${keys.map(noteName).join(' + ')}`;
    $('mic-feedback').textContent=`Đúng: ${keys.map(noteName).join(' + ')}`;$('mic-brief').textContent=brief;$('mic-brief').dataset.result='correct';
    advanceMicTarget(brief);
  }
  function advanceMicTarget(brief){
    micTargetIndex++;
    if(micTargetIndex===micTargets.length){
      micLastRound={...micRound,acceptedNear:micMode==='relaxed'?micRound.near:0};micRounds++;
      if(state.loop){micTargetIndex=0;micRound={exact:0,near:0,retry:0,self:0};$('mic-feedback').textContent+=' · lượt tiếp theo';}
      else{updateMicSummary();microphone.stop();$('mic-target').textContent='Đã hết đoạn luyện.';$('mic-feedback').textContent+=` · Hoàn thành lượt luyện, micro đã tắt.`;$('mic-brief').textContent=micLastRound.acceptedNear?'≈ Hoàn thành · còn nốt cần chỉnh':'✓ Hoàn thành';$('mic-brief').dataset.result=micLastRound.acceptedNear?'near':'correct';return;}
    }
    const next=micTargets[micTargetIndex];state.beat=next.beat;updateTime();followScore(state.beat);
    $('mic-brief').textContent=`${brief} · tiếp: ${next.pitches.map(noteName).join(' + ')}`;
    $('mic-target').textContent=`Cần: ${next.pitches.map(noteName).join(' + ')} · ô ${Math.floor(next.beat/ex().meter)+1}`;
    if(!micTargetIndex)$('mic-brief').textContent+=' · lượt mới';
    updateMicSummary();
  }
  function receiveMic(result){
    if(!microphone.active||practiceStarting||state.timelineOnly||learning)return;
    if(practiceMode==='timed'){
      if(!micTempoSession?.running)return;
      const target=micTempoSession.observe(result);if(!target)return;
      if(target.status==='pending'){
        // Chord verdict not final yet: missing/extra keys can still resolve within this attack.
        const v=target.provisional;$('mic-brief').textContent=v.decision==='wrong'?`Phím lạ ${v.intruders.map(noteName).join(' + ')}`:`Chưa nghe ${v.missing.map(noteName).join(' + ')}`;delete $('mic-brief').dataset.result;return;
      }
      markMicTempo(target);updateMicTempoSummary();
      const pitch=target.status==='exact'?'✓ Đúng':target.status==='near'?'≈ Lệch quãng tám':'Khác nốt';
      const timing=target.timing==='on-time'?'đúng nhịp':`${target.timing==='early'?'sớm':'muộn'} ${Math.round(Math.abs(target.deltaMs))} ms`;
      const keys=target.pitches.map(noteName).join(' + '),heard=target.chord?keys:noteName(result.midi);
      $('mic-brief').textContent=`${pitch} ${heard} · ${timing}`;$('mic-brief').dataset.result=target.status==='exact'?'correct':target.status==='near'?'near':'wrong';
      $('mic-feedback').textContent=`${pitch}: nghe ${heard}, cần ${keys} · ${timing}`;return;
    }
    if(practiceMode!=='step')return;
    const target=micTargets[micTargetIndex];if(!target)return;
    if(selfCheckTarget(target)){textIfChanged('mic-brief','Tự kiểm · đánh rồi bấm Tiếp');return;}
    if(target.pitches.length>1||modelOptions(micTargetIndex)){gradeChord(result,target);return;}
    if(result.status!=='note'){delete $('mic-brief').dataset.result;$('mic-brief').textContent=result.status==='quiet'?'Âm quá nhỏ · không tính sai':result.status==='clipping'?'Âm quá lớn · không tính sai':'Chưa chắc chắn · không tính sai';if(!$('mic-feedback').textContent)$('mic-feedback').textContent='Chưa nghe rõ · thử lại, không tính sai.';return;}
    if(!result.attack)return;
    if(target.pitches[0]<36||target.pitches[0]>84){$('mic-feedback').textContent='Nốt yêu cầu ngoài C2–C6; chọn đoạn trong dải hỗ trợ.';return;}
    const grade=micGrading.grade(result,target.pitches[0],micMode);if(grade.kind==='ungraded')return;
    micRound[grade.kind]++;
    const near=grade.kind==='near',correct=grade.kind==='exact';
    const octaveHint=near?`chỉnh ${grade.octaves>0?'lên':'xuống'} ${Math.abs(grade.octaves)} quãng tám`:'';
    $('mic-feedback').textContent=correct?`Đúng: ${noteName(result.midi)}`:near?`Gần đúng: ${noteName(result.midi)} · cần ${noteName(target.pitches[0])}, ${octaveHint}. ${grade.advance?'Được đi tiếp; lượt sau thử đúng quãng tám.':'Thử lại nốt này.'}`:`Bạn đánh ${noteName(result.midi)} · cần ${noteName(target.pitches[0])}. Thử lại nhé.`;
    const brief=correct?`✓ ${noteName(result.midi)}`:near?`≈ ${noteName(result.midi)} · ${octaveHint}`:`${noteName(result.midi)} · thử lại ${noteName(target.pitches[0])}`;
    $('mic-brief').textContent=brief;
    $('mic-brief').dataset.result=correct?'correct':near?'near':'wrong';
    if(grade.advance){advanceMicTarget(brief);return;}
    updateMicSummary();
  }
  updateMicMode();
  renderKeyboard();wire();
  microphone=new window.PianoMicrophone({
    observationOnly:()=>practiceMode==='chords',
    onStart(){stop(false);if(practiceMode==='chords')return;resetMicPractice();state.beat=micTargets[0]?.beat??rangeStart();updateTime();followScore(state.beat);},
    onResult:receiveMic,onStop(){cancelMicTempo();$('mic-brief').textContent='Micro đã tắt';delete $('mic-brief').dataset.result;syncSelfCheck();},
    onStateChange:updatePracticeUX,
    isBlocked(){if(state.playing||state.loading||state.nodes.size)return 'Đang nghe mẫu · micro tạm ngưng chấm';if(performance.now()<micMuteUntil)return 'Chờ tiếng mẫu tắt…';return false;}
  });
  window.pianoEvalReport=()=>evalReport();
  window.pianoMicDiagnostics=()=>({practiceMode,starting:practiceStarting,active:microphone.active,captureTime:microphone.context?.currentTime??null,settings:microphone.settings,gradingMode:micMode,timedMic,evaluation:{running:!!evalRun,recordedSamples:evalRun?.samples??0,rounds:Object.keys(evalRounds),comparison:Object.keys(evalRounds).length&&window.PianoEvaluation?window.PianoEvaluation.compare(Object.values(evalRounds)):null},scoreModel:{status:scoreModel.status,current:scoreModel.key===modelKey(),missing:scoreModel.missing.slice(),ready:modelReady(),buildMs:scoreModel.model?.buildMs??null},timed:{running:!!micTempoSession?.running,startTime:micTempoSession?.startTime??null,summary:micTempoSession?.summary()??null,lastResult:micTempoLast?{...micTempoLast}:null},practice:{targetIndex:micTargetIndex,targetCount:micTargets.length,expected:microphone.expected??null,round:{...micRound},lastRound:micLastRound?{...micLastRound}:null,completedRounds:micRounds},guardMode:microphone.guardEnabled?'observe':'off',guard:microphone.lastGuard,chord:microphone.lastChord,attacks:microphone.metrics.map(item=>({...item}))});
  $('mic-grading-mode').addEventListener('change',()=>{
    micMode=micGrading.mode($('mic-grading-mode').value);try{localStorage.setItem('piano-mic-mode-v1',micMode);}catch(_){}
    updateMicMode();stop(false);resetMicPractice();state.beat=micTargets[0]?.beat??rangeStart();updateTime();followScore(state.beat);
    $('mic-feedback').textContent='Đã đổi chế độ · bắt đầu lại đoạn luyện.';
  });
  $('mic-self-check').addEventListener('click',confirmSelfCheck);
  $('eval-open').addEventListener('click',()=>{if(scoreModel.key!==modelKey())refreshScoreModel().then(renderEval);renderEval();openDialog('eval-dialog');});
  $('eval-learn').addEventListener('click',()=>{closeDialog('eval-dialog');learnKeys();});
  $('eval-round1').addEventListener('click',()=>startEvalRound(1));
  $('eval-round2').addEventListener('click',()=>startEvalRound(2));
  $('eval-close').addEventListener('click',()=>closeDialog('eval-dialog'));
  $('eval-download').addEventListener('click',()=>download(`danh-gia-micro-${new Date().toISOString().slice(0,10)}.json`,new Blob([JSON.stringify(evalReport(),null,1)],{type:'application/json'})));
  $('eval-download-audio').addEventListener('click',()=>{for(const [round,r] of Object.entries(evalRounds))download(`ban-thu-luot-${round}.wav`,wavBlob(r.audio.pcm,r.audio.rate));});
  $('score-model-learn').addEventListener('click',learnKeys);
  $('take-skip').addEventListener('click',()=>learning?.skip?.());
  $('take-close').addEventListener('click',()=>{learning?.cancel?.();const dialog=$('take-dialog');if(dialog.close)dialog.close();else dialog.open=false;});
  $('mic-timed-close').addEventListener('click',closeMicTempoResult);
  $('mic-timed-retry').addEventListener('click',()=>{closeMicTempoResult();beginPractice(true);});
  $('timed-mic').addEventListener('change',()=>{
    timedMic=$('timed-mic').checked;try{localStorage.setItem('piano-timed-mic-v1',timedMic?'1':'0');}catch(_){}
    cancelPracticeStart();stop(false);microphone?.stop();updatePractice();updatePracticeUX();
  });
  $('mic-reset').addEventListener('click',()=>{stop(false);resetMicPractice();state.beat=micTargets[0]?.beat??rangeStart();updateTime();followScore(state.beat);});

  journey=window.createPianoJourney({
    data:DATA,
    getSettings:()=>({hand:state.hand,barStart:state.barStart,barEnd:state.barEnd,tempo:state.tempo,loop:state.loop}),
    applySettings(settings){
      stop(false);state.hand=settings.hand;state.barStart=settings.barStart;state.barEnd=settings.barEnd;
      state.tempo=settings.tempo;state.loop=settings.loop;state.beat=rangeStart();state.lastScrollBar=-1;
      $('tempo').value=state.tempo;$('tempo-value').textContent=state.tempo;$('loop').checked=state.loop;
      updatePractice();updateTime();$('play-status').textContent='Sẵn sàng';
    },
    openLesson:id=>{loadLesson(DATA.exercises.findIndex(e=>e.id===id));closeMenu();$('quest-title').scrollIntoView?.({behavior:'smooth',block:'center'});},
    stop:()=>stop(false),
    completeLesson(id){
      state.done.add(id);try{localStorage.setItem('piano-independence-done',JSON.stringify([...state.done]));}catch(_){}
      $('done-button').setAttribute('aria-pressed','true');$('done-button').textContent='✓ Đã tập';
    },
    refreshLessons:renderLessons
  });
  composer=window.createPianoComposer({onChange(value){
    stop(false);state.events=flatten(value);state.beat=rangeStart();state.lastScrollBar=-1;
    drawScore();updatePractice();updateTime();journey.rememberSettings();
  }});
  songs=window.PIANO_SONGS?.length?window.createPianoSongs({
    open:loadSong,
    settings:()=>({hand:state.hand,barStart:state.barStart,barEnd:state.barEnd,tempo:state.tempo,loop:state.loop,pedal:$('piano-pedal').checked,expression:$('song-expression').value,metronome:$('metronome').checked}),
    apply(settings){
      stop(false);state.hand=settings.hand;state.barStart=settings.barStart;state.barEnd=settings.barEnd;
      state.tempo=settings.tempo;state.loop=settings.loop;state.beat=rangeStart();state.lastScrollBar=-1;
      $('tempo').value=state.tempo;$('tempo-value').textContent=state.tempo;$('loop').checked=state.loop;
      $('piano-pedal').checked=settings.pedal===true;
      $('song-expression').value=settings.expression==='expressive'?'expressive':'practice';
      $('song-expression-note').textContent=settings.expression==='expressive'?'Giai điệu có hướng đi, phần đệm nhẹ, cuối câu dịu xuống. Nhịp vẫn giữ đều.':'Lực nhấn ổn định để dễ ghép hai tay.';
      if(typeof settings.metronome==='boolean')$('metronome').checked=settings.metronome;
      updatePractice();updateTime();scrollToRange();
    },
    play:()=>start(false),back:()=>loadLesson(state.index)
  }):null;
  if(!songs)document.querySelectorAll('[data-view="songs"],.song-teaser').forEach(element=>element.hidden=true);
  function showSkillRoute(route){
    showView('skills',false);
    const id=route.slice('#ky-nang/'.length);if(route.startsWith('#ky-nang/'))skillGraph.select(id);
    try{history.replaceState(null,'',route);}catch(_){}
  }
  skillGraph=window.createPianoSkillGraph({data:DATA,
    navigate(id){showView('skills',false);try{history.replaceState(null,'',`#ky-nang/${id}`);}catch(_){}$('skills-title').focus({preventScroll:true});if(innerWidth<1000)$('skill-detail-title').scrollIntoView?.({behavior:'smooth',block:'start'});},
    openLesson:id=>loadLesson(DATA.exercises.findIndex(e=>e.id===id)),
    openSong:id=>{location.hash=`#nhac-${id}`;}
  });
  function concealReading(mode){
    document.body.dataset.readingConceal=mode||'';
    document.querySelectorAll('[data-practice-mode=step],[data-practice-mode=chords]').forEach(button=>{button.disabled=!!mode;button.title=mode?'Mở sheet kiểm tra trước khi dùng micro':'';});
    for(const id of ['score','loop-score','active-notes','keyboard']){
      const hidden=mode==='all'||(mode==='notation'&&(id==='score'||id==='loop-score'));
      if($(id)){$(id).setAttribute('aria-hidden',String(hidden));$(id).inert=hidden;}
    }
  }
  function clearReadingDisplay(){
    if($('reading-practice'))$('reading-practice').hidden=true;
    document.body.classList.remove('reading-active');concealReading(null);$('loop').disabled=false;
  }
  function openReading(lesson,settings){
    cancelPracticeStart();if(!state.reading)rememberPractice();stop(true);microphone?.stop();songs?.deactivate();
    state.song=null;state.reading=lesson;state.hand=settings?.readingLayout!==lesson.readingRevision?lesson.defaultHand:['both','rh','lh'].includes(settings?.hand)?settings.hand:lesson.defaultHand;
    state.barStart=Math.max(1,Math.min(lesson.rh.length,Number(settings?.barStart)||1));state.barEnd=Math.max(state.barStart,Math.min(lesson.rh.length,Number(settings?.barEnd)||lesson.rh.length));state.tempo=Math.max(30,Math.min(180,Number(settings?.tempo)||lesson.bpm));
    state.loop=false;state.beat=0;state.lastScrollBar=-1;state.events=flatten(lesson);composer.prepare(lesson);
    $('quest').hidden=true;$('song-practice').hidden=true;$('lesson-practice').hidden=true;$('reading-practice').hidden=false;
    $('book-lesson-guide').hidden=true;$('piece-phrases').hidden=true;document.body.classList.add('reading-active');
    $('lesson-title').textContent=lesson.title;$('lesson-goal').textContent=lesson.goal;$('lesson-skills').replaceChildren();
    $('stage-line').textContent='Đọc nhạc mỗi ngày';$('topbar-count').textContent=lesson.id;$('full-piece').textContent='Cả bài';
    $('focus-text').textContent=lesson.focus;$('notation-tip').textContent=lesson.lookAhead?'Vạch tím: vị trí nên nhìn trước tay.':'Quan sát trước · giữ nhịp · tự kiểm tra';
    $('finger-guide').hidden=true;$('touch-guide').hidden=true;$('tempo').value=state.tempo;$('tempo-value').textContent=state.tempo;
    $('loop').checked=false;$('loop').disabled=lesson.isSightReading;
    setBarOptions();drawScore();selectPracticeMode(lesson.conceal?lesson.defaultMode:settings?.mode||lesson.defaultMode);updatePractice();updateTime();
    if(settings?.beat!=null){state.beat=roundBeat(Number(settings.beat)||0);updateTime();followScore(state.beat);}
    showView('practice',false);history.replaceState(null,'','#doc-nhac/tap');
  }
  if(window.createPianoReading)reading=window.createPianoReading({
    open:openReading,stop(){cancelPracticeStart();stop(false);microphone?.stop();},
    dashboard:()=>showView('reading'),conceal:concealReading,
    active:()=>document.body.dataset.view==='practice'&&!state.loading&&!practiceStarting,
    settings:()=>({hand:state.hand,tempo:state.tempo,barStart:state.barStart,barEnd:state.barEnd,beat:state.beat,mode:practiceMode,readingLayout:state.reading?.readingRevision||'source-v1'}),
    navigation(previous,next){$('prev-lesson').disabled=!previous;$('next-lesson').disabled=!next;},
    keyboardTarget(pitches){keysEl.querySelectorAll('.key').forEach(k=>k.classList.remove('ready-rh','ready-lh','ready-both'));for(const pitch of pitches)keysEl.querySelector(`[data-midi="${midiOf(pitch)}"]`)?.classList.add('ready-rh');}
  });
  window.pianoReadingDiagnostics=()=>reading?.diagnostics();
  const songHash=location.hash.match(/^#nhac-(.+)$/),hash=location.hash.match(/^#bai-(\d+)$/);
  loadLesson(hash?Number(hash[1])-1:journey.resumeLesson()-1);
  if(songHash&&window.PIANO_SONGS.some(song=>song.id===songHash[1]))$('song-open').click();
  if(/^#ky-nang(?:\/[^/]+)?$/.test(initialRoute))showSkillRoute(initialRoute);
  else if(initialRoute==='#doc-nhac/tap')reading?.begin();
  else if(!songHash&&!/^#bai-\d+$/.test(initialRoute))showView(({'#doc-nhac':'reading','#hanh-trinh':'journey','#bai-nhac':'songs','#hom-nay':'today'})[initialRoute]||'journey');
})();
