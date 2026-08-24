// Minimal service worker: network-first for pages (fresh deploys win),
// cache-first for hashed assets and images (instant repeat scrolls).
const CACHE = 'thodasa-v3'

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))))
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (e.request.method !== 'GET') return

  // hashed build assets + product images: cache-first.
  //
  // The network leg used to be un-guarded: one dropped request on a flaky
  // mobile connection rejected the respondWith promise, and the browser
  // treated that as a hard load failure with no retry. For the stylesheet
  // that means an unstyled page for the whole visit — the DOM renders, the
  // JS runs, nothing is where it should be. Fall back to whatever is cached
  // and, failing that, let the browser make its own request.
  if (url.pathname.startsWith('/assets/') || url.hostname === 'images.unsplash.com') {
    e.respondWith(
      (async () => {
        const cache = await caches.open(CACHE)
        const hit = await cache.match(e.request)
        if (hit) return hit
        try {
          const res = await fetch(e.request)
          if (res.ok) cache.put(e.request, res.clone())
          return res
        } catch {
          return (await cache.match(e.request)) ?? fetch(e.request)
        }
      })(),
    )
    return
  }

  // navigations: network-first with cached fallback (offline still opens)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok) caches.open(CACHE).then((c) => c.put('/', res.clone()))
          return res
        })
        .catch(async () => (await caches.match('/')) ?? Response.error()),
    )
  }
})
