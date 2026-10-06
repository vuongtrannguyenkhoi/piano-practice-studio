(() => {
  'use strict';
  class FullSalamanderPiano extends window.SalamanderPiano {
    constructor(context,instrument="salamander"){super(context);this.instrument=instrument;this.cache=new Map();this.ready=false;}
    async load(){
      if(this.ready)return;
      const response=await fetch('/api/piano/status');
      if(!response.ok)throw new Error('Chạy Open Full Piano.command để mở bản SFZ đầy đủ');
      const info=await response.json();
      const selected=this.instrument==='salamander'?info:info.instruments?.find(item=>item.id===this.instrument&&item.available);
      if(!info.ready||!selected)throw new Error('Chưa cài mẫu bộ đàn SFZ đã chọn');
      this.info=selected;
      this.ready=true;
    }
    async prepare(spec){
      const key=JSON.stringify({...spec,instrument:this.instrument});
      if(this.cache.has(key))return this.cache.get(key);
      const response=await fetch('/api/piano/render',{method:'POST',headers:{'Content-Type':'application/json'},body:key});
      if(!response.ok)throw new Error('Không render được bộ SFZ đầy đủ');
      const buffer=await this.context.decodeAudioData(await response.arrayBuffer());
      this.cache.set(key,buffer);
      while(this.cache.size>1&&(this.cache.size>6||[...this.cache.values()].reduce((sum,item)=>sum+item.duration,0)>420))this.cache.delete(this.cache.keys().next().value);
      return buffer;
    }
    playBuffer(buffer,when,onEnded){
      const source=this.context.createBufferSource(),gain=this.context.createGain();
      source.buffer=buffer;gain.gain.setValueAtTime(1,when);
      source.connect(gain);gain.connect(this.output);gain.connect(this.room);
      source.fadeOut=()=>{
        const now=this.context.currentTime;
        if(now<when){source.stop(now);return;}
        gain.gain.cancelScheduledValues(now);gain.gain.setValueAtTime(1,now);
        gain.gain.exponentialRampToValueAtTime(.0001,now+.035);source.stop(now+.04);
      };
      source.onended=()=>{source.disconnect();gain.disconnect();onEnded?.(source);};
      source.start(when);return source;
    }
  }
  window.FullSalamanderPiano=FullSalamanderPiano;
})();
