const CACHE_NAME = 'habits-tracker-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/js/components/habits_edit.js',
    '/js/components/render.js',
    '/js/components/storage_manager.js',
    '/js/components/habit.js',
    '/js/components/habit-form.js',
    '/js/components/number_input.js',
    '/js/components/accordion.js',
    '/js/components/main.js',
    '/manifest.json',
    '/css/main.css',
    '/css/components/habit-form.css',
    '/css/components/habit-card.css',
    '/css/components/accordion.css',
    '/css/components/number_input.css',
    '/css/components/menu.css',
    '/icons/icon-64x64.png',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
}); 