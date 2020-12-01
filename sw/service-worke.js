importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js'
)

workbox.skipWaiting()
workbox.clientsClaim()
workbox.setConfig({ debug: false })

workbox.routing.registerRoute(
  new RegExp('/roamAPI/*', 'i'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'API',
  })
)

workbox.routing.registerRoute(
  new RegExp('/static/images/.*/*.jpg', 'i'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'IMAGE',
  })
)

// workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
