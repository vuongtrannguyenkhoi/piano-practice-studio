(() => {
 'use strict';
 const _t=globalThis.I18N?.t||((text,args)=>args?text.replace(/\{(\d+)\}/g,(m,i)=>args[i]):text);
 if(document.documentElement.dataset.pwaBuild!=='true')return;
 const base=new URL('./',document.baseURI),prefix='piano-'+base.pathname.replace(/\W/g,'_')+'-',audioCache=prefix+'audio-v1';
 const OFFERED='piano-pwa-offline-offered';
 const ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 // Install comes first: a button in the top bar on every screen. Where the browser offers an install prompt the button
 // opens it directly; otherwise (iOS, or the prompt was dismissed) it opens the panel with the steps. The panel also
 // holds the offline sound download and app updates.
 const entry=document.createElement('button');entry.id='pwa-entry';entry.type='button';entry.className='pwa-entry';
 const bar=document.querySelector('.topbar');bar?.insertBefore(entry,document.getElementById('language-switch'));
 const panel=document.createElement('dialog');panel.id='pwa-panel';panel.className='pwa-panel';panel.setAttribute('aria-labelledby','pwa-title');
 panel.innerHTML=_t("<h2 id=\"pwa-title\">Cài app &amp; luyện offline</h2><p>Cài app để mở nhanh từ màn hình chính, toàn màn hình, và luyện cả khi mất mạng. Bài học và bộ đàn gọn dùng được offline ngay sau lần mở đầu.</p><div class=\"pwa-actions\"><button id=\"pwa-install\" type=\"button\">Cài ứng dụng</button><button id=\"pwa-download\" type=\"button\" disabled>Tải âm để luyện offline</button><button id=\"pwa-cancel\" type=\"button\" hidden>Hủy tải</button><button id=\"pwa-update\" type=\"button\" hidden>Cập nhật ứng dụng</button></div><ol id=\"pwa-ios\" class=\"pwa-steps\" hidden><li>Bấm nút Chia sẻ (hình vuông có mũi tên lên) ở thanh Safari.</li><li>Chọn “Thêm vào Màn hình chính”.</li><li>Mở Piano Practice Studio từ biểu tượng mới.</li></ol><p id=\"pwa-status\" role=\"status\">Đang chuẩn bị chế độ offline…</p><progress id=\"pwa-progress\" hidden max=\"1\" value=\"0\" aria-label=\"Tiến độ tải âm offline\"></progress><p class=\"pwa-note\">Bộ đàn web đầy đủ khoảng 26 MB; nên tải khi có Wi-Fi.</p><button id=\"pwa-close\" type=\"button\" class=\"pwa-close\">Đóng</button>");
 document.body.append(panel);
 const $=id=>document.getElementById(id);let registration,prompt,abort,reloadRequested=false,hadController=!!navigator.serviceWorker?.controller,updateReady=false;
 const busy=()=>document.body.dataset.practicing==='true';
 const status=text=>{$('pwa-status').textContent=text;};
 const track=(name,params)=>window.pianoAnalytics?.track(name,params);
 const installed=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 const store={get:key=>{try{return localStorage.getItem(key);}catch(_){return null;}},set:(key,value)=>{try{localStorage.setItem(key,value);}catch(_){}}};
 function openPanel(){if(!panel.open){if(panel.showModal)panel.showModal();else panel.setAttribute('open','');}}
 function closePanel(){if(panel.open){if(panel.close)panel.close();else panel.removeAttribute('open');}}
 // The top-bar button: install until installed, then an update or offline entry.
 function render(){
  const isInstalled=installed();
  $('pwa-install').hidden=isInstalled;
  $('pwa-ios').hidden=isInstalled||!ios;
  entry.dataset.state=updateReady?'update':isInstalled?'offline':'install';
  entry.textContent=updateReady?_t('↻ Cập nhật'):isInstalled?_t('☁ Offline'):_t('⬇ Cài app');
  entry.setAttribute('aria-label',updateReady?_t('Có bản cập nhật · mở bảng cài app & offline'):isInstalled?_t('Luyện offline · tải âm và cập nhật'):_t('Cài app để luyện offline'));
 }
 async function install(){
  if(prompt){const current=prompt;prompt=null;track('pwa_install',{stage:'prompt'});await current.prompt();const choice=await current.userChoice;track('pwa_install',{stage:choice?.outcome==='accepted'?'accepted':'dismissed'});render();return choice?.outcome==='accepted';}
  track('pwa_install',{stage:'manual'});
  status(ios?_t('Trên iPhone/iPad: bấm Chia sẻ rồi “Thêm vào Màn hình chính”.'):_t('Mở menu trình duyệt và chọn “Cài ứng dụng” hoặc “Thêm vào màn hình chính”.'));
  openPanel();return false;
 }
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;render();});
 window.addEventListener('appinstalled',()=>{track('pwa_install',{stage:'installed'});prompt=null;render();status(_t('Đã cài ứng dụng. Mở Piano Practice Studio từ màn hình chính.'));});
 entry.addEventListener('click',async()=>{if(!installed()&&!updateReady&&prompt){await install();return;}openPanel();});
 $('pwa-install').onclick=install;
 $('pwa-close').onclick=closePanel;
 panel.addEventListener('click',event=>{if(event.target===panel)closePanel();});
 // A waiting worker is an update only when an older version already controls the page; on the very first install the
 // worker passes through 'waiting' on its way to active.
 const waiting=()=>{if(registration?.waiting&&navigator.serviceWorker.controller){updateReady=true;$('pwa-update').hidden=false;$('pwa-update').disabled=busy();$('pwa-update').textContent=busy()?_t('Có bản mới · kết thúc lượt tập để cập nhật'):_t('Cập nhật ứng dụng');render();}};
 new MutationObserver(waiting).observe(document.body,{attributes:true,attributeFilter:['data-practicing']});
 $('pwa-update').onclick=()=>{if(busy()){status(_t('Kết thúc lượt tập rồi cập nhật để giữ buổi luyện liên tục.'));return;}if(registration?.waiting){track('app_update',{stage:'applied'});reloadRequested=true;registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});}else location.reload();};
 navigator.serviceWorker?.addEventListener('message',event=>{if(event.data?.type==='CHECK_PRACTICE')event.ports[0]?.postMessage({busy:busy()});if(event.data?.type==='UPDATE_DEFERRED'){reloadRequested=false;status(_t('Có lượt tập đang chạy trong một tab khác. Kết thúc lượt đó rồi cập nhật.'));waiting();}});
 navigator.serviceWorker?.addEventListener('controllerchange',()=>{if(reloadRequested){reloadRequested=false;location.reload();}else if(hadController&&registration){updateReady=true;$('pwa-update').hidden=false;$('pwa-update').disabled=busy();$('pwa-update').textContent=_t('Áp dụng bản cập nhật');render();}hadController=true;});
 window.addEventListener('offline',()=>status(_t('Đang offline. Dùng bộ đàn gọn hoặc các mẫu âm đã tải; tiến độ vẫn lưu trên thiết bị.')));
 window.addEventListener('online',()=>{status(_t('Đã kết nối lại. Bạn có thể tải thêm âm hoặc kiểm tra cập nhật.'));registration?.update().catch(()=>{});});
 async function download(){
  abort=new AbortController();const signal=abort.signal;track('offline_download',{stage:'start'});$('pwa-download').disabled=true;$('pwa-cancel').hidden=false;$('pwa-progress').hidden=false;
  try{
   const response=await fetch(new URL('offline-audio.json?v=f7c5e8e-d256c112f5fe',base),{signal});if(!response.ok)throw Error(_t('Không tải được danh sách âm'));const bank=await response.json(),cache=await caches.open(audioCache);let done=0,next=0;
   $('pwa-progress').max=bank.files.length;
   const worker=async()=>{while(next<bank.files.length){if(signal.aborted)throw new DOMException('Canceled','AbortError');const file=bank.files[next++],url=new URL(file,base).href;if(!await cache.match(url)){const sound=await fetch(url,{signal});if(!sound.ok||sound.status===206)throw Error(_t('Thiếu mẫu âm'));await cache.put(url,sound);}done++;$('pwa-progress').value=done;status(_t("Đang lưu bộ đàn offline · {0}/{1} mẫu",[done,bank.files.length]));}};
   await Promise.all(Array.from({length:4},worker));track('offline_download',{stage:'complete',files:done});status(_t("Đã lưu đủ {0} mẫu. Bộ đàn web sẵn sàng luyện offline trên thiết bị này.",[done]));$('pwa-download').textContent=_t('Kiểm tra / bổ sung âm offline');
  }catch(error){abort.abort();track('offline_download',{stage:error.name==='AbortError'?'cancel':'fail'});status(error.name==='AbortError'?_t('Đã hủy tải. Các mẫu đã lưu vẫn dùng được; bấm tải để tiếp tục.'):_t('Chưa tải đủ bộ đàn. Kiểm tra mạng hoặc dung lượng và bấm tải lại. Các mẫu đã lưu vẫn được giữ.'));}
  finally{abort=null;$('pwa-download').disabled=false;$('pwa-cancel').hidden=true;}
 }
 $('pwa-download').onclick=download;$('pwa-cancel').onclick=()=>abort?.abort();render();
 if(!('serviceWorker' in navigator)||!isSecureContext){status(_t('Chế độ offline cần trình duyệt hỗ trợ và kết nối HTTPS.'));return;}
 (async()=>{try{
  registration=await navigator.serviceWorker.register(new URL('service-worker.js',base),{scope:base.pathname,updateViaCache:'none'});
  const watch=worker=>worker?.addEventListener('statechange',()=>{if(worker.state==='installed')waiting();});registration.addEventListener('updatefound',()=>watch(registration.installing));watch(registration.installing);
  await navigator.serviceWorker.ready;$('pwa-download').disabled=false;waiting();
  status(navigator.onLine?_t('Bài học và bộ đàn gọn đã sẵn sàng offline. Tải thêm âm web nếu cần.'):_t('Đang offline. Bài học và các âm đã lưu vẫn dùng được.'));
  // First launch from the home screen: offer the full sound download once.
  if(installed()&&!store.get(OFFERED)&&navigator.onLine){store.set(OFFERED,'1');status(_t('Đã cài app. Tải bộ đàn web (khoảng 26 MB) để luyện offline với đủ 8 lớp lực nhấn.'));openPanel();}
  registration.update().catch(()=>{});
 }catch(_){status(_t('Chưa chuẩn bị được chế độ offline. App vẫn dùng online; thử tải lại khi có mạng và dung lượng trống.'));}})();
})();
