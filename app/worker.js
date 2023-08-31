// Sets up files to be cached
const CACHE = 'unit_tracker';
const FILES = [
  './',
  './index.html',
  './index.js',
  './worker.js',
  './stylesheet.css',
  './app.webmanifest',
  './i/logo.png',
  './database.js',
  './template_loading.js',
];

// Fetches page from cache if it exists
async function fetchFromCache(request) {
  const cache = await caches.open('unit_tracker');
  const data = await cache.match(request);
  if (data) {
    return data;
  } else {
    // Fetches request normally and adds to cache
    await cache.add(request);
    return cache.match(request);
  }
}

// intercepts fetch requests to check cache first
function interceptFetch(e) {
  e.respondWith(fetchFromCache(e.request));
}

// Pre caches base files
async function installServiceWorker() {
  try {
    const c = await caches.open(CACHE);
    await c.addAll(FILES);
    console.log('Cache is primed.');
  } catch (e) {
    console.warn("Priming cache failed.  Falling back to 'online only'.", e);
  }
}

self.addEventListener('install', installServiceWorker);
self.addEventListener('fetch', interceptFetch);
