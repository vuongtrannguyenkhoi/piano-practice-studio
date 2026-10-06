/* Raw mono capture for single-key takes (per-exercise model). Only while armed; never monitored. */
class PianoTake extends AudioWorkletProcessor {
  constructor(){
    super();this.armed=false;this.stopped=false;
    this.port.onmessage=({data})=>{if(data.type==='arm')this.armed=true;else if(data.type==='disarm')this.armed=false;else if(data.type==='stop')this.stopped=true;};
  }
  process(inputs,outputs){
    if(this.stopped)return false;
    for(const output of outputs)for(const channel of output)channel.fill(0);
    const channels=inputs[0];if(!this.armed||!channels?.length)return true;
    const block=new Float32Array(channels[0].length);
    for(let i=0;i<block.length;i++){let value=0;for(const channel of channels)value+=channel[i];block[i]=value/channels.length;}
    this.port.postMessage({block,time:currentTime},[block.buffer]);
    return true;
  }
}
registerProcessor('piano-take',PianoTake);
