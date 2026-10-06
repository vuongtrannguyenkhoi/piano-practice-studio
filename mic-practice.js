/* Lesson grading only. Never supplies expected notes to the audio detector. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.PianoMicPractice=factory();
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const mode=value=>value==='precise'?'precise':'relaxed';
  function grade(result,expected,selectedMode){
    if(result?.status!=='note'||result.attack!==true||!Number.isInteger(result.midi)||result.midi<36||result.midi>84||!Number.isInteger(expected)||expected<36||expected>84)return {kind:'ungraded',advance:false};
    if(result.midi===expected)return {kind:'exact',advance:true};
    if((result.midi-expected)%12===0)return {kind:'near',advance:mode(selectedMode)==='relaxed',octaves:(expected-result.midi)/12};
    return {kind:'retry',advance:false};
  }
  return {mode,grade};
});
