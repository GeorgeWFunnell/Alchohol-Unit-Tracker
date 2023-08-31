// Registers the service worker
async function initServiceWorker() {
  try {
    await navigator.serviceWorker.register('./worker.js');
  } catch (e) {
    console.warn("Service Worker failed.  Falling back to 'online only'.", e);
  }
}

window.addEventListener('load', initServiceWorker);
