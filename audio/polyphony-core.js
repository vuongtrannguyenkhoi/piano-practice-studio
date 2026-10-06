/* Experimental spectral dictionary / nonnegative least squares. No score input. */
(function(root,factory){const api=factory(typeof module==='object'?require('./pitch-core.js'):root.PianoPitch);if(typeof module==='object')module.exports=api;else root.PianoPolyphony=api;})(globalThis,Pitch=>{
  'use strict';
  const DEFAULTS={minHz:70,maxHz:4500,stepHz:10};
  function features(samples,rate,config={}){
    const spec=Pitch.spectrum(samples,rate,true),a4=config.a4||440;
    const settings={...DEFAULTS,...config},size=Math.floor((settings.maxHz-settings.minHz)/settings.stepHz)+1;
    const vector=new Float32Array(size);let energy=0;
    for(let i=0;i<size;i++){
      const hz=(settings.minHz+i*settings.stepHz)*a4/440,bin=hz/spec.binHz,index=Math.floor(bin),fraction=bin-index;
      const magnitude=(spec.magnitudes[index]||0)*(1-fraction)+(spec.magnitudes[index+1]||0)*fraction;
      // Mild frequency weighting retains quieter upper partials without a
      // per-frame whitening stage that would amplify background noise.
      const value=magnitude*Math.pow(hz/440,.25);vector[i]=value;energy+=value*value;
    }
    const norm=Math.sqrt(energy);if(norm)for(let i=0;i<size;i++)vector[i]/=norm;
    return vector;
  }
  function dot(a,b){let value=0;for(let i=0;i<a.length;i++)value+=a[i]*b[i];return value;}
  class Detector {
    constructor(dictionary){
      this.dictionary=dictionary;this.templates=dictionary.templates.map(t=>{const vector=t.vector?Float32Array.from(t.vector):new Float32Array(dictionary.featureCount);if(t.bins)for(const [i,value] of t.bins)vector[i]=value;return {...t,vector};});
      const n=this.templates.length;this.gram=Array.from({length:n},()=>new Float32Array(n));
      for(let i=0;i<n;i++)for(let j=0;j<=i;j++)this.gram[i][j]=this.gram[j][i]=dot(this.templates[i].vector,this.templates[j].vector);
    }
    analyze(samples,rate,config={}){
      let energy=0;for(const v of samples)energy+=v*v;
      if(Math.sqrt(energy/samples.length)<(config.minRms??.0005))return {status:'quiet',pitches:[]};
      const vector=features(samples,rate,{...this.dictionary.features,a4:config.a4||440});
      const scores=this.templates.map((t,index)=>({index,midi:t.midi,score:dot(t.vector,vector)})).sort((a,b)=>b.score-a.score);
      // Keep alternatives for each pitch; select globally, never by YIN or
      // the requested note. NNLS can represent two different source pitches.
      const chosen=[],counts=new Map();
      for(const candidate of scores){const count=counts.get(candidate.midi)||0;if(count<2){chosen.push(candidate);counts.set(candidate.midi,count+1);}if(chosen.length>=24)break;}
      const weights=new Float64Array(chosen.length),penalty=config.penalty??.025;
      for(let iteration=0;iteration<24;iteration++)for(let i=0;i<chosen.length;i++){
        const index=chosen[i].index;let residual=chosen[i].score;
        for(let j=0;j<chosen.length;j++)if(i!==j)residual-=this.gram[index][chosen[j].index]*weights[j];
        weights[i]=Math.max(0,(residual-penalty)/(this.gram[index][index]||1));
      }
      let reconstructionError=1;const grouped=new Map();
      for(let i=0;i<chosen.length;i++){
        reconstructionError-=2*weights[i]*chosen[i].score;
        for(let j=0;j<chosen.length;j++)reconstructionError+=weights[i]*weights[j]*this.gram[chosen[i].index][chosen[j].index];
        grouped.set(chosen[i].midi,(grouped.get(chosen[i].midi)||0)+weights[i]);
      }
      const sources=[...grouped].map(([midi,weight])=>({midi,weight})).sort((a,b)=>b.weight-a.weight);
      const top=sources[0]?.weight||0,ratio=config.secondaryRatio??.2;
      const pitches=sources.filter(s=>s.weight>Math.max(.055,top*ratio));
      const residual=Math.sqrt(Math.max(0,reconstructionError));
      return {status:residual>(config.maxResidual??.35)?'uncertain':pitches.length>1?'multiple':pitches.length===1?'single':'uncertain',pitches,residual,secondaryRatio:(sources[1]?.weight||0)/(top||1),bestSimilarity:scores[0]?.score||0};
    }
  }
  return {features,Detector,DEFAULTS};
});
