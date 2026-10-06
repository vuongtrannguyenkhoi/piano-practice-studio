(() => {
  'use strict';
  // Local, embedded MP3 samples keep file:// playback independent of fetch/CORS.
  class SalamanderPiano {
    constructor(context){
      this.context=context;
      this.buffers=new Map();
      this.loading=null;
      this.output=context.createDynamicsCompressor();
      this.output.threshold.value=-6;
      this.output.knee.value=8;
      this.output.ratio.value=1.6;
      this.output.attack.value=.015;
      this.output.release.value=.25;
      this.master=context.createGain();this.master.gain.value=.8;
      this.output.connect(this.master);this.master.connect(context.destination);
      // Short deterministic stereo room; this does not hold notes like a pedal.
      this.room=context.createConvolver();
      const length=Math.ceil(context.sampleRate*1.15);
      const impulse=context.createBuffer(2,length,context.sampleRate);
      for(let channel=0;channel<2;channel++){
        const data=impulse.getChannelData(channel);let seed=1729+channel*997,previous=0;
        for(let i=0;i<length;i++){
          seed=(Math.imul(seed,1664525)+1013904223)>>>0;
          previous=.65*previous+.35*(seed/2147483648-1);
          data[i]=i<context.sampleRate*.018?0:previous*Math.exp(-6*i/length);
        }
      }
      this.room.buffer=impulse;
      this.wet=context.createGain();this.wet.gain.value=.12;
      this.room.connect(this.wet);this.wet.connect(this.output);
    }
    setRoom(amount){this.wet.gain.setTargetAtTime(Math.max(0,Math.min(1,amount))*.3,this.context.currentTime,.03);}
    dispose(){this.output.disconnect();this.master.disconnect();this.room.disconnect();this.wet.disconnect();this.buffers.clear();}
    load(onProgress){
      if(this.buffers.size===window.SALAMANDER_SAMPLES.length)return Promise.resolve();
      if(this.loading)return this.loading;
      let loaded=0;
      this.loading=Promise.all(window.SALAMANDER_SAMPLES.map(async sample=>{
        const key=`${sample.midi}:${sample.velocity}`;
        if(!this.buffers.has(key)){
          const binary=atob(sample.mp3);
          const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
          const buffer=await this.context.decodeAudioData(bytes.buffer);
          this.buffers.set(key,buffer);
        }
        onProgress?.(++loaded,window.SALAMANDER_SAMPLES.length);
      })).then(()=>{this.loading=null;},error=>{this.loading=null;throw error;});
      return this.loading;
    }
    // Buffer, recorded key and start offset for a note; subclasses supply other banks.
    sampleFor(midi,velocity){
      const sample=window.SALAMANDER_SAMPLES.reduce((best,item)=>{
        const distance=item=>Math.abs(item.midi-midi)*1000+Math.abs(item.velocity-velocity);
        return distance(item)<distance(best)?item:best;
      });
      return {buffer:this.buffers.get(`${sample.midi}:${sample.velocity}`),midi:sample.midi,offset:0};
    }
    play(midi,when,seconds,level,onEnded,velocity=72,short=false){
      const sample=this.sampleFor(midi,velocity);
      const source=this.context.createBufferSource(),gain=this.context.createGain();
      source.buffer=sample.buffer;
      source.playbackRate.setValueAtTime(2**((midi-sample.midi)/12),when);
      const duration=Math.max(.01,seconds),release=short?.10:Math.max(.28,Math.min(.55,.55-(midi-42)*.007));
      const peak=level*3,attack=Math.min(.002,duration*.25);
      gain.gain.setValueAtTime(0,when);
      gain.gain.linearRampToValueAtTime(peak,when+attack);
      gain.gain.setValueAtTime(peak,when+duration);
      gain.gain.exponentialRampToValueAtTime(.0001,when+duration+release);
      source.connect(gain);gain.connect(this.output);gain.connect(this.room);
      source.fadeOut=()=>{
        const now=this.context.currentTime;
        if(now<when){source.stop(now);return;}
        const value=now<when+attack?peak*(now-when)/attack:now<=when+duration?peak:peak*(.0001/peak)**Math.min(1,(now-when-duration)/release);
        gain.gain.cancelScheduledValues(now);gain.gain.setValueAtTime(Math.max(.0001,value),now);
        gain.gain.exponentialRampToValueAtTime(.0001,now+.035);source.stop(now+.04);
      };
      source.onended=()=>{source.disconnect();gain.disconnect();onEnded?.(source);};
      source.start(when,sample.offset);source.stop(when+duration+release+.01);
      return source;
    }
  }
  window.SalamanderPiano=SalamanderPiano;
})();
