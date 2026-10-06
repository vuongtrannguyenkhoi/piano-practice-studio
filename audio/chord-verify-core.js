/* Answer-aware chord verification. Unlike polyphony-core (free transcription), this module
   receives the expected notes and only asks: are they sounding, and is a likely slip
   (neighbouring key or wrong octave) sounding instead? Used for grading chord targets. */
(function(root,factory){const api=factory(typeof module==='object'?require('./polyphony-core.js'):root.PianoPolyphony);if(typeof module==='object')module.exports=api;else root.PianoChordVerify=api;})(globalThis,Poly=>{
  'use strict';
  const DEFAULTS={referenceRatio:.45,presence:.3,harmonicPresence:.5,intruder:.2,octaveIntruder:.6,maxResidual:.45,penalty:.01,iterations:30,templatesPerKey:2};
  // Slips a learner makes on a chord: adjacent keys and the same key an octave away.
  const SLIPS=[-12,-2,-1,1,2,12];
  // Keys on the 2nd-6th harmonics of a lower key (octave, octave+5th, two octaves, ...).
  const HARMONICS=[12,19,24,28,31];
  function dot(a,b){let value=0;for(let i=0;i<a.length;i++)value+=a[i]*b[i];return value;}
  class Verifier {
    constructor(detector,settings={}){
      this.detector=detector;this.settings={...DEFAULTS,...settings};this.byMidi=new Map();
      detector.templates.forEach((template,index)=>{if(!this.byMidi.has(template.midi))this.byMidi.set(template.midi,[]);this.byMidi.get(template.midi).push(index);});
    }
    candidates(expected){
      const set=new Set(expected);for(const midi of expected)for(const step of SLIPS)set.add(midi+step);
      return [...set].filter(midi=>this.byMidi.has(midi)).sort((a,b)=>a-b);
    }
    verify(samples,rate,expected,config={}){
      const s={...this.settings,...config.verify};
      let energy=0;for(const v of samples)energy+=v*v;
      if(Math.sqrt(energy/samples.length)<(config.minRms??.0005))return {status:'quiet'};
      if(!expected.length||expected.some(midi=>!this.byMidi.has(midi)))return {status:'unsupported'};
      const {templates,gram,dictionary}=this.detector;
      const vector=Poly.features(samples,rate,{...dictionary.features,a4:config.a4||440});
      // Score-informed options (per-exercise model): `background` keys still sounding per the score are
      // fitted but never intruders; `reference` gives each expected key's weight in a clean rendering.
      const allowed=new Set((config.background||[]).filter(midi=>!expected.includes(midi)&&this.byMidi.has(midi)));
      // Like the free detector, keep each key's two best-matching templates (attack/sustain, bank).
      const candidates=[...new Set([...this.candidates(expected),...allowed])].sort((a,b)=>a-b),chosen=[],scores=[];
      for(const midi of candidates){
        const ranked=this.byMidi.get(midi).map(index=>[index,dot(templates[index].vector,vector)]).sort((a,b)=>b[1]-a[1]).slice(0,s.templatesPerKey);
        for(const [index,score] of ranked){chosen.push(index);scores.push(score);}
      }
      const weights=new Float64Array(chosen.length);
      for(let iteration=0;iteration<s.iterations;iteration++)for(let i=0;i<chosen.length;i++){
        let residual=scores[i];for(let j=0;j<chosen.length;j++)if(i!==j)residual-=gram[chosen[i]][chosen[j]]*weights[j];
        weights[i]=Math.max(0,(residual-s.penalty)/(gram[chosen[i]][chosen[i]]||1));
      }
      let error=1;const byMidi=new Map(candidates.map(midi=>[midi,0]));
      for(let i=0;i<chosen.length;i++){
        error-=2*weights[i]*scores[i];for(let j=0;j<chosen.length;j++)error+=weights[i]*weights[j]*gram[chosen[i]][chosen[j]];
        const midi=templates[chosen[i]].midi;byMidi.set(midi,byMidi.get(midi)+weights[i]);
      }
      // Normalise by the strongest non-background key, so a loud ringing note cannot mask the target.
      const residual=Math.sqrt(Math.max(0,error)),top=Math.max(0,...[...byMidi].filter(([midi])=>!allowed.has(midi)).map(([,w])=>w));
      const weight=Object.fromEntries([...byMidi].map(([midi,w])=>[midi,top?w/top:0]));
      // An expected key on a lower expected key's harmonic can look present from that key alone.
      const base=midi=>expected.some(low=>HARMONICS.includes(midi-low))?s.harmonicPresence:s.presence,reference=config.reference;
      // With a reference, a key is present at a fraction of its expected weight (a soft left-hand bass
      // stays detectable), never above the general rule.
      const presence=midi=>Number.isFinite(reference?.[midi])?Math.min(base(midi),Math.max(.05,s.referenceRatio*reference[midi])):base(midi);
      const missing=expected.filter(midi=>weight[midi]<presence(midi));
      // The 2nd harmonic of an expected note sits on the key an octave above it, so that key
      // needs stronger evidence; a wrong-octave slip still shows up as the expected key missing.
      const intruders=candidates.filter(midi=>!expected.includes(midi)&&!allowed.has(midi)&&weight[midi]>=(expected.includes(midi-12)?s.octaveIntruder:s.intruder));
      const status=!top||residual>s.maxResidual?'uncertain':intruders.length?'wrong':missing.length?'missing':'match';
      return {status,missing,intruders,residual,weight};
    }
  }
  // Per-attack decision: a verdict needs `frames` identical frame statuses after the onset.
  // Only a match is final for the attack; early frames may still lack a slower note.
  class Tracker {
    constructor(frames=2){this.frames=frames;this.reset();}
    // `blockedOnset`: the attack already sounding when the target changed; it must not be graded
    // for the new target (a repeated chord would otherwise pass on the previous strike's ring).
    reset(blockedOnset=null){this.blocked=blockedOnset;this.onsetId=null;this.last=null;this.count=0;this.decided=null;}
    process(result,onsetId){
      if(this.blocked!==null&&onsetId===this.blocked)return {...result,decision:null};
      if(onsetId!==this.onsetId){this.onsetId=onsetId;this.last=null;this.count=0;this.decided=null;}
      if(this.decided)return {...result,decision:this.decided,fresh:false};
      if(!['match','wrong','missing'].includes(result.status)){this.last=null;this.count=0;return {...result,decision:null};}
      const key=result.status+'|'+(result.intruders||[]).join()+'|'+(result.missing||[]).join();
      this.count=key===this.last?this.count+1:1;this.last=key;
      if(this.count>=this.frames){if(result.status==='match')this.decided='match';return {...result,decision:result.status,fresh:this.count===this.frames};}
      return {...result,decision:null};
    }
  }
  return {Verifier,Tracker,DEFAULTS,SLIPS};
});
