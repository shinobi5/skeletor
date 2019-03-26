
// Files to cache
const cacheName = 'skeletor-v1';
const contentToCache = [
    '/',
    '/index.html',
    '/index.js',
    '/styles.css',
    '/favicon.ico',
    '/icons/icon-32.png',
    '/icons/icon-64.png',
    '/icons/icon-96.png',
    '/icons/icon-128.png',
    '/icons/icon-168.png',
    '/icons/icon-192.png',
    '/icons/icon-256.png',
    '/icons/icon-512.png'
];

// Installing service worker
self.addEventListener('install', event => {
    console.log('[Service Worker] Install');

    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );
});

// Fetching content using service worker
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(r => {
            console.log(`[Service Worker] Fetching resource: ${event.request.url}`);

            return r || fetch(event.request).then(response => {
                return caches.open(cacheName).then(cache => {
                    console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});