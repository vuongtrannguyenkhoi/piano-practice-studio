/* Builds the per-exercise model off the main thread with the app's own capture Worklet class. */
self.AudioWorkletProcessor=class{constructor(){this.port={};}};
self.registerProcessor=(name,klass)=>{self.CaptureProcessor=klass;};
importScripts('mic-worklet.js?v=df55802-7ce77c1bfc5b','pitch-core.js?v=df55802-7ce77c1bfc5b','polyphony-core.js?v=df55802-7ce77c1bfc5b','chord-verify-core.js?v=df55802-7ce77c1bfc5b','score-model-core.js?v=df55802-7ce77c1bfc5b');
let verifier=null;
onmessage=async({data})=>{
  if(data.type!=='build')return;
  try{
    verifier??=await fetch('../assets/piano-polyphony-dictionary.json?v=df55802-7ce77c1bfc5b').then(response=>{if(!response.ok)throw Error('Dictionary unavailable');return response.json();}).then(dictionary=>new PianoChordVerify.Verifier(new PianoPolyphony.Detector(dictionary)));
    const started=performance.now();
    const model=PianoScoreModel.buildModel({id:data.id,notes:data.notes,targets:data.targets,takes:data.takes,verifier,Processor:self.CaptureProcessor,setClock:(rate,frame)=>{self.sampleRate=rate;self.currentFrame=frame;}});
    postMessage({request:data.request,model:{...model,buildMs:Math.round(performance.now()-started)}});
  }catch(error){postMessage({request:data.request,error:error.message});}
};
