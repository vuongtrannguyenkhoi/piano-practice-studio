/* Experimental chord naming of independently fitted notes. No lesson input. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.PianoChords=api;})(globalThis,()=>{
  'use strict';
  const NAMES=['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
  const TYPES=[['','Trưởng',[0,4,7]],['m','Thứ',[0,3,7]],['7','Bảy át',[0,4,7,10]],['maj7','Bảy trưởng',[0,4,7,11]],['m7','Thứ bảy',[0,3,7,10]],
    ['sus2','Treo hai',[0,2,7]],['sus4','Treo bốn',[0,5,7]],['dim','Giảm',[0,3,6]],['aug','Tăng',[0,4,8]],
    ['6','Sáu trưởng',[0,4,7,9]],['m6','Sáu thứ',[0,3,7,9]],['m7♭5','Bảy bán giảm',[0,3,6,10]],['dim7','Bảy giảm',[0,3,6,9]]];
  const noteName=midi=>NAMES[midi%12]+(Math.floor(midi/12)-1);
  function classify(observation){
    if(!observation||observation.status!=='multiple')return {status:observation?.status==='quiet'?'quiet':observation?.status==='single'?'insufficient':'uncertain'};
    if(!Number.isFinite(observation.residual)||observation.residual>.35)return {status:'uncertain'};
    if((observation.pitches||[]).some(p=>!Number.isInteger(p.midi)||p.midi<36||p.midi>96||!Number.isFinite(p.weight)||p.weight<=0))return {status:'uncertain'};
    return classifyDetectedNotes(observation.pitches || []);
  }
  // Pure harmonic naming for independently detected MIDI notes. This does not
  // validate the detector or invent an NNLS residual for neural-model outputs.
  function classifyDetectedNotes(pitches){
    if(!Array.isArray(pitches)||pitches.some(p=>!Number.isInteger(p.midi)||p.midi<36||p.midi>96||!Number.isFinite(p.weight)||p.weight<=0))return {status:'uncertain'};
    const observation={pitches};
    const notes=[...new Set((observation.pitches||[]).filter(p=>Number.isInteger(p.midi)&&p.midi>=36&&p.midi<=96&&Number.isFinite(p.weight)&&p.weight>0).map(p=>p.midi))].sort((a,b)=>a-b);
    const classes=[...new Set(notes.map(n=>n%12))].sort((a,b)=>a-b),chroma=new Array(12).fill(0);
    for(const pitch of observation.pitches||[])if(notes.includes(pitch.midi))chroma[pitch.midi%12]+=pitch.weight;
    const total=chroma.reduce((a,b)=>a+b,0);if(total)for(let i=0;i<12;i++)chroma[i]/=total;
    const common={notes,noteNames:notes.map(noteName),pitchClasses:classes,chroma};
    if(classes.length<3)return {status:'insufficient',...common};
    const candidates=[];
    for(let root=0;root<12;root++)for(const [suffix,quality,intervals] of TYPES){
      const pcs=intervals.map(i=>(root+i)%12).sort((a,b)=>a-b);
      if(pcs.length===classes.length&&pcs.every((n,i)=>n===classes[i])){
        const symbol=NAMES[root]+suffix,bass=notes[0]%12;
        candidates.push({root,quality,symbol,label:symbol+(bass!==root?'/'+NAMES[bass]:''),pitchClasses:pcs});
      }
    }
    // C6/Am7, suspended inversions and symmetric chords genuinely share notes.
    // Bass is descriptive, never used to force a unique harmonic interpretation.
    if(candidates.length!==1)return {status:candidates.length?'ambiguous':'uncertain',candidates,...common};
    return {status:'chord',...candidates[0],...common};
  }
  class Tracker {
    constructor(){this.reset();}
    reset(){this.key=null;this.since=0;this.frames=0;this.lastTime=null;}
    process(observation,time){
      const result=classify(observation);
      if(!Number.isFinite(time)||result.status!=='chord'){this.reset();return result;}
      const key=result.label+'|'+result.notes.join(',');
      if(key!==this.key||this.lastTime===null||time<this.lastTime||time-this.lastTime>.065){this.key=key;this.since=time;this.frames=0;}
      this.frames++;this.lastTime=time;
      return this.frames>=3&&time-this.since>=.032-1e-8?{...result,stable:true}:{status:'stabilizing'};
    }
  }
  return {classify,classifyDetectedNotes,Tracker,TYPES,noteName};
});
