const V='ra-v1',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
const HOSTS=['cdnjs.cloudflare.com','cdn.jsdelivr.net','esm.sh'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url),same=u.origin===location.origin;
 if(r.method!=='GET'||(!same&&!HOSTS.includes(u.hostname)))return;
 const keep=res=>{if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res};
 e.respondWith(same?fetch(r).then(keep).catch(()=>caches.match(r)):caches.match(r).then(h=>h||fetch(r).then(keep)));
});
