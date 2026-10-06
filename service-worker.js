'use strict';
const VERSION="0a7152c-eae104bfb684",ASSETS=["adult-book-lessons.js", "adult-book2-lessons.js", "app.js", "assets/books/reading-bank.json", "assets/piano-polyphony-dictionary.json", "assets/pwa/icon-192.png", "assets/pwa/icon-512.png", "assets/salamander-samples.js", "assets/salamander-web/compare-phrase.json", "assets/salamander-web/manifest.json", "audio/chord-core.js", "audio/chord-verify-core.js", "audio/eval-worker.js", "audio/evaluation-core.js", "audio/mic-worklet.js", "audio/model-worker.js", "audio/pitch-core.js", "audio/pitch-worker.js", "audio/polyphony-core.js", "audio/score-model-core.js", "audio/sequence-core.js", "audio/take-worklet.js", "calibrate.html", "calibrate.js", "chords24-lessons.js", "compare-pianos.html", "composer.js", "data.js", "favicon.svg", "full-piano-audio.js", "index.html", "journey.js", "key-takes.js", "manifest.webmanifest", "mic-practice.js", "mic-tempo.js", "microphone.js", "offline-audio.json", "piano-audio.js", "pieces18-lessons.js", "pwa.css", "pwa.js", "reading-core.js", "reading-ui.css", "reading.js", "reference-ui.css", "skill-data.js", "skill-graph.js", "song-expression.js", "songs-data.js", "songs.js", "style.css", "vendor/salamander-manifest.json", "vendor/vcsl-keys-manifest.json", "vendor/vexflow-4.2.5.js", "web-piano-audio.js"];
const BASE=new URL(self.registration.scope),PREFIX='piano-'+BASE.pathname.replace(/\W/g,'_')+'-',SHELL=PREFIX+'shell-'+VERSION,AUDIO=PREFIX+'audio-v1';
const urlFor=path=>new URL(path,BASE).href;
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(SHELL);try{await cache.addAll(ASSETS.map(path=>new Request(urlFor(path),{cache:'reload'})));}catch(error){await caches.delete(SHELL);throw error;}})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const shells=(await caches.keys()).filter(key=>key.startsWith(PREFIX+'shell-')&&key!==SHELL);for(const name of shells.slice(0,-1))await caches.delete(name);await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data?.type!=='ACTIVATE_UPDATE')return;event.waitUntil((async()=>{
 const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
 const checks=await Promise.all(clients.map(client=>new Promise(resolve=>{const channel=new MessageChannel(),timer=setTimeout(()=>{channel.port1.close();resolve(true);},1500);channel.port1.onmessage=e=>{clearTimeout(timer);channel.port1.close();resolve(!!e.data?.busy);};client.postMessage({type:'CHECK_PRACTICE'},[channel.port2]);})));
 if(checks.some(Boolean)){event.source?.postMessage({type:'UPDATE_DEFERRED'});return;}await self.skipWaiting();
})());});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||url.pathname.includes('/api/')||request.headers.has('range'))return;
 if(url.pathname.endsWith('/service-worker.js'))return;
 event.respondWith((async()=>{
  const canonical=new URL(url.pathname,url.origin).href;
  if(url.pathname.endsWith('.mp3')&&url.pathname.includes('/assets/salamander-web/')){
   const cache=await caches.open(AUDIO),hit=await cache.match(canonical);if(hit)return hit;
   const response=await fetch(request);if(response.ok&&response.status!==206)await cache.put(canonical,response.clone());return response;
  }
  const wanted=request.mode==='navigate'?null:url.searchParams.get('v'),preferred=PREFIX+'shell-'+wanted;
  const cache=await caches.open(wanted&&await caches.has(preferred)?preferred:SHELL);
  const hit=await cache.match(url.pathname===BASE.pathname?urlFor('index.html'):canonical,{ignoreSearch:true});if(hit)return hit;
  // Do not cache errors, API replies, ZIP downloads, or user data.
  return fetch(request);
 })());
});
