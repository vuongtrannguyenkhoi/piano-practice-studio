importScripts('pitch-core.js?v=6f05aa8','polyphony-core.js?v=6f05aa8','chord-core.js?v=6f05aa8','chord-verify-core.js?v=6f05aa8');
let tracker=new PianoPitch.Tracker(),link,guard=null,guardMode='off',guardState='off';
let detector=null,dictionaryLoading=null,expected=null,expectedOptions={},verifier=null,verifyState='off',lastOnsetId=null;
const chordTracker=new PianoChords.Tracker(),verifyTracker=new PianoChordVerify.Tracker(2);
// One spectral dictionary serves the free observer and the answer-aware chord verifier.
function loadDictionary(){
  if(detector)return Promise.resolve(detector);
  dictionaryLoading??=fetch('../assets/piano-polyphony-dictionary.json?v=6f05aa8')
    .then(response=>{if(!response.ok)throw Error('Dictionary unavailable');return response.json();})
    .then(dictionary=>detector=new PianoPolyphony.Detector(dictionary))
    .finally(()=>{dictionaryLoading=null;});
  return dictionaryLoading;
}
// The lesson's expected notes: chord targets, or every target when a per-exercise model supplies
// `reference` (and `background`, keys still sounding per the score). Otherwise single notes stay with YIN.
function setExpected(notes,options={}){
  verifyTracker.reset(lastOnsetId);
  const scoreInformed=!!options.reference;
  expected=Array.isArray(notes)&&notes.length>(scoreInformed?0:1)&&notes.every(Number.isInteger)?notes.slice().sort((a,b)=>a-b):null;
  expectedOptions=expected&&scoreInformed?{background:options.background||[],reference:options.reference}:{};
  if(!expected){verifyState='off';return;}
  if(verifier){verifyState='ready';return;}
  verifyState='loading';
  loadDictionary().then(()=>{verifier??=new PianoChordVerify.Verifier(detector);if(expected)verifyState='ready';}).catch(()=>{if(expected)verifyState='error';});
}
function setGuardMode(mode){
  chordTracker.reset();
  guardMode=mode==='observe'?'observe':'off';
  if(guardMode==='off'){guardState='off';return;}
  if(guard){guardState='ready';return;}
  guardState='loading';
  loadDictionary().then(()=>{guard=detector;guardState=guardMode==='observe'?'ready':'off';}).catch(()=>{guardState=guardMode==='observe'?'error':'off';});
}
onmessage=({data})=>{
  if(data.type==='guard-mode'){setGuardMode(data.mode);return;}
  if(data.type==='expect'){setExpected(data.notes,data);return;}
  if(data.type==='config'){tracker.config=data.config;tracker.reset();chordTracker.reset();verifyTracker.reset();}
  if(data.port){link=data.port;link.onmessage=({data:frame})=>{
    const begin=performance.now();lastOnsetId=frame.onsetId;
    const result=frame.rawPeak>=.985?{status:'clipping',attack:false,rms:frame.rawRms,peak:frame.rawPeak}:tracker.process(frame.samples,frame.rate,frame);
    // Observe independently on every audible frame, including frames YIN
    // rejects. Experimental output never changes the lesson result/attack.
    let observation={status:guardState};
    if(guardMode==='observe'&&frame.rawPeak>=.985){observation={status:'clipping'};chordTracker.reset();}
    if(guardMode==='observe'&&guard&&frame.rawPeak<.985){
      const start=performance.now();
      try{const spectral=guard.analyze(frame.samples,frame.rate,tracker.config);observation={...spectral,chord:{...chordTracker.process(spectral,frame.time),time:frame.time,onsetTime:frame.onsetTime,onsetId:frame.onsetId},processingMs:performance.now()-start};}
      catch(error){guardState='error';guard=null;observation={status:'error'};}
    }
    let verify;
    if(expected)verify=frame.rawPeak>=.985?{status:'clipping'}:verifier?(({weight,...v})=>v)(verifyTracker.process(verifier.verify(frame.samples,frame.rate,expected,{...tracker.config,...expectedOptions}),frame.onsetId)):{status:verifyState};
    if(verify)verify.expected=expected;
    postMessage({...result,guard:observation,verify,time:frame.time,onsetTime:frame.onsetTime,onsetId:frame.onsetId,rawRms:frame.rawRms,rawPeak:frame.rawPeak,dropped:frame.dropped,processingMs:performance.now()-begin});
    link.postMessage({buffer:frame.samples.buffer},[frame.samples.buffer]);
  };link.start();}
};
