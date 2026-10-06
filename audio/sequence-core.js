/* Note-sequence scoring for calibration and recordings. Runs after detection; never feeds the detector. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.PianoSequence=api;})(globalThis,()=>{
  'use strict';
  const NAMES=['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
  const STEPS={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
  const noteName=midi=>NAMES[midi%12]+(Math.floor(midi/12)-1);
  function parseNote(token){
    const match=/^([A-Ga-g])([#♯b♭]?)(-?\d)$/.exec(token);
    if(!match)throw Error(`Không đọc được nốt "${token}". Dùng dạng C4, F#3, B♭4; mỗi nốt một ô, không ghi hợp âm.`);
    const accidental=match[2]==='#'||match[2]==='♯'?1:match[2]==='b'||match[2]==='♭'?-1:0;
    return STEPS[match[1].toUpperCase()]+accidental+12*(Number(match[3])+1);
  }
  // '#' starts a comment only at line start or after whitespace, so C#4 stays a note.
  const parseSequence=text=>text.split('\n').map(line=>line.replace(/(^|\s)#.*$/,'')).join(' ').split(/[\s,]+/).filter(Boolean).map(parseNote);
  // Global alignment of expected MIDI notes against heard attacks ({midi,...}).
  // A same-pitch-class substitution is cheaper so it is reported as an octave error.
  function align(expected,heard){
    const n=expected.length,m=heard.length,cost=Array.from({length:n+1},()=>new Float64Array(m+1));
    const sub=(i,j)=>expected[i]===heard[j].midi?0:(expected[i]-heard[j].midi)%12===0?.9:1;
    for(let i=0;i<=n;i++)cost[i][0]=i;for(let j=0;j<=m;j++)cost[0][j]=j;
    for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)cost[i][j]=Math.min(cost[i-1][j-1]+sub(i-1,j-1),cost[i-1][j]+1,cost[i][j-1]+1);
    const steps=[];let i=n,j=m;
    while(i>0||j>0){
      // On ties, take the miss while walking back so gaps land late: "C4 C4" heard for "C4 C4 C4 C4" marks the first two.
      if(i>0&&Math.abs(cost[i][j]-(cost[i-1][j]+1))<1e-9){steps.push({kind:'missed',expected:expected[i-1]});i--;continue;}
      if(i>0&&j>0&&Math.abs(cost[i][j]-(cost[i-1][j-1]+sub(i-1,j-1)))<1e-9){const s=sub(i-1,j-1);steps.push({kind:s===0?'correct':s<1?'octave':'wrong',expected:expected[i-1],heard:heard[j-1]});i--;j--;continue;}
      steps.push({kind:'extra',heard:heard[j-1]});j--;
    }
    return steps.reverse();
  }
  function summarize(steps){
    const count=kind=>steps.filter(s=>s.kind===kind).length;
    return {expected:steps.filter(s=>s.kind!=='extra').length,correct:count('correct'),octave:count('octave'),wrong:count('wrong'),missed:count('missed'),extra:count('extra')};
  }
  return {noteName,parseNote,parseSequence,align,summarize};
});
