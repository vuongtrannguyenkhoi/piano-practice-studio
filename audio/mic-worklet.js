/* Capture/anti-aliasing/onsets only. Heavy pitch analysis lives in a Worker. */
class PianoCapture extends AudioWorkletProcessor {
  constructor(options){
    super();this.factor=Math.max(1,Math.floor(sampleRate/12000));this.rate=sampleRate/this.factor;
    this.size=Math.round(this.rate*(options?.processorOptions?.windowMs??64)/1000);this.hop=Math.round(this.rate*(options?.processorOptions?.hopMs??10.667)/1000);this.ring=new Float32Array(this.size);
    this.index=0;this.total=0;this.counter=0;this.phase=0;this.busy=false;this.onsetId=0;this.lastOnset=-1;this.minOnsetRms=.0005;this.envelope=0;this.fastEnergy=0;this.clipUntil=0;this.stopped=false;this.dropped=0;
    this.pool=[new Float32Array(this.size)];
    // Recent fast-energy values (about 30 ms of 128-frame blocks) for re-strike detection.
    this.recent=new Float32Array(Math.max(1,Math.round(.03*sampleRate/128)));this.recentIndex=0;
    const w=2*Math.PI*(this.rate*.4)/sampleRate,c=Math.cos(w),s=Math.sin(w),a=s/(2*.70710678),den=1+a;
    this.coeff=[(1-c)/2/den,(1-c)/den,(1-c)/2/den,-2*c/den,(1-a)/den];this.filters=[[0,0,0,0],[0,0,0,0]];
    this.port.onmessage=({data})=>{
      if(data.type==='config'){this.minOnsetRms=Math.max(.00005,Math.min(.1,Number(data.minRms)||.0005));return;}
      if(data.type==='stop'){this.stopped=true;this.link?.close();return;}
      if(data.port){this.link=data.port;this.link.onmessage=({data})=>{this.busy=false;if(data.buffer)this.pool.push(new Float32Array(data.buffer));};this.link.start();}
    };
  }
  process(inputs,outputs){
    if(this.stopped)return false;
    const channels=inputs[0];if(!channels?.length)return true;
    const length=channels[0].length;let energy=0,peak=0;
    for(let i=0;i<length;i++){
      let value=0;for(const channel of channels)value+=channel[i];value/=channels.length;
      energy+=value*value;peak=Math.max(peak,Math.abs(value));
      for(const f of this.filters){const [b0,b1,b2,a1,a2]=this.coeff,y=b0*value+b1*f[0]+b2*f[1]-a1*f[2]-a2*f[3];f[1]=f[0];f[0]=value;f[3]=f[2];f[2]=y;value=y;}
      if(++this.phase===this.factor){this.phase=0;this.ring[this.index]=value;this.index=(this.index+1)%this.size;this.total++;this.counter++;}
    }
    const rms=Math.sqrt(energy/length),time=(currentFrame+length)/sampleRate;
    this.fastEnergy=.65*this.fastEnergy+.35*rms;
    if(peak>=.985)this.clipUntil=time+.1;
    let floor=Infinity;for(const value of this.recent)floor=Math.min(floor,value);
    this.recent[this.recentIndex]=this.fastEnergy;this.recentIndex=(this.recentIndex+1)%this.recent.length;
    // A re-strike after the damper drops the level can stay below the slow envelope, so also
    // accept a sharp rise over the recent minimum. 2.5x keeps damper/release noise from retriggering.
    if(this.fastEnergy>this.minOnsetRms&&(this.fastEnergy>this.envelope*1.35||this.fastEnergy>floor*2.5)&&time-this.lastOnset>.12){this.onsetId++;this.lastOnset=time;this.ring.fill(0);this.index=0;this.total=0;this.counter=0;}
    this.envelope=.93*this.envelope+.07*this.fastEnergy;
    if(this.counter>=this.hop&&this.total>=this.size&&this.link){
      this.counter%=this.hop;
      if(!this.busy){
        const frame=this.pool.pop()||new Float32Array(this.size);for(let i=0;i<this.size;i++)frame[i]=this.ring[(this.index+i)%this.size];
        this.busy=true;this.link.postMessage({samples:frame,rate:this.rate,time,onsetId:this.onsetId,onsetTime:this.lastOnset,rawPeak:time<this.clipUntil?1:peak,rawRms:rms,dropped:this.dropped},[frame.buffer]);
      }else this.dropped++;
    }
    // Outputs are deliberately left silent: the microphone is never monitored.
    return true;
  }
}
registerProcessor('piano-capture',PianoCapture);
