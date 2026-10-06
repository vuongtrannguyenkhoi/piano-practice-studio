/* Re-scores a recorded tempo round with both grading methods, off the main thread. */
self.AudioWorkletProcessor=class{constructor(){this.port={};}};
self.registerProcessor=(name,klass)=>{self.CaptureProcessor=klass;};
importScripts('mic-worklet.js?v=0a7152c-336ed187f73b','pitch-core.js?v=0a7152c-336ed187f73b','polyphony-core.js?v=0a7152c-336ed187f73b','chord-verify-core.js?v=0a7152c-336ed187f73b','../mic-tempo.js?v=0a7152c-336ed187f73b','evaluation-core.js?v=0a7152c-336ed187f73b');
let verifier=null;
onmessage=async({data})=>{
  if(data.type!=='evaluate')return;
  try{
    verifier??=await fetch('../assets/piano-polyphony-dictionary.json?v=0a7152c-336ed187f73b').then(response=>{if(!response.ok)throw Error('Dictionary unavailable');return response.json();}).then(dictionary=>new PianoChordVerify.Verifier(new PianoPolyphony.Detector(dictionary)));
    const common={input:data.pcm,rate:data.rate,targets:data.targets,tempo:data.tempo,fromBeat:data.fromBeat,endBeat:data.endBeat,startTime:data.startTime,config:data.config,mode:data.mode,
      Processor:self.CaptureProcessor,setClock:(rate,frame)=>{self.sampleRate=rate;self.currentFrame=frame;},PitchTracker:PianoPitch.Tracker,VerifyTracker:PianoChordVerify.Tracker,Session:PianoMicTempo.Session,verifier};
    const results={generic:PianoEvaluation.runMethod({...common,method:'generic'})};
    if(data.model)results.model=PianoEvaluation.runMethod({...common,method:'model',model:data.model});
    postMessage({request:data.request,results});
  }catch(error){postMessage({request:data.request,error:error.message});}
};
