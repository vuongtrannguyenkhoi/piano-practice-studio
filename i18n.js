// Interface language. Vietnamese is the source language: other languages are dictionaries keyed by the
// Vietnamese text (i18n/en-*.js, loaded before this file). Static page text is translated once here; scripts call
// I18N.t (as _t) for the text they build, with {0}, {1}… placeholders for values.
// The choice is stored per browser; ?lang=en or ?lang=vi in the address sets it too. Default: Vietnamese.
(()=>{
  'use strict';
  const LANGUAGES={vi:'Tiếng Việt',en:'English'},KEY='piano-lang';
  const VI=/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  const store={
    get(){try{return localStorage.getItem(KEY);}catch(_){return null;}},
    set(value){try{localStorage.setItem(KEY,value);}catch(_){}}
  };
  const param=new URLSearchParams(location.search).get('lang');
  if(LANGUAGES[param])store.set(param);
  const chosen=LANGUAGES[param]?param:store.get();
  const lang=LANGUAGES[chosen]?chosen:'vi';
  const dict=lang==='vi'?null:(window.I18N_STRINGS?.[lang]||{});
  const missing=new Set();

  function t(text,args){
    let out=text;
    if(dict&&typeof text==='string'){
      const hit=dict[text];
      if(hit!==undefined)out=hit;else if(VI.test(text))missing.add(text);
    }
    return args?String(out).replace(/\{(\d+)\}/g,(m,i)=>args[i]??''):out;
  }
  // Translate one piece of static text, keeping its surrounding white space.
  function swap(text){
    const key=text.trim();if(!key)return text;
    const hit=dict[key];
    if(hit===undefined){if(VI.test(key))missing.add(key);return text;}
    return text.slice(0,text.indexOf(key))+hit+text.slice(text.indexOf(key)+key.length);
  }
  const ATTRIBUTES=['aria-label','title','placeholder','alt'];
  function apply(root=document.body){
    if(!dict||!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:node=>/^(SCRIPT|STYLE)$/.test(node.parentNode?.nodeName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
    for(let node=walker.nextNode();node;node=walker.nextNode()){const next=swap(node.nodeValue);if(next!==node.nodeValue)node.nodeValue=next;}
    const elements=root.querySelectorAll?[root,...root.querySelectorAll('*')]:[];
    for(const element of elements)for(const name of ATTRIBUTES){
      const value=element.getAttribute?.(name);if(value){const next=swap(value);if(next!==value)element.setAttribute(name,next);}
    }
  }
  // Lesson data (data.js, *-lessons.js, skill-data.js, songs-data.js) is written in Vietnamese: swap every string
  // that has a translation, in place, before the app reads it (i18n-data.js).
  function translateData(value){
    if(!dict||!value||typeof value!=='object')return value;
    const entries=Array.isArray(value)?value.entries():Object.entries(value);
    for(const [key,item] of entries){
      if(typeof item==='string'){const hit=dict[item];if(hit!==undefined)value[key]=hit;else if(VI.test(item))missing.add(item);}
      else if(item&&typeof item==='object')translateData(item);
    }
    return value;
  }
  function choose(next){
    if(!LANGUAGES[next]||next===lang)return;
    store.set(next);
    // Reload to apply it; a URL that differs only by its hash would not reload, so reload explicitly.
    const url=new URL(location.href);url.searchParams.delete('lang');
    if(url.href===location.href)location.reload();else location.replace(url.href);
  }
  // A small switch in the top bar: shows the other language.
  function addSwitch(){
    const bar=document.querySelector('.topbar');if(!bar||document.getElementById('language-switch'))return;
    const other=lang==='vi'?'en':'vi',button=document.createElement('button');
    button.id='language-switch';button.type='button';button.className='language-switch';button.lang=other;
    button.textContent=other.toUpperCase();
    button.setAttribute('aria-label',other==='en'?'Switch to English':'Chuyển sang tiếng Việt');button.title=LANGUAGES[other];
    button.addEventListener('click',()=>choose(other));
    bar.append(button);
  }

  window.I18N={lang,languages:LANGUAGES,t,apply,choose,translateData,missing:()=>[...missing]};
  document.documentElement.lang=lang;
  if(dict){
    document.title=t(document.title);
    const description=document.querySelector('meta[name="description"]');
    if(description)description.content=t(description.content);
  }
  const ready=()=>{apply();addSwitch();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
