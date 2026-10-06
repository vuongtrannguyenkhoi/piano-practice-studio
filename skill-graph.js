(() => {
  'use strict';
  const starsOf=value=>Number.isInteger(value)?Math.max(0,Math.min(3,value)):0;
  function validate(graph,data,songs=[]){
    const ids=new Set(graph.nodes.map(n=>n.id)),groups=new Set(graph.groups.map(g=>g.id));
    if(ids.size!==graph.nodes.length)throw Error('Duplicate skill');
    const visited=new Set(),visiting=new Set();
    const visit=id=>{
      if(visiting.has(id))throw Error('Skill dependency cycle: '+id);
      if(visited.has(id))return;
      const node=graph.nodes.find(n=>n.id===id);if(!node)throw Error('Unknown skill: '+id);
      visiting.add(id);node.requires.forEach(visit);visiting.delete(id);visited.add(id);
    };
    for(const node of graph.nodes){
      if(!groups.has(node.group))throw Error('Unknown skill group');visit(node.id);
      if(!node.starters.length||node.starters.some(id=>!graph.lessons[id]?.primary.includes(node.id)))throw Error('Invalid starter: '+node.id);
    }
    if(Object.keys(graph.lessons).length!==data.exercises.length)throw Error('Incomplete skill coverage');
    for(const e of data.exercises){
      const binding=graph.lessons[e.id];if(!binding?.primary.length)throw Error('Unmapped lesson: '+e.id);
      const all=[...binding.primary,...binding.context];
      if(new Set(all).size!==all.length||all.some(id=>!ids.has(id)))throw Error('Invalid lesson skill: '+e.id);
    }
    for(const song of songs){
      const binding=graph.songs[song.id];
      if(!binding||[...binding.primary,...binding.context,...binding.requires].some(id=>!ids.has(id)))throw Error('Unmapped song');
    }
    return true;
  }
  function snapshot(graph,data,records={},marked=[]){
    const result={};
    for(const node of graph.nodes){
      const lessons=data.exercises.filter(e=>graph.lessons[e.id].primary.includes(node.id));
      const completed=lessons.filter(e=>starsOf(records[e.id]?.stars)===3).length;
      const steps=lessons.reduce((n,e)=>n+starsOf(records[e.id]?.stars),0);
      result[node.id]={lessons,completed,steps,marked:lessons.filter(e=>marked.includes(e.id)&&starsOf(records[e.id]?.stars)===0).length,
        practiced:completed>=Math.min(2,lessons.length),hasFoundation:completed>=1};
    }
    for(const node of graph.nodes){
      const state=result[node.id];state.missing=node.requires.filter(id=>!result[id].hasFoundation);
      state.status=state.practiced?'practiced':state.steps?'learning':state.missing.length?'foundation':'ready';
    }
    return result;
  }
  function recommend(graph,state,records,selected){
    const node=graph.nodes.find(n=>n.id===selected)||graph.nodes[0];
    // Walk the nearest missing foundation; advanced completion never fabricates it.
    const find=id=>{
      const current=graph.nodes.find(n=>n.id===id);
      const missing=current.requires.find(key=>!state[key].hasFoundation);
      return missing?find(missing):current;
    };
    const target=find(node.id),lessons=state[target.id].lessons;
    const unfinished=lessons.filter(e=>starsOf(records[e.id]?.stars)<3);
    const started=unfinished.find(e=>starsOf(records[e.id]?.stars)>0);
    const starter=target.starters.map(id=>unfinished.find(e=>e.id===id)).find(Boolean);
    const lesson=started||starter||unfinished[0]||lessons.find(e=>e.id===target.starters[0]);
    return {skill:target,lesson,foundation:target.id!==node.id,review:!unfinished.length};
  }
  function songProgress(value){
    const allowed=new Set(['join:0','full:0']);
    for(let phrase=1;phrase<=12;phrase++)for(let step=0;step<4;step++)allowed.add(`phrase-${phrase}:${step}`);
    return [...new Set(Array.isArray(value?.completed)?value.completed.filter(k=>allowed.has(k)):[])].length;
  }
  window.PianoSkillGraph={validate,snapshot,recommend,songProgress,starsOf};

  window.createPianoSkillGraph=function(api){
    const graph=window.PIANO_SKILLS,core=window.PianoSkillGraph,$=id=>document.getElementById(id);
    core.validate(graph,api.data,window.PIANO_SONGS);
    let selected='together',group='all',source='all',filter='all';
    try{const saved=JSON.parse(localStorage.getItem('piano-skill-view-v1'));if(graph.nodes.some(n=>n.id===saved?.selected))selected=saved.selected;}catch(_){}
    const read=key=>{try{return JSON.parse(localStorage.getItem(key)||'null')}catch(_){return null}};
    const progress=()=>{const saved=read('piano-journey-v1');return saved?.lessons&&typeof saved.lessons==='object'&&!Array.isArray(saved.lessons)?saved.lessons:{}};
    const statusLabels={practiced:'Đã luyện',learning:'Đang luyện',ready:'Có thể bắt đầu',foundation:'Ôn nền trước'};
    const sources={all:'Tất cả bộ bài',legacy:'Độc lập hai tay','adult-beginner':'Người lớn · Tập 1','adult-volume-2':'Người lớn · Tập 2','chords-24':'24 bài hợp âm','pieces-18':'18 tiểu phẩm'};
    // Actual source identifier in Volume 1 is read from the catalog.
    const firstBook=api.data.exercises.find(e=>e.id===51)?.book.id;
    delete sources['adult-beginner'];sources[firstBook]='Người lớn · Tập 1';
    const el=(tag,text,className)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node};
    function button(text,action,className){const b=el('button',text,className);b.type='button';b.addEventListener('click',action);return b;}
    function select(id,route=true){
      if(!graph.nodes.some(n=>n.id===id))return;selected=id;
      if(group!=='all')group=graph.nodes.find(n=>n.id===id).group;
      try{localStorage.setItem('piano-skill-view-v1',JSON.stringify({selected}));}catch(_){}
      render();if(route)api.navigate(id);
    }
    function skillButton(id,state){
      const node=graph.nodes.find(n=>n.id===id),value=state[id];
      const b=button('',()=>select(id),'skill-node '+value.status);
      b.dataset.skill=id;b.setAttribute('aria-pressed',String(id===selected));
      b.append(el('strong',node.label),el('span',statusLabels[value.status],'skill-status'),el('small',`${value.completed}/${value.lessons.length} bài đã hoàn thành`));
      return b;
    }
    function drawConnections(){
      const relation=$('skill-relations'),bounds=relation.getBoundingClientRect();
      relation.querySelector('.skill-connections')?.remove();
      if(!bounds.width||!bounds.height)return;
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('class','skill-connections');svg.setAttribute('aria-hidden','true');
      svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
      const columns=relation.querySelectorAll('.skill-relation-column'),center=columns[1].querySelector('button');
      if(!center)return;
      const connect=(from,to)=>{
        const a=from.getBoundingClientRect(),b=to.getBoundingClientRect();
        const x1=a.right-bounds.left,y1=a.top+a.height/2-bounds.top,x2=b.left-bounds.left,y2=b.top+b.height/2-bounds.top;
        const path=document.createElementNS(svg.namespaceURI,'path'),mid=(x1+x2)/2;
        path.setAttribute('d',`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
        svg.append(path);
        const arrow=document.createElementNS(svg.namespaceURI,'path');arrow.setAttribute('d',`M ${x2-4} ${y2-3} L ${x2} ${y2} L ${x2-4} ${y2+3}`);svg.append(arrow);
      };
      columns[0].querySelectorAll('button').forEach(b=>connect(b,center));
      columns[2].querySelectorAll('button').forEach(b=>connect(center,b));relation.prepend(svg);
    }
    function render(){
      const records=progress(),state=core.snapshot(graph,api.data,records,Array.isArray(read('piano-independence-done'))?read('piano-independence-done'):[]);
      const current=graph.nodes.find(n=>n.id===selected),value=state[selected];
      $('skills-summary').textContent=`${graph.nodes.length} kỹ năng · ${graph.nodes.filter(n=>state[n.id].practiced).length} đã luyện · ${api.data.exercises.length} bài + ${window.PIANO_SONGS.length} bài hát`;
      $('skill-groups').replaceChildren();
      for(const g of [{id:'all',label:'Tất cả'},...graph.groups]){
        const b=button(g.label,()=>{group=g.id;render();});b.setAttribute('aria-pressed',String(group===g.id));$('skill-groups').append(b);
      }
      const map=$('skill-map');map.replaceChildren();
      for(const g of graph.groups.filter(g=>group==='all'||g.id===group)){
        const section=el('section',undefined,'skill-family');section.append(el('h3',`${g.icon} ${g.label}`));
        const nodes=el('div',undefined,'skill-nodes');
        for(const node of graph.nodes.filter(n=>n.group===g.id))nodes.append(skillButton(node.id,state));
        section.append(nodes);map.append(section);
      }
      const suggestion=core.recommend(graph,state,records,selected);
      $('skill-next-title').textContent=suggestion.foundation?`Ôn nền: ${suggestion.skill.label}`:suggestion.review?`Ôn lại ${current.label}`:`Tiếp tục: ${current.label}`;
      $('skill-next-reason').textContent=suggestion.foundation?`Để luyện “${current.label}”, hãy có một bài nền hoàn thành ở “${suggestion.skill.label}”. Bạn vẫn có thể mở mọi bài.`:value.practiced?'Thử thêm bài khác để đưa kỹ năng vào âm nhạc.':'Một bài ngắn để luyện trực tiếp kỹ năng đang chọn.';
      $('skill-next-button').textContent=`${suggestion.review?'Ôn':'Luyện'} bài ${suggestion.lesson.id} · ${suggestion.lesson.title}`;
      $('skill-next-button').onclick=()=>api.openLesson(suggestion.lesson.id);
      $('skill-detail-title').textContent=current.label;$('skill-detail-description').textContent=current.description;
      $('skill-detail-progress').textContent=`${statusLabels[value.status]} · ${value.completed}/${value.lessons.length} bài trực tiếp hoàn thành · ${value.steps} bước tự xác nhận${value.marked?` · ${value.marked} bài đã đánh dấu tập`:''}`;
      const relation=$('skill-relations');relation.replaceChildren();
      const children=graph.nodes.filter(n=>n.requires.includes(selected));
      for(const [title,ids] of [['Nền nên có',current.requires],['Bạn đang luyện',[selected]],['Dẫn tới',children.map(n=>n.id)]]){
        const column=el('div',undefined,'skill-relation-column');column.append(el('h3',title));
        if(!ids.length)column.append(el('p',title==='Nền nên có'?'Bắt đầu từ đây.':'Đưa vào bài nhạc bạn thích.','skill-relation-empty'));
        for(const id of ids)column.append(skillButton(id,state));relation.append(column);
      }
      const list=$('skill-lessons');list.replaceChildren();
      const linked=api.data.exercises.filter(e=>graph.lessons[e.id].primary.includes(selected)||graph.lessons[e.id].context.includes(selected));
      let shown=0;
      for(const lesson of linked){
        const direct=graph.lessons[lesson.id].primary.includes(selected),stars=starsOf(records[lesson.id]?.stars);
        if(source!=='all'&&(lesson.book?.id||'legacy')!==source)continue;
        if(filter==='direct'&&!direct||filter==='unfinished'&&stars===3)continue;
        const b=button('',()=>api.openLesson(lesson.id),'skill-lesson');
        b.dataset.lesson=lesson.id;
        b.append(el('span',`Bài ${lesson.id} · ${lesson.title}`),el('small',`${direct?'Luyện trực tiếp':'Có vận dụng'} · ${sources[lesson.book?.id||'legacy']} · ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}`));list.append(b);shown++;
      }
      if(!shown)list.append(el('p','Chưa có bài phù hợp với bộ lọc này.','skill-empty'));
      $('skill-lesson-count').textContent=`${shown} bài phù hợp`;
      $('skill-songs').replaceChildren();
      for(const song of window.PIANO_SONGS){
        const binding=graph.songs[song.id];if(![...binding.primary,...binding.context].includes(selected))continue;
        const card=el('article',undefined,'skill-song');const missing=binding.requires.filter(id=>!state[id].hasFoundation);
        card.append(el('h3',song.title),el('p',`${core.songProgress(read('piano-songs-v1'))}/50 bước tự xác nhận · 47 ô nhịp`),el('p',missing.length?'Nền gợi ý: '+missing.map(id=>graph.nodes.find(n=>n.id===id).label).join(', '):'Đưa các kỹ năng vào một bài nhạc dài.'),button('Luyện bài hát →',()=>api.openSong(song.id)));$('skill-songs').append(card);
      }
      drawConnections();
    }
    for(const [key,label] of Object.entries(sources)){const option=el('option',label);option.value=key;$('skill-source').append(option);}
    $('skill-source').addEventListener('change',event=>{source=event.target.value;render();});
    $('skill-filter').addEventListener('change',event=>{filter=event.target.value;render();});
    window.addEventListener('piano-progress-changed',()=>{if(document.body.dataset.view==='skills')render();});
    window.addEventListener('storage',event=>{if(['piano-journey-v1','piano-songs-v1','piano-independence-done'].includes(event.key)&&document.body.dataset.view==='skills')render();});
    if(window.ResizeObserver)new ResizeObserver(drawConnections).observe($('skill-relations'));
    else window.addEventListener('resize',drawConnections);
    return {render,select(id){select(id,false)},showLesson(lesson){
      const binding=typeof lesson.id==='number'?graph.lessons[lesson.id]:graph.songs[lesson.id];
      $('lesson-skills').replaceChildren();
      for(const id of binding?.primary||[]){const node=graph.nodes.find(n=>n.id===id);$('lesson-skills').append(button(node.label+' ↗',()=>{select(id,false);api.navigate(id);}));}
    }};
  };
})();
