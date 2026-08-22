// Minimal service worker: network-first for pages (fresh deploys win),
// cache-first for hashed assets and images (instant repeat scrolls).
const CACHE = 'thodasa-v2'

self.addEventListener('install', (e) => {
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))))
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (e.request.method !== 'GET') return

  // hashed build assets + product images: cache-first
  if (url.pathname.startsWith('/assets/') || url.hostname === 'images.unsplash.com') {
    e.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const hit = await cache.match(e.request)
        if (hit) return hit
        const res = await fetch(e.request)
        if (res.ok) cache.put(e.request, res.clone())
        return res
      }),
    )
    return
  }

  // navigations: network-first with cached fallback (offline still opens)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          caches.open(CACHE).then((c) => c.put('/', res.clone()))
          return res
        })
        .catch(() => caches.match('/')),
    )
  }
})
