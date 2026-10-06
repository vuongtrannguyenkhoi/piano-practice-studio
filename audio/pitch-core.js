/* Local monophonic pitch analysis. No lesson/expected-note input is accepted. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.PianoPitch=api;})(globalThis,()=>{
  'use strict';
  const frequency=(midi,a4=440)=>a4*2**((midi-69)/12);
  function yin(x,rate,threshold=.15,minFrequency=65){
    const max=Math.min(Math.ceil(rate/minFrequency),Math.floor(x.length/3)),min=Math.max(2,Math.floor(rate/1400)),size=x.length-max;
    const d=new Float64Array(max+1);let sum=0,best=min;
    for(let tau=1;tau<=max;tau++){
      let value=0;for(let j=0;j<size;j++){const delta=x[j]-x[j+tau];value+=delta*delta;}
      sum+=value;d[tau]=sum?value*tau/sum:1;
    }
    let selected=0;
    for(let tau=min;tau<max;tau++){
      if(d[tau]<d[best])best=tau;
      if(d[tau]<threshold){while(tau+1<=max&&d[tau+1]<d[tau])tau++;selected=tau;break;}
    }
    if(!selected)selected=best;
    const confidence=1-d[selected];if(confidence<.8)return {confidence};
    const left=d[selected-1]??d[selected],right=d[selected+1]??d[selected],den=left+right-2*d[selected];
    const refined=selected+(den?Math.max(-.5,Math.min(.5,(left-right)/(2*den))):0);
    return {frequency:rate/refined,confidence};
  }
  // NSDF is retained as a measured comparator, not used to bias YIN by an answer.
  function nsdf(x,rate,minFrequency=65){
    let best=0,lag=0;const min=Math.floor(rate/1400),max=Math.min(Math.ceil(rate/minFrequency),Math.floor(x.length/3));
    const values=[];
    for(let tau=0;tau<=max;tau++){let ac=0,energy=0;for(let j=0;j<x.length-max;j++){ac+=x[j]*x[j+tau];energy+=x[j]**2+x[j+tau]**2;}values[tau]=energy?2*ac/energy:0;}
    let crossed=false;
    for(let tau=1;tau<max;tau++){if(values[tau]<0)crossed=true;if(crossed&&tau>=min&&values[tau]>values[tau-1]&&values[tau]>=values[tau+1]&&values[tau]>best){best=values[tau];lag=tau;}}
    for(let tau=min;tau<max;tau++)if(values[tau]>best*.92&&values[tau]>values[tau-1]&&values[tau]>=values[tau+1]){lag=tau;break;}
    if(!lag||best<.8)return {confidence:best};
    const den=values[lag-1]+values[lag+1]-2*values[lag],offset=den?(values[lag-1]-values[lag+1])/(2*den):0;
    return {frequency:rate/(lag+offset),confidence:values[lag]};
  }
  function spectrum(x,rate,withBins=false){
    let n=1;while(n<x.length*2)n*=2;
    const re=new Float64Array(n),im=new Float64Array(n);
    for(let i=0;i<x.length;i++)re[i]=x[i]*(.5-.5*Math.cos(2*Math.PI*i/(x.length-1)));
    for(let i=1,j=0;i<n;i++){let bit=n>>1;for(;j&bit;bit>>=1)j^=bit;j^=bit;if(i<j){const a=re[i];re[i]=re[j];re[j]=a;}}
    for(let len=2;len<=n;len*=2){const angle=-2*Math.PI/len,wr=Math.cos(angle),wi=Math.sin(angle);for(let start=0;start<n;start+=len){let ar=1,ai=0;for(let j=0;j<len/2;j++){const a=start+j,b=a+len/2,tr=ar*re[b]-ai*im[b],ti=ar*im[b]+ai*re[b];re[b]=re[a]-tr;im[b]=im[a]-ti;re[a]+=tr;im[a]+=ti;const next=ar*wr-ai*wi;ai=ar*wi+ai*wr;ar=next;}}}
    const peaks=[];let top=0;
    for(let i=2;i<n/2-1;i++){const v=re[i]**2+im[i]**2;if(v>top)top=v;}
    for(let i=2;i<n/2-1;i++){
      const v=re[i]**2+im[i]**2,a=re[i-1]**2+im[i-1]**2,b=re[i+1]**2+im[i+1]**2;
      if(v<a||v<=b||v<top*.012)continue;
      const la=Math.log(a+1e-30),lv=Math.log(v+1e-30),lb=Math.log(b+1e-30),delta=.5*(la-lb)/(la-2*lv+lb);
      peaks.push({frequency:(i+Math.max(-.5,Math.min(.5,delta)))*rate/n,power:v});
    }
    const result={peaks,top,resolution:rate/x.length};
    if(withBins){result.binHz=rate/n;result.magnitudes=Float32Array.from(re.subarray(0,n/2),(_,i)=>Math.hypot(re[i],im[i]));}
    return result;
  }
  function analyze(samples,rate,config={}){
    const a4=Number(config.a4)||440,minMidi=config.minMidi??36,maxMidi=config.maxMidi??84;
    let sum=0,peak=0,mean=0;for(const v of samples){sum+=v*v;peak=Math.max(peak,Math.abs(v));mean+=v;}
    const rms=Math.sqrt(sum/samples.length),base={rms,peak};
    if(peak>=.985)return {...base,status:'clipping'};
    if(rms<(config.minRms??.0005))return {...base,status:'quiet'};
    mean/=samples.length;const x=Float32Array.from(samples,v=>v-mean);
    const minFrequency=Math.min(65,frequency(minMidi,a4)*.94);
    const pitch=config.method==='nsdf'?nsdf(x,rate,minFrequency):yin(x,rate,.15,minFrequency);
    if(!pitch.frequency||pitch.confidence<(config.confidence??.88))return {...base,status:'uncertain',confidence:pitch.confidence};
    const value=69+12*Math.log2(pitch.frequency/a4),midi=Math.round(value),cents=100*(value-midi);
    if(midi<minMidi||midi>maxMidi)return {...base,status:'out-of-range',frequency:pitch.frequency,confidence:pitch.confidence};
    if(Math.abs(cents)>40)return {...base,status:'uncertain',confidence:pitch.confidence};
    const spectral=spectrum(x,rate),f=pitch.frequency;
    const meaningful=spectral.peaks.filter(p=>p.frequency>=100&&p.frequency<=Math.min(4500,rate*.45)&&p.power>spectral.top*.045);
    let explained=0,unexplained=0;
    for(const p of meaningful){const harmonic=Math.round(p.frequency/f),error=Math.abs(p.frequency-harmonic*f),tolerance=Math.max(spectral.resolution*.7,p.frequency*.018);if(harmonic>=1&&error<tolerance)explained+=p.power;else unexplained+=p.power;}
    const residual=unexplained/(explained+unexplained||1);
    if(residual>.16)return {...base,status:'uncertain',reason:'multiple-or-noisy',confidence:pitch.confidence,residual};
    const oddPower=meaningful.filter(p=>Math.round(p.frequency/f)>=3&&Math.round(p.frequency/f)%2===1).reduce((sum,p)=>sum+p.power,0);
    const fundamental=spectral.peaks.find(p=>Math.abs(p.frequency-f)<spectral.resolution),octave=meaningful.find(p=>Math.abs(p.frequency-2*f)<spectral.resolution);
    const hasOddSupport=[3,5].every(n=>meaningful.some(p=>Math.abs(p.frequency-n*f)<Math.max(spectral.resolution,p.frequency*.018)));
    if(!fundamental&&!hasOddSupport)return {...base,status:'uncertain',reason:'missing-fundamental-or-mixture',confidence:pitch.confidence};
    // Exact octave mixtures are intrinsically ambiguous: abstain on strongly
    // octave-dominated spectra instead of claiming that they are single notes.
    if(octave&&oddPower<octave.power*.12&&(!fundamental||octave.power>fundamental.power*2.3))return {...base,status:'uncertain',reason:'octave-ambiguous',confidence:pitch.confidence,octaveRatio:octave.power/(fundamental?.power||1e-30),oddRatio:oddPower/(fundamental?.power||1e-30)};
    return {...base,status:'note',midi,frequency:pitch.frequency,cents,confidence:pitch.confidence,residual};
  }
  class Tracker {
    constructor(config={},validate=null){this.config=config;this.validate=validate;this.reset();}
    reset(){this.pending=null;this.frames=0;this.lastMidi=null;this.lastAttack=-1;this.lastAcceptedMidi=null;this.quiet=0;}
    process(samples,rate,meta={}){
      let result=analyze(samples,rate,this.config);
      if(result.status==='note'&&this.validate)result=this.validate(samples,rate,result,this.config);
      if(result.status!=='note'){this.pending=null;this.frames=0;if(result.status==='quiet'){if(++this.quiet>=3)this.lastMidi=null;}else this.quiet=0;return {...result,attack:false};}
      this.quiet=0;if(this.pending===result.midi)this.frames++;else{this.pending=result.midi;this.frames=1;}
      if(this.frames<2)return {...result,status:'stabilizing',midi:undefined,attack:false};
      if(this.lastAcceptedMidi!==null&&this.lastAcceptedMidi!==result.midi&&(meta.onsetId??0)===this.lastAttack)return {...result,status:'uncertain',midi:undefined,reason:'changing-tail-without-attack',attack:false};
      const attack=this.lastAcceptedMidi!==result.midi||(meta.onsetId??0)!==this.lastAttack;
      this.lastAcceptedMidi=this.lastMidi=result.midi;this.lastAttack=meta.onsetId??0;
      return {...result,attack,onsetId:this.lastAttack};
    }
  }
  return {analyze,yin,nsdf,spectrum,Tracker,frequency};
});
