/* Pure scheduling and notation adapter; no microphone/expected-note inference. */
(() => {
  'use strict';
  const modules=[
    ['KG','Định hướng bàn phím',3,2],['NR','Đọc nốt',4,2],['IN','Đọc quãng',5,2],
    ['PT','Nhận dạng mẫu',5,3],['TC','Kỹ thuật',5,2],['CH','Hợp âm & hòa âm',5,2],
    ['RH','Tiết tấu',4,2],['SR','Thị tấu',8,4],['LA','Nhìn trước khi chơi',3,1],['EA','Nghe & hình dung âm',3,2]
  ].map(([id,title,minutes,quota])=>({id,title,minutes,quota}));
  const midi=p=>12*(Number(p.slice(-1))+1)+{C:0,D:2,E:4,F:5,G:7,A:9,B:11}[p[0]]+(p.includes('#')?1:p.includes('b')?-1:0);
  const empty=()=>({version:1,records:{},session:null,previousFamilies:[],sessions:0,level:2});
  function sanitize(value,bank){
    const clean=empty(),ids=new Set(bank.families.flatMap(f=>f.variants.map(v=>v.id)));
    if(value?.version!==1)return clean;
    clean.level=value.level===1?1:2;clean.sessions=Math.max(0,Number(value.sessions)||0);
    for(const [id,r] of Object.entries(value.records||{}))if(ids.has(id)&&r&&typeof r==='object'){
      clean.records[id]={completed:Math.max(0,Number(r.completed)||0),reads:Math.max(0,Number(r.reads)||0),lastSeen:Math.max(0,Number(r.lastSeen)||0),needsReview:!!r.needsReview,heard:!!r.heard};
    }
    clean.previousFamilies=Array.isArray(value.previousFamilies)?value.previousFamilies.filter(id=>bank.families.some(f=>f.code===id)):[];
    const session=value.session;
    if(session&&Array.isArray(session.items)&&session.items.length<=22&&session.items.every(i=>ids.has(i.id)&&['pending','done','skipped'].includes(i.status))){
      clean.session={...session,cursor:Math.max(0,Math.min(session.items.length-1,Number(session.cursor)||0)),elapsed:Math.max(0,Number(session.elapsed)||0),finished:!!session.finished};
    }
    return clean;
  }
  function plan(bank,saved,now=Date.now(),only=null){
    const items=[],unavailable=[],chosen=new Set(),previous=new Set(saved.previousFamilies);
    const counts=Object.fromEntries(bank.families.map(f=>[f.code,f.variants.reduce((n,v)=>n+(saved.records[v.id]?.completed||0),0)]));
    for(const module of modules.filter(m=>!only||m.id===only)){
      for(let i=0;i<module.quota;i++){
        const options=bank.families.filter(f=>f.code.startsWith(module.id)&&f.level<=saved.level&&!chosen.has(f.code)&&!previous.has(f.code)).flatMap(f=>f.variants.map(v=>({f,v,r:saved.records[v.id]||{}}))).filter(({f,r})=>(!r.lastSeen||now-r.lastSeen>=7*86400000)&&(!(f.code.startsWith('SR'))||(r.reads||0)<2));
        options.sort((a,b)=>Number(!!a.r.completed)-Number(!!b.r.completed)||Number(!!b.r.needsReview)-Number(!!a.r.needsReview)||counts[a.f.code]-counts[b.f.code]||(a.r.completed||0)-(b.r.completed||0)||(a.r.lastSeen||0)-(b.r.lastSeen||0)||a.v.id.localeCompare(b.v.id));
        if(!options.length){unavailable.push(module.id);break;}
        const {f,v,r}=options[0];chosen.add(f.code);
        items.push({id:v.id,family:f.code,module:module.id,status:'pending',fresh:!r.lastSeen&&!r.heard});
      }
    }
    return {id:now,number:saved.sessions+1,created:now,cursor:0,elapsed:0,finished:false,items,unavailable,only};
  }
  // Split serial source events into exact bars. Padding is display-only;
  // contentBeats keeps the original end separate from trailing rests.
  function staffBars(staff){
    const [n,d]=staff.meter.split('/').map(Number),meter=n*4/d,bars=[[]];let pos=0;
    const events=staff.events.map(e=>({...e,pitches:[...e.pitches]}));
    for(let i=0;i<events.length;i++){
      let event=events[i],duration=event.duration_beats;
      // Source tie=true means continuation into the next identical event.
      while(event.tie&&events[i+1]&&JSON.stringify(event.pitches)===JSON.stringify(events[i+1].pitches)&&!event.rest){event=events[++i];duration+=event.duration_beats;}
      let left=duration,first=true;
      while(left>1e-8){
        if(pos>=meter-1e-8){bars.push([]);pos=0;}
        const room=Math.min(left,meter-pos),chunk=[4,3,2,1.5,1,.5,.25].find(x=>x<=room+1e-8);
        if(!chunk)throw Error('Trường độ chưa hỗ trợ');
        const pitches=event.rest||!event.pitches.length?null:event.pitches.length===1?event.pitches[0]:event.pitches;
        const more=left-chunk>1e-8,notation={duration:({4:'w',3:'h',2:'h',1.5:'q',1:'q',.5:'8',.25:'16'})[chunk],dotted:chunk===3||chunk===1.5};
        if(event.finger&&first)notation.finger=event.finger;
        for(const key of ['articulation','slurs'])if(event[key])notation[key]=event[key];
        if(pitches&&(!first||more))notation.tie=first?'start':more?'continue':'stop';
        bars[bars.length-1].push([pitches,chunk,notation]);left-=chunk;pos+=chunk;first=false;
      }
    }
    const contentBeats=events.reduce((sum,e)=>sum+e.duration_beats,0);
    if(pos<meter-1e-8){
      let left=meter-pos;
      while(left>1e-8){const chunk=[4,3,2,1.5,1,.5,.25].find(x=>x<=left+1e-8);if(!chunk)throw Error('Khoảng nghỉ chưa hỗ trợ');bars.at(-1).push([null,chunk,{duration:({4:'w',3:'h',2:'h',1.5:'q',1:'q',.5:'8',.25:'16'})[chunk],dotted:chunk===3||chunk===1.5}]);left-=chunk;}
    }
    return {bars,meter,contentBeats};
  }
  function lesson(family,variant){
    // Keyboard-location prompts have no prescribed hand/clef. Give their
    // low/high targets separate voices at the same original timestamps.
    // Clef-reading lessons and explicitly assigned RH/LH parts stay intact.
    const registerSplit=variant.layoutPolicy==='register-targets'&&variant.staves.length===1;
    const staves=registerSplit?['rh','lh'].map(hand=>({
      ...variant.staves[0],clef:hand==='rh'?'treble':'bass',label:hand==='rh'?'RH':'LH',
      events:variant.staves[0].events.map(event=>{
        const pitches=event.rest?[]:event.pitches.filter(pitch=>(midi(pitch)<60)===(hand==='lh'));
        return {...event,pitches,rest:!pitches.length,finger:pitches.length?event.finger:'',tie:pitches.length?event.tie:false};
      })
    })):variant.staves;
    const sequential=staves.length>1&&staves.some(s=>['Ref','Test','Reference','Echo'].includes(s.label));
    const first=variant.staves[0],signature=first.meter,[n,d]=signature.split('/').map(Number),meter=n*4/d;
    let rh=[],lh=[],labels=[],clefs={rh:'treble',lh:'bass'},contentBeats=0;
    if(sequential){
      for(const staff of staves){const result=staffBars(staff);labels[rh.length]=staff.label==='Test'?'So sánh':'Mẫu tham chiếu';rh.push(...result.bars);contentBeats+=result.contentBeats;}
      clefs.rh=first.clef;
    }else{
      for(const staff of staves){
        const hand=staff.label==='LH'||staff.clef==='bass'?'lh':'rh',result=staffBars(staff);
        if(hand==='rh')rh=result.bars;else lh=result.bars;
        clefs[hand]=staff.clef;contentBeats=Math.max(contentBeats,result.contentBeats);
      }
    }
    const length=Math.max(1,rh.length,lh.length),rests=()=>[[null,meter,{duration:meter===3?'h':'w',dotted:meter===3}]];
    // 2/4 empty bars require a half rest, not a whole note.
    const emptyBar=()=>meter===2?[[null,2,{duration:'h'}]]:rests();
    while(rh.length<length)rh.push(emptyBar());while(lh.length<length)lh.push(emptyBar());
    const pitches=variant.staves.flatMap(s=>s.events.flatMap(e=>e.pitches)),ear=family.code.startsWith('EA')||family.code==='CH24'||variant.activity==='ear',reading=family.code.startsWith('SR');
    return {id:variant.id,title:`${family.code} · ${family.title}`,goal:family.instruction,rh,lh,meter,timeSignature:signature,bpm:signature==='6/8'?40:60,pulse:signature==='6/8'?1.5:1,tempoBeat:signature==='6/8'?1.5:1,keySignature:variant.keySignature||'C',holds:variant.holds,readingRevision:'editorial-v2',readingClefs:clefs,readingHands:sequential?['rh']:['rh','lh'].filter(h=>(h==='rh'?rh:lh).some(b=>b.some(e=>e[0]))),contentBeats,studyLabels:variant.studyLabels||labels,focus:family.instruction,touch:'',rhythm:'mixed',reading:true,registerSplit,defaultHand:sequential?'rh':rh.some(b=>b.some(e=>e[0]))&&lh.some(b=>b.some(e=>e[0]))?'both':lh.some(b=>b.some(e=>e[0]))?'lh':'rh',defaultMode:ear?'listen':'timed',conceal:ear&&family.code!=='EA19'?'all':family.code==='NR15'?'notation':null,isSightReading:reading,lookAhead:family.code.startsWith('LA')?({'LA01':1,'LA02':2,'LA03':meter})[family.code]||0:0,hidePlayed:family.code==='LA04',sourceNote:[registerSplit?'Bài tìm phím: nốt dưới C4 ở khóa Fa / tay trái, từ C4 ở khóa Sol / tay phải; hai tay đánh luân phiên theo chuỗi mục tiêu.':'',family.contentNote,variant.editorial,contentBeats%meter?'Ô cuối có nghỉ bổ sung để hoàn tất khuông.':'',pitches.some(p=>midi(p)<36||midi(p)>84)?'Có nốt ngoài C2–C6: chơi theo nhịp, không chấm đơn âm toàn bài.':''].filter(Boolean).join(' ')};
  }
  const core={modules,empty,sanitize,plan,staffBars,lesson,midi};
  if(typeof module!=='undefined'&&module.exports)module.exports=core;
  else window.PianoReadingCore=core;
})();
