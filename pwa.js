(() => {
 'use strict';
 if(document.documentElement.dataset.pwaBuild!=='true')return;
 const base=new URL('./',document.baseURI),prefix='piano-'+base.pathname.replace(/\W/g,'_')+'-',audioCache=prefix+'audio-v1';
 const section=document.createElement('section');section.className='pwa-card';section.setAttribute('aria-labelledby','pwa-title');
 section.innerHTML=`<h2 id="pwa-title">Cài app &amp; luyện offline</h2><p>Bài học và bộ đàn gọn dùng được offline sau lần nạp đầu. Tải thêm bộ đàn web để nghe đủ 8 lớp lực nhấn khi mất mạng.</p><div class="pwa-actions"><button id="pwa-install" type="button">Cài ứng dụng</button><button id="pwa-download" type="button" disabled>Tải âm để luyện offline</button><button id="pwa-cancel" type="button" hidden>Hủy tải</button><button id="pwa-update" type="button" hidden>Cập nhật ứng dụng</button></div><p id="pwa-status" role="status">Đang chuẩn bị chế độ offline…</p><progress id="pwa-progress" hidden max="1" value="0" aria-label="Tiến độ tải âm offline"></progress>`;
 document.querySelector('#today-view .page-heading').after(section);
 const $=id=>document.getElementById(id);let registration,prompt,abort,reloadRequested=false,hadController=!!navigator.serviceWorker?.controller;
 const busy=()=>document.body.dataset.practicing==='true';
 const status=text=>{$('pwa-status').textContent=text;};
 const installed=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 function installState(){if(installed()){$('pwa-install').hidden=true;}else $('pwa-install').hidden=false;}
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;installState();});window.addEventListener('appinstalled',()=>{prompt=null;installState();status('Đã cài ứng dụng. Mở Piano Practice Studio từ màn hình chính.');});
 $('pwa-install').onclick=async()=>{if(prompt){const current=prompt;prompt=null;await current.prompt();await current.userChoice;installState();}else status('Mở menu trình duyệt và chọn “Cài ứng dụng” hoặc “Thêm vào màn hình chính”.');};
 const waiting=()=>{if(registration?.waiting){$('pwa-update').hidden=false;$('pwa-update').disabled=busy();$('pwa-update').textContent=busy()?'Có bản mới · kết thúc lượt tập để cập nhật':'Cập nhật ứng dụng';}};
 new MutationObserver(waiting).observe(document.body,{attributes:true,attributeFilter:['data-practicing']});
 $('pwa-update').onclick=()=>{if(busy()){status('Kết thúc lượt tập rồi cập nhật để giữ buổi luyện liên tục.');return;}if(registration?.waiting){reloadRequested=true;registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});}else location.reload();};
 navigator.serviceWorker?.addEventListener('message',event=>{if(event.data?.type==='CHECK_PRACTICE')event.ports[0]?.postMessage({busy:busy()});if(event.data?.type==='UPDATE_DEFERRED'){reloadRequested=false;status('Có lượt tập đang chạy trong một tab khác. Kết thúc lượt đó rồi cập nhật.');waiting();}});
 navigator.serviceWorker?.addEventListener('controllerchange',()=>{if(reloadRequested){reloadRequested=false;location.reload();}else if(hadController&&registration){$('pwa-update').hidden=false;$('pwa-update').disabled=busy();$('pwa-update').textContent='Áp dụng bản cập nhật';}hadController=true;});
 window.addEventListener('offline',()=>status('Đang offline. Dùng bộ đàn gọn hoặc các mẫu âm đã tải; tiến độ vẫn lưu trên thiết bị.'));
 window.addEventListener('online',()=>{status('Đã kết nối lại. Bạn có thể tải thêm âm hoặc kiểm tra cập nhật.');registration?.update().catch(()=>{});});
 async function download(){
  abort=new AbortController();const signal=abort.signal;$('pwa-download').disabled=true;$('pwa-cancel').hidden=false;$('pwa-progress').hidden=false;
  try{
   const response=await fetch(new URL('offline-audio.json?v=0a7152c-703037b64d94',base),{signal});if(!response.ok)throw Error('Không tải được danh sách âm');const bank=await response.json(),cache=await caches.open(audioCache);let done=0,next=0;
   $('pwa-progress').max=bank.files.length;
   const worker=async()=>{while(next<bank.files.length){if(signal.aborted)throw new DOMException('Canceled','AbortError');const file=bank.files[next++],url=new URL(file,base).href;if(!await cache.match(url)){const sound=await fetch(url,{signal});if(!sound.ok||sound.status===206)throw Error('Thiếu mẫu âm');await cache.put(url,sound);}done++;$('pwa-progress').value=done;status(`Đang lưu bộ đàn offline · ${done}/${bank.files.length} mẫu`);}};
   await Promise.all(Array.from({length:4},worker));status(`Đã lưu đủ ${done} mẫu. Bộ đàn web sẵn sàng luyện offline trên thiết bị này.`);$('pwa-download').textContent='Kiểm tra / bổ sung âm offline';
  }catch(error){abort.abort();status(error.name==='AbortError'?'Đã hủy tải. Các mẫu đã lưu vẫn dùng được; bấm tải để tiếp tục.':'Chưa tải đủ bộ đàn. Kiểm tra mạng hoặc dung lượng và bấm tải lại. Các mẫu đã lưu vẫn được giữ.');}
  finally{abort=null;$('pwa-download').disabled=false;$('pwa-cancel').hidden=true;}
 }
 $('pwa-download').onclick=download;$('pwa-cancel').onclick=()=>abort?.abort();installState();
 if(!('serviceWorker' in navigator)||!isSecureContext){status('Chế độ offline cần trình duyệt hỗ trợ và kết nối HTTPS.');return;}
 (async()=>{try{
  registration=await navigator.serviceWorker.register(new URL('service-worker.js',base),{scope:base.pathname,updateViaCache:'none'});
  const track=worker=>worker?.addEventListener('statechange',()=>{if(worker.state==='installed')waiting();});registration.addEventListener('updatefound',()=>track(registration.installing));track(registration.installing);
  await navigator.serviceWorker.ready;$('pwa-download').disabled=false;waiting();
  status(navigator.onLine?'Bài học và bộ đàn gọn đã sẵn sàng offline. Tải thêm âm web nếu cần.':'Đang offline. Bài học và các âm đã lưu vẫn dùng được.');
  registration.update().catch(()=>{});
 }catch(_){status('Chưa chuẩn bị được chế độ offline. App vẫn dùng online; thử tải lại khi có mạng và dung lượng trống.');}})();
})();
