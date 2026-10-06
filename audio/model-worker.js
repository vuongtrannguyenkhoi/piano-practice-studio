/* Builds the per-exercise model off the main thread with the app's own capture Worklet class. */
self.AudioWorkletProcessor=class{constructor(){this.port={};}};
self.registerProcessor=(name,klass)=>{self.CaptureProcessor=klass;};
importScripts('mic-worklet.js?v=0a7152c-703037b64d94','pitch-core.js?v=0a7152c-703037b64d94','polyphony-core.js?v=0a7152c-703037b64d94','chord-verify-core.js?v=0a7152c-703037b64d94','score-model-core.js?v=0a7152c-703037b64d94');
let verifier=null;
onmessage=async({data})=>{
  if(data.type!=='build')return;
  try{
    verifier??=await fetch('../assets/piano-polyphony-dictionary.json?v=0a7152c-703037b64d94').then(response=>{if(!response.ok)throw Error('Dictionary unavailable');return response.json();}).then(dictionary=>new PianoChordVerify.Verifier(new PianoPolyphony.Detector(dictionary)));
    const started=performance.now();
    const model=PianoScoreModel.buildModel({id:data.id,notes:data.notes,targets:data.targets,takes:data.takes,verifier,Processor:self.CaptureProcessor,setClock:(rate,frame)=>{self.sampleRate=rate;self.currentFrame=frame;}});
    postMessage({request:data.request,model:{...model,buildMs:Math.round(performance.now()-started)}});
  }catch(error){postMessage({request:data.request,error:error.message});}
};
