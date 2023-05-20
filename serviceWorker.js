const staticChooseYourBooze = "choose-your-booze-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/wing.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticChooseYourBooze).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})