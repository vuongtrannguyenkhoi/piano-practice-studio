(() => {
  'use strict';
  const _t=globalThis.I18N?.t||((text,args)=>args?text.replace(/\{(\d+)\}/g,(m,i)=>args[i]):text);
  const KEY='piano-phrases-v1';
  window.createPianoComposer=function(api){
    const $=id=>document.getElementById(id);
    let saved={},lesson=null;
    try{const data=JSON.parse(localStorage.getItem(KEY)||'{}');if(data&&typeof data==='object'&&!Array.isArray(data))saved=data;}catch(_){}
    function choice(){
      const spec=lesson.creative,old=saved[lesson.id];
      if(!old||!Array.isArray(old.notes)||old.notes.length!==4||old.notes.some(n=>!spec.notes.includes(n))||!Number.isInteger(old.rhythm)||old.rhythm<0||old.rhythm>=spec.rhythms.length){
        saved[lesson.id]={notes:spec.notes.slice(0,4),rhythm:0};
      }
      return saved[lesson.id];
    }
    function build(){
      if(!lesson.creative)return lesson;
      const selected=choice(),pattern=lesson.creative.rhythms[selected.rhythm][1];
      const rh=[];let cursor=0;
      for(let bar=0;bar<4;bar++){
        if(lesson.creative.restBars?.includes(bar)){rh.push([[null,4]]);continue;}
        const events=[];
        if(typeof pattern==='string'){
          for(let beat=0;beat<4;beat++){
            const spec={group:String(beat),numNotes:3,occupied:2};
            events.push([selected.notes[cursor++%4],2/3,{duration:'q',tuplet:spec}]);
            events.push([pattern==='swing-rest'&&beat%2===1?null:selected.notes[cursor++%4],1/3,{duration:'8',tuplet:spec}]);
          }
        }else{
          for(const duration of pattern)events.push([duration===null?null:selected.notes[cursor++%4],duration===null?1:duration]);
        }
        rh.push(events);
      }
      return {...lesson,rh};
    }
    function summarize(){
      const selected=choice();
      $('composer-summary').textContent=_t("Câu bạn chọn: {0} · {1}. Phần đệm được giữ nguyên.",[selected.notes.join(' · '),lesson.creative.rhythms[selected.rhythm][0]]);
    }
    function change(){
      try{localStorage.setItem(KEY,JSON.stringify(saved));}catch(_){}
      summarize();api.onChange(build());
    }
    $('composer-rhythm').addEventListener('change',event=>{if(!lesson?.creative)return;choice().rhythm=Number(event.target.value);change();});
    $('composer-shuffle').addEventListener('click',()=>{
      if(!lesson?.creative)return;
      const selected=choice(),pool=lesson.creative.notes;
      selected.notes=Array.from({length:4},()=>pool[Math.floor(Math.random()*pool.length)]);
      $('composer-notes').querySelectorAll('select').forEach((select,index)=>select.value=selected.notes[index]);change();
    });
    return {
      prepare(value){
        lesson=value;$('composer').hidden=!lesson.creative;
        if(!lesson.creative)return lesson;
        const selected=choice();$('composer-notes').replaceChildren();
        for(let i=0;i<4;i++){
          const label=document.createElement('label');label.textContent=_t("Nốt {0}",[i+1]);
          const select=document.createElement('select');select.setAttribute('aria-label',_t("Nốt {0} của câu nhạc",[i+1]));select.dataset.phraseNote=i;
          lesson.creative.notes.forEach(note=>{const option=document.createElement('option');option.value=note;option.textContent=note;select.append(option);});
          select.value=selected.notes[i];select.addEventListener('change',()=>{choice().notes[i]=select.value;change();});label.append(select);$('composer-notes').append(label);
        }
        $('composer-rhythm').replaceChildren();lesson.creative.rhythms.forEach(([name],index)=>{const option=document.createElement('option');option.value=index;option.textContent=name;$('composer-rhythm').append(option);});
        $('composer-rhythm').value=selected.rhythm;summarize();return build();
      }
    };
  };
})();
