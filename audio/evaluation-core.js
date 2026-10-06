/* Offline re-scoring of a recorded performance with a chosen grading method, through the same
   capture Worklet, YIN tracker, verifier and tempo session as live practice. Used by the
   "real piano evaluation" flow to compare methods on identical audio.
   method 'generic': single notes via YIN, multi-key targets via the verifier (the app without a model).
   method 'model': every target via the verifier with per-target reference weights and score background. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.PianoEvaluation=api;})(globalThis,()=>{
  'use strict';
  function runMethod({method,input,rate,Processor,setClock,PitchTracker,Verifier,VerifyTracker,Session,verifier,targets,tempo,fromBeat,endBeat,startTime,config={},model=null,mode='precise'}){
    const session=new Session({targets:targets.map(t=>({beat:t.beat,pitches:t.pitches,skip:!!t.skip})),tempo,startTime,fromBeat,endBeat,mode});
    const scoreInformed=method==='model';
    if(scoreInformed)for(const t of session.targets)if(t.status!=='skipped')t.chord=true;
    const pitch=new PitchTracker(config),tracker=new VerifyTracker(2),decided=new Map();
    let expectedKey=null;
    setClock(rate,0);const processor=new Processor({processorOptions:{}});
    processor.link={postMessage:frame=>{
      const now=frame.time;
      const result=frame.rawPeak>=.985?{status:'clipping',attack:false}:pitch.process(frame.samples,frame.rate,frame);
      session.advance(now);
      const due=session.current(now),index=due?session.targets.indexOf(due):-1,wanted=due&&due.status!=='skipped'&&due.chord;
      const key=wanted?due.pitches.join():null;
      if(key!==expectedKey){expectedKey=key;tracker.reset(frame.onsetId);}
      let verify;
      if(wanted&&frame.rawPeak<.985){
        const options=scoreInformed&&model?.[index]?{background:model[index].background,reference:model[index].reference}:{};
        verify={...tracker.process(verifier.verify(frame.samples,frame.rate,due.pitches,{...config,...options}),frame.onsetId),expected:due.pitches};
      }
      const target=session.observe({...result,verify,onsetTime:frame.onsetTime,onsetId:frame.onsetId,time:now});
      if(target&&target.status==='exact'&&!decided.has(target))decided.set(target,now-target.at);
      processor.busy=false;processor.pool.push(frame.samples);
    }};
    for(let i=0;i<input.length;i+=128){setClock(rate,i);processor.process([[input.subarray(i,i+128)]],[[]]);}
    session.advance(Infinity);
    return {summary:session.summary(),targets:session.targets.map(t=>({beat:t.beat,pitches:t.pitches,status:t.status,timing:t.timing??null,deltaMs:Number.isFinite(t.deltaMs)?Math.round(t.deltaMs):null,decisionMs:decided.has(t)?Math.round(decided.get(t)*1000):null}))};
  }
  // Compare methods on rounds with ground truth: `slips[i]` marks targets the learner was asked to miss.
  function compare(rounds){
    const methods=[...new Set(rounds.flatMap(r=>Object.keys(r.results)))],out={};
    for(const method of methods){
      const rows=rounds.flatMap(r=>(r.results[method]?.targets||[]).map((t,i)=>({...t,slip:!!r.slips?.[i]})));
      const graded=rows.filter(r=>r.status!=='skipped'),correct=graded.filter(r=>!r.slip),slips=graded.filter(r=>r.slip);
      const deltas=correct.filter(r=>r.status==='exact'&&r.deltaMs!==null).map(r=>Math.abs(r.deltaMs)).sort((a,b)=>a-b);
      out[method]={correct:correct.length,accepted:correct.filter(r=>r.status==='exact').length,
        slips:slips.length,slipsAccepted:slips.filter(r=>r.status==='exact').length,
        unclear:correct.filter(r=>r.status==='unreadable'||r.status==='missed').length,
        medianTimingMs:deltas.length?deltas[deltas.length>>1]:null};
    }
    return out;
  }
  return {runMethod,compare};
});
