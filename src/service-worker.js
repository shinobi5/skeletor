/** 
 * using service workers:
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
 * */ 

// files to cache
const cacheName = 'skeletor';
const contentToCache = [
    '/',
    '/index.html',
    '/index.js',
	'/component-registry.js',
    '/styles.css',
    '/favicon.ico',
];

// installing service worker
self.addEventListener('install', event => {
    console.log('[Service Worker] Install');

    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );
});

// fetching content using service worker
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(resp => {
            console.log(`[Service Worker] Fetching resource: ${event.request.url}`);

            return resp || fetch(event.request).then(response => {
                return caches.open(cacheName).then(cache => {
                    console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
                    cache.put(event.request, response.clone());
                    return response;
                }).catch(() => {
                    return caches.match('/index.html');
                });
            });
        })
    );
});
