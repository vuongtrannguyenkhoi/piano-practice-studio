/* Timing/lesson scoring only. Single notes come from the answer-blind YIN detector; chord targets
   use the Worker's answer-aware verdicts (result.verify), as in step practice. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();else root.PianoMicTempo=factory();
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  class Session{
    constructor({targets,tempo,startTime,fromBeat,endBeat,mode='relaxed'}){
      if(!targets.length||!Number.isFinite(tempo)||tempo<=0||!Number.isFinite(startTime)||!Number.isFinite(fromBeat)||!Number.isFinite(endBeat)||endBeat<=fromBeat)throw Error('Invalid timed practice');
      this.mode=mode==='precise'?'precise':'relaxed';this.spb=60/tempo;this.startTime=startTime;this.fromBeat=fromBeat;this.endBeat=endBeat;this.running=true;this.extra=0;this.seen=new Set();this.grace=.35;
      this.targets=targets.map(t=>{
        const pitches=(t.pitches??[t.midi]).slice().sort((a,b)=>a-b);
        // `skip`: keys the microphone cannot verify (octave-doubled chords); excluded from the score.
        return {...t,pitches,midi:pitches.length===1?pitches[0]:undefined,chord:pitches.length>1,at:startTime+(t.beat-fromBeat)*this.spb,status:t.skip?'skipped':'pending',unclear:false};
      }).sort((a,b)=>a.at-b.at);
      this.targets.forEach((t,i)=>{
        if(!Number.isFinite(t.beat)||t.beat<fromBeat||t.beat>=endBeat||!t.pitches.length||t.pitches.some(p=>!Number.isInteger(p)||p<36||p>84)||(i&&t.at<=this.targets[i-1].at))throw Error('Only distinct targets with keys in C2–C6 are supported');
        const gap=Math.min(i?t.at-this.targets[i-1].at:Infinity,i+1<this.targets.length?this.targets[i+1].at-t.at:Infinity);
        t.window=Math.min(this.mode==='relaxed'?.28:.22,gap*.49);
        t.good=Math.min(this.mode==='relaxed'?.14:.09,t.window);
      });
      this.finishTime=Math.max(startTime+(endBeat-fromBeat)*this.spb,this.targets.at(-1).at+this.targets.at(-1).window+this.grace);
    }
    nearest(time){
      let low=0,high=this.targets.length;
      while(low<high){const mid=(low+high)>>1;if(this.targets[mid].at<time)low=mid+1;else high=mid;}
      const candidates=[this.targets[low-1],this.targets[low]].filter(Boolean);
      const target=candidates.sort((a,b)=>Math.abs(a.at-time)-Math.abs(b.at-time))[0];
      return target&&Math.abs(target.at-time)<=target.window+1e-9?target:null;
    }
    // The target whose verdict is due. A verifier decision lands ~90 ms after the onset, so keep each
    // target up to 150 ms past its window (never past the next window's opening): a late strike near
    // the window edge is still verified against its own keys.
    current(time){
      for(let i=0;i<this.targets.length;i++){
        const t=this.targets[i],next=this.targets[i+1],hold=next?Math.max(0,Math.min(.15,(next.at-next.window)-(t.at+t.window))):.15;
        if(time<=t.at+t.window+hold+1e-9)return t;
      }
      return null;
    }
    observe(result){
      if(!this.running)return null;
      if(result.verify?.fresh&&['match','wrong','missing'].includes(result.verify.decision))return this.observeChord(result);
      if(result.status!=='note'){
        if(['uncertain','stabilizing','clipping','out-of-range'].includes(result.status)&&Number.isFinite(result.time)){
          const target=this.nearest(result.time);if(target?.status==='pending'&&!target.chord)target.unclear=true;
        }
        return null;
      }
      if(!result.attack||!Number.isFinite(result.onsetTime)||!Number.isInteger(result.midi)||result.midi<36||result.midi>84)return null;
      const time=result.onsetTime;
      if(time<this.startTime-this.targets[0].window||time>this.finishTime)return null;
      if(Number.isInteger(result.onsetId)){
        const token=`${result.onsetId}:${time}`;if(this.seen.has(token))return null;this.seen.add(token);
      }
      const target=this.nearest(time);
      if(target&&(target.chord||target.status==='skipped'))return null; // YIN notes never grade chords
      if(!target||target.status!=='pending'){this.extra++;return null;}
      const delta=time-target.at,exact=result.midi===target.midi,near=!exact&&(result.midi-target.midi)%12===0;
      const pitch=exact?1:near&&this.mode==='relaxed'?.5:0;
      const timing=Math.abs(delta)<=target.good+1e-9?1:.5;
      Object.assign(target,{status:exact?'exact':near?'near':'wrong',detectedMidi:result.midi,deltaMs:delta*1000,timing:timing===1?'on-time':delta<0?'early':'late',pitchCredit:pitch,timingCredit:timing,points:pitch*70+timing*30});
      return target;
    }
    observeChord(result){
      const verify=result.verify,time=result.onsetTime;
      if(!Number.isFinite(time)||time<this.startTime-this.targets[0].window||time>this.finishTime)return null;
      const target=this.nearest(time);
      if(!target?.chord||target.status!=='pending'||verify.expected?.join()!==target.pitches.join())return null;
      const delta=time-target.at,timing=Math.abs(delta)<=target.good+1e-9?1:.5,when={deltaMs:delta*1000,timing:timing===1?'on-time':delta<0?'early':'late',timingCredit:timing};
      if(verify.decision==='match'){Object.assign(target,{status:'exact',...when,pitchCredit:1,points:70+timing*30,provisional:null});return target;}
      // Missing/extra keys may still resolve to a match for the same attack; settle when the window closes.
      target.provisional={...when,decision:verify.decision,missing:verify.missing||[],intruders:verify.intruders||[]};
      return target;
    }
    advance(time){
      if(!this.running||!Number.isFinite(time))return [];
      const changes=[];
      for(const t of this.targets){
        if(t.status==='pending'&&time>t.at+t.window+this.grace){
          if(t.provisional){const {deltaMs,timing,timingCredit}=t.provisional;Object.assign(t,{status:'wrong',deltaMs,timing,timingCredit,pitchCredit:0,points:timingCredit*30});}
          else{t.status=t.unclear?'unreadable':'missed';t.points=t.unclear?null:0;t.pitchCredit=t.timingCredit=0;}
          changes.push(t);
        }
      }
      if(time>=this.finishTime&&this.targets.every(t=>t.status!=='pending'))this.running=false;
      return changes;
    }
    beatAt(time){return Math.max(this.fromBeat,Math.min(this.endBeat,this.fromBeat+(time-this.startTime)/this.spb));}
    summary(){
      const completed=this.targets.filter(t=>t.status!=='pending'&&t.status!=='skipped'),evaluated=completed.filter(t=>t.status!=='unreadable');
      const graded=this.targets.filter(t=>t.status!=='skipped').length;
      const count=status=>completed.filter(t=>t.status===status).length;
      const average=(field,scale=1)=>evaluated.length?Math.round(evaluated.reduce((sum,t)=>sum+(t[field]||0),0)*scale/evaluated.length):null;
      return {total:this.targets.length,skipped:this.targets.length-graded,resolved:completed.length,evaluated:evaluated.length,unreadable:count('unreadable'),missed:count('missed'),exact:count('exact'),near:count('near'),wrong:count('wrong'),early:completed.filter(t=>t.timing==='early').length,late:completed.filter(t=>t.timing==='late').length,extra:this.extra,score:average('points'),noteScore:average('pitchCredit',100),timingScore:average('timingCredit',100),coverage:graded?Math.round(evaluated.length/graded*100):0};
    }
  }
  return {Session};
});
