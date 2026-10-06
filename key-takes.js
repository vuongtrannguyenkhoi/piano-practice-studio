/* Single-key takes on the learner's own piano, stored per key in IndexedDB and reused by every
   exercise. A take starts 50 ms before the detected strike and lasts 1.8 s; its pitch is checked
   so a wrong key is not stored under the requested one. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.PianoKeyTakes=api;})(globalThis,()=>{
  'use strict';
  const DB='piano-key-takes',STORE='takes',PRE_ROLL=.05,LENGTH=1.8;
  // Strike detector over raw blocks: loud enough and well above the recent level.
  class TakeCollector {
    constructor({rate,minRms=.002}){this.rate=rate;this.minRms=minRms;this.history=[];this.historySamples=0;this.recent=[];this.take=null;}
    push(block){
      if(this.take){
        this.take.push(block);this.take.samples+=block.length;
        if(this.take.samples>=(PRE_ROLL+LENGTH)*this.rate){const pcm=concat(this.take.blocks,Math.round((PRE_ROLL+LENGTH)*this.rate));this.take=null;return pcm;}
        return null;
      }
      let energy=0;for(const v of block)energy+=v*v;const rms=Math.sqrt(energy/block.length);
      const before=Math.max(0,...this.recent);
      this.recent.push(rms);if(this.recent.length>Math.round(.03*this.rate/block.length))this.recent.shift();
      if(rms>this.minRms&&rms>before*3){
        // Keep exactly PRE_ROLL seconds of audio before this block.
        const pre=Math.round(PRE_ROLL*this.rate),held=concat(this.history,this.historySamples).subarray(Math.max(0,this.historySamples-pre));
        const blocks=[new Float32Array(pre-held.length),held,block];
        this.take={blocks,samples:pre+block.length,push(b){this.blocks.push(b);}};this.history=[];this.historySamples=0;return null;
      }
      this.history.push(block);this.historySamples+=block.length;
      while(this.history.length&&this.historySamples-this.history[0].length>=PRE_ROLL*this.rate){this.historySamples-=this.history.shift().length;}
      return null;
    }
  }
  function concat(blocks,length){const out=new Float32Array(length);let at=0;for(const b of blocks){if(at>=length)break;out.set(b.subarray(0,length-at),at);at+=b.length;}return out;}
  // Pitch check 100-164 ms after the strike with the app's YIN analysis.
  function checkPitch(Pitch,pcm,rate,midi,a4=440){
    const start=Math.round((PRE_ROLL+.1)*rate),window=pcm.subarray(start,start+Math.round(.064*rate));
    const r=Pitch.analyze(window,rate,{a4,minMidi:24,maxMidi:108,minRms:.0005});
    if(r.status!=='note')return {ok:true,heard:null,status:r.status}; // unclear (bass, octave-ambiguous): accept
    return {ok:r.midi===midi,heard:r.midi,status:'note'};
  }
  function open(){
    return new Promise((resolve,reject)=>{const request=indexedDB.open(DB,1);request.onupgradeneeded=()=>request.result.createObjectStore(STORE,{keyPath:'midi'});request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});
  }
  async function run(mode,action){const db=await open();try{return await new Promise((resolve,reject)=>{const tx=db.transaction(STORE,mode),result=action(tx.objectStore(STORE));tx.oncomplete=()=>resolve(result.result??result.value);tx.onerror=()=>reject(tx.error);});}finally{db.close();}}
  const save=take=>run('readwrite',store=>store.put({...take,pcm:take.pcm.buffer.slice(0),date:new Date().toISOString()}));
  async function load(midis){
    const db=await open();
    try{return await new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readonly'),store=tx.objectStore(STORE),found={};
      for(const midi of midis){const request=store.get(midi);request.onsuccess=()=>{if(request.result)found[midi]={...request.result,pcm:new Float32Array(request.result.pcm)};};}
      tx.oncomplete=()=>resolve(found);tx.onerror=()=>reject(tx.error);});}finally{db.close();}
  }
  const clear=()=>run('readwrite',store=>store.clear());
  return {TakeCollector,checkPitch,save,load,clear,PRE_ROLL,LENGTH};
});
