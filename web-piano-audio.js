(() => {
  'use strict';
  // Salamander web bank (scripts/build-salamander-web.py): all 30 recorded keys x 8 velocity layers,
  // fetched per piece (http/https only; file:// keeps the embedded compact bank).
  class WebSalamanderPiano extends window.SalamanderPiano {
    constructor(context,base='assets/salamander-web/'){
      super(context);this.base=base;this.manifest=null;this.offsets=new Map();
      this.info={instrument:'Salamander web',velocityLayers:8};
    }
    async loadManifest(){
      this.manifest??=await fetch(this.base+'manifest.json?v=0a7152c-bcbfccb4548a').then(response=>{if(!response.ok)throw new Error('Không tải được bộ mẫu Salamander web');return response.json();});
      return this.manifest;
    }
    region(midi){
      const keys=this.manifest.keys;
      return keys.find(key=>midi>=key.lo&&midi<=key.hi)||keys.reduce((best,key)=>Math.abs(key.midi-midi)<Math.abs(best.midi-midi)?key:best);
    }
    layerFor(velocity){return this.manifest.velocityLayer[Math.max(1,Math.min(127,Math.round(velocity)))];}
    // Loads every layer of the recorded keys covering `midis` (all 88 keys when omitted).
    async load(onProgress,midis){
      const manifest=await this.loadManifest();
      const wanted=[...new Set((midis?.length?midis:Array.from({length:88},(_,i)=>21+i)).map(midi=>this.region(midi).midi))]
        .flatMap(key=>manifest.layers.map(({layer})=>`${key}:${layer}`)).filter(id=>!this.buffers.has(id));
      let loaded=0,next=0;
      const worker=async()=>{
        while(next<wanted.length){
          const id=wanted[next++],buffer=await fetchSample(this.context,this.base+manifest.files[id]);
          this.buffers.set(id,buffer);this.offsets.set(id,onsetOffset(buffer));onProgress?.(++loaded,wanted.length);
        }
      };
      await Promise.all(Array.from({length:Math.min(6,wanted.length)},worker));
    }
    sampleFor(midi,velocity){
      const key=this.region(midi),layer=this.layerFor(velocity);
      // Fall back to the nearest loaded layer of the same key if this piece did not load it.
      let id=`${key.midi}:${layer}`;
      if(!this.buffers.has(id))id=this.manifest.layers.map(l=>`${key.midi}:${l.layer}`).find(candidate=>this.buffers.has(candidate))||id;
      return {buffer:this.buffers.get(id),midi:key.midi,offset:this.offsets.get(id)||0};
    }
  }
  // One dropped connection on a slow or mobile network must not cancel the whole lesson: retry each file.
  async function fetchSample(context,url,attempts=3){
    for(let attempt=1;;attempt++){
      try{
        const response=await fetch(url);if(!response.ok)throw new Error(`HTTP ${response.status}`);
        return await context.decodeAudioData(await response.arrayBuffer());
      }catch(error){
        if(attempt>=attempts)throw new Error(`Không tải được ${url}: ${error.message}`);
        await new Promise(resolve=>setTimeout(resolve,300*attempt));
      }
    }
  }
  // Skip leading near-silence (MP3 encoder delay plus pre-attack) so notes start on time.
  function onsetOffset(buffer){
    const data=buffer.getChannelData(0);let peak=0;for(let i=0;i<Math.min(data.length,buffer.sampleRate*.5);i++)peak=Math.max(peak,Math.abs(data[i]));
    const threshold=peak*.003;let i=0;while(i<data.length&&Math.abs(data[i])<threshold)i++;
    return Math.max(0,i/buffer.sampleRate-.001);
  }
  window.WebSalamanderPiano=WebSalamanderPiano;window.WebSalamanderPiano.onsetOffset=onsetOffset;
})();
