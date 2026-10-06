(() => {
  'use strict';
  // Change touch and release only. Onsets, pitches and the beat grid stay intact.
  window.pianoSongExpression=function(song,event){
    const velocity=song.expression?.[`${event.hand}Velocity`]?.[event.bar]?.[event.noteIndex];
    if(!Number.isFinite(velocity))return null;
    const phraseEnd=event.hand==='rh'&&((song.barNumbers?.[event.bar]||event.bar+1)%4===0||event.bar===song.rh.length-1)&&event.noteIndex===song.rh[event.bar].length-1;
    const gate=event.hand==='lh'?.96:phraseEnd?.90:.985;
    return {velocity,gate,level:Math.max(.02,.045+(velocity-40)/64*.105)};
  };
})();
