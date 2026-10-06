/* Per-exercise ("score-informed") model: from the learner's single-key takes and the piece's score,
   build a clean reference of every target and record each expected key's verifier weight there.
   At runtime the verifier receives that reference plus the keys still sounding per the score.
   Pure functions; the caller supplies the capture Worklet class and the verifier. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.PianoScoreModel=api;})(globalThis,()=>{
  'use strict';
  const VERSION=1,RING_AFTER_RELEASE=.25,WINDOW=[.07,.25],TAKE_ONSET=.05;
  // Keys of earlier notes still sounding (or released < 250 ms ago) when a target starts.
  function backgroundAt(notes,time,expected=[]){
    return [...new Set(notes.filter(n=>n.at<time-.01&&n.at+n.duration>time-RING_AFTER_RELEASE).map(n=>n.midi))].filter(m=>!expected.includes(m));
  }
  // Mix single-key takes (onset TAKE_ONSET s into each take) per the score: onsets, written lengths with
  // a 60 ms damper fade, and score velocities via amplitude ~ (velocity/takeVelocity)^gamma.
  function mixReference({notes,takes,rate,takeVelocity=80,gamma=1.44,fade=.06,tail=2}){
    const end=Math.max(...notes.map(n=>n.at+n.duration))+tail,mix=new Float32Array(Math.ceil(end*rate));
    for(const note of notes){
      const take=takes[note.midi];if(!take)continue;
      const pcm=take.rate===rate?take.pcm:resample(take.pcm,take.rate,rate),gain=(note.velocity/takeVelocity)**gamma;
      const start=Math.round((note.at-TAKE_ONSET)*rate),stop=Math.round((TAKE_ONSET+note.duration)*rate),fadeLength=Math.round(fade*rate);
      for(let i=0;i<pcm.length&&i<stop+fadeLength;i++){const j=start+i;if(j<0||j>=mix.length)continue;mix[j]+=pcm[i]*gain*(i<stop?1:1-(i-stop)/fadeLength);}
    }
    return mix;
  }
  function resample(pcm,from,to){
    const out=new Float32Array(Math.floor(pcm.length*to/from));
    for(let i=0;i<out.length;i++){const x=i*from/to,k=Math.floor(x),f=x-k;out[i]=(pcm[k]||0)*(1-f)+(pcm[k+1]||0)*f;}
    return out;
  }
  // Run audio through the app's capture Worklet class exactly as the live path does.
  // `setClock(rate,frame)` must set the Worklet globals `sampleRate` and `currentFrame`.
  function captureFrames({Processor,input,rate,setClock,onFrame}){
    setClock(rate,0);const processor=new Processor({processorOptions:{}});
    processor.link={postMessage:frame=>{onFrame({...frame,samples:Float32Array.from(frame.samples)});processor.busy=false;processor.pool.push(frame.samples);}};
    for(let i=0;i<input.length;i+=128){setClock(rate,i);processor.process([[input.subarray(i,i+128)]],[[]]);}
  }
  // Median weight of every expected key in frames 70-250 ms after each target, with score background.
  function targetWeights({targets,notes,frames,verifier}){
    return targets.map(t=>{
      const background=backgroundAt(notes,t.time,t.pitches),samples={};
      for(const f of frames)if(f.time>=t.time+WINDOW[0]&&f.time<=t.time+WINDOW[1]){
        const r=verifier.verify(f.samples,f.rate,t.pitches,{background});
        if(r.weight)for(const m of t.pitches)(samples[m]??=[]).push(r.weight[m]);
      }
      return Object.fromEntries(Object.entries(samples).map(([m,w])=>[m,+w.sort((a,b)=>a-b)[w.length>>1].toFixed(4)]));
    });
  }
  function buildModel({id,notes,targets,takes,Processor,setClock,verifier,rate=48000}){
    const input=mixReference({notes,takes,rate}),frames=[];
    captureFrames({Processor,input,rate,setClock,onFrame:f=>frames.push(f)});
    const weights=targetWeights({targets,notes,frames,verifier});
    return {version:VERSION,id,keys:Object.keys(takes).map(Number).sort((a,b)=>a-b),targets:targets.map((t,i)=>({time:+t.time.toFixed(4),pitches:t.pitches,reference:weights[i]}))};
  }
  return {VERSION,TAKE_ONSET,backgroundAt,mixReference,captureFrames,targetWeights,buildModel,resample};
});
