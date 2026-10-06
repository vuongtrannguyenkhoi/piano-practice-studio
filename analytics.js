// Usage analytics (Google Analytics 4) for the public build.
// Inactive unless the build set a measurement id (<meta name="ga-id">, scripts/build-static.py --ga-id) and the
// learner agreed in the consent prompt. Google's script is only loaded after that agreement (basic consent mode).
// Only whitelisted events with short, enumerated values are sent: never audio, played notes or free text.
(()=>{
  'use strict';
  const id=document.querySelector('meta[name="ga-id"]')?.content||'';
  const CONSENT='piano-analytics-consent',OFFLINE='piano-analytics-offline';
  const version=(document.currentScript?.src.match(/[?&]v=([^&]+)/)||[])[1]||'dev';
  const store={
    get:key=>{try{return localStorage.getItem(key);}catch(_){return null;}},
    set:(key,value)=>{try{value===null?localStorage.removeItem(key):localStorage.setItem(key,value);}catch(_){}}
  };
  // Event name -> allowed parameters. Anything else is dropped before it reaches gtag.
  const EVENTS={
    page_view:['page_location','page_title','screen'],
    lesson_open:['lesson_id','collection','source'],
    song_open:['song_id','source'],
    practice_start:['content','lesson_id','mode','hand','tempo_bpm','bars','mic','engine'],
    practice_complete:['content','lesson_id','mode','hand','tempo_bpm','bars','result','accuracy_band','score_band'],
    star_earned:['lesson_id','collection','stars','tempo_bpm'],
    offline_usage:['practice_starts'],
    app_error:['where','message'],
    analytics_consent:['choice']
  };
  let consent=store.get(CONSENT),loaded=false,lastPath=null,lastScreen='direct',settle=0,errors=0;

  function clean(params){
    const out={};
    for(const [key,value] of Object.entries(params||{})){
      if(value===undefined||value===null||value==='')continue;
      out[key]=typeof value==='number'?Math.round(value*100)/100:typeof value==='boolean'?(value?'yes':'no'):String(value).slice(0,100);
    }
    return out;
  }
  function load(){
    if(loaded||!id)return;loaded=true;
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};
    gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    gtag('js',new Date());
    gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,app_version:version});
    gtag('set','user_properties',{display_mode:matchMedia('(display-mode: standalone)').matches?'installed':'browser',app_version:version});
    const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    document.head.append(script);
  }
  function track(name,params){
    if(name==='practice_start'&&!navigator.onLine)store.set(OFFLINE,String((Number(store.get(OFFLINE))||0)+1));
    if(!id||consent!=='granted'||!EVENTS[name])return;
    load();
    const allowed=EVENTS[name],picked={};
    for(const key of allowed)if(params&&key in params)picked[key]=params[key];
    gtag('event',name,{...clean(picked),app_version:version});
  }

  // Page views: the app is one page with hash routes (#bai-5, #doc-nhac/tap). Each route that stays for
  // 400 ms becomes a virtual page /bai-5, /doc-nhac/tap; transient routes during start-up are not counted.
  const screenOf=path=>/^\/bai-\d+/.test(path)||/^\/nhac-/.test(path)||path==='/doc-nhac/tap'?'practice':(path.split('/')[1]||'home');
  function route(){
    const path='/'+(location.hash.slice(1)||'');
    if(path===lastPath)return;
    const previous=lastScreen;lastPath=path;lastScreen=screenOf(path);
    const base=location.origin+location.pathname.replace(/\/[^/]*$/,'');
    const title=lastScreen==='practice'?document.getElementById('lesson-title')?.textContent:document.getElementById('view-label')?.textContent;
    track('page_view',{page_location:base+path,page_title:title||document.title,screen:lastScreen});
    const lesson=path.match(/^\/bai-(\d+)$/);
    if(lesson){const n=Number(lesson[1]),e=window.DATA?.exercises?.[n-1];track('lesson_open',{lesson_id:n,collection:e?.book?.id||'core',source:previous});}
    const song=path.match(/^\/nhac-(.+)$/);
    if(song)track('song_open',{song_id:song[1],source:previous});
  }
  const schedule=()=>{clearTimeout(settle);settle=setTimeout(route,400);};
  for(const method of ['pushState','replaceState']){
    const original=history[method];
    history[method]=function(...args){const result=original.apply(this,args);schedule();return result;};
  }
  addEventListener('hashchange',schedule);

  // Errors: file and line only, message without URLs; at most five per page load.
  function reportError(where,message){
    if(errors++>=5)return;
    track('app_error',{where,message:String(message||'').replace(/https?:\/\/\S+/g,'').slice(0,90)});
  }
  addEventListener('error',event=>reportError(`${(event.filename||'').split('/').pop().split('?')[0]}:${event.lineno||0}`,event.message));
  addEventListener('unhandledrejection',event=>reportError('promise',event.reason?.message||event.reason));

  // Consent: a short prompt on first visit; the choice can be changed from the Today screen.
  function choose(choice){
    consent=choice;store.set(CONSENT,choice);
    document.querySelector('.analytics-consent')?.remove();renderChoice();
    if(choice==='granted'){track('analytics_consent',{choice});lastPath=null;route();flushOffline();}
  }
  function prompt(){
    if(document.querySelector('.analytics-consent'))return;
    const box=document.createElement('section');box.className='analytics-consent';box.setAttribute('aria-label','Thống kê sử dụng');
    box.innerHTML='<p><strong>Cho phép thống kê ẩn danh?</strong> Giúp biết bài nào khó, chế độ nào hữu ích để cải thiện app. Dùng Google Analytics; không gửi âm thanh micro, nốt bạn chơi hay thông tin cá nhân.</p><div><button type="button" data-choice="granted">Đồng ý</button><button type="button" data-choice="denied">Không</button></div>';
    box.addEventListener('click',event=>{const choice=event.target.closest('[data-choice]')?.dataset.choice;if(choice)choose(choice);});
    document.body.append(box);
  }
  function renderChoice(){
    const host=document.getElementById('today-view');if(!host)return;
    let line=host.querySelector('.analytics-choice');
    if(!line){line=document.createElement('p');line.className='analytics-choice';host.append(line);}
    const on=consent==='granted';
    line.replaceChildren(`Thống kê ẩn danh: ${on?'đang bật':'đang tắt'} · `);
    const button=document.createElement('button');button.type='button';button.textContent=on?'Tắt':'Bật';
    button.addEventListener('click',()=>choose(on?'denied':'granted'));line.append(button);
  }
  function flushOffline(){
    const count=Number(store.get(OFFLINE))||0;
    if(count&&navigator.onLine){track('offline_usage',{practice_starts:count});store.set(OFFLINE,null);}
  }

  window.pianoAnalytics={track,enabled:()=>!!id&&consent==='granted',consent:()=>consent,choose};
  if(!id)return;
  const ready=()=>{
    renderChoice();
    if(consent==='granted'){schedule();flushOffline();}else if(consent!=='denied')prompt();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
  addEventListener('online',flushOffline);
})();
