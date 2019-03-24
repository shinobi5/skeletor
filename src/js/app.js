import Header from './components/Header/Header.js';

// Register components
customElements.define('skl-header', Header);

// Register service worker
if('serviceWorker' in navigator) {
    console.log("Service Worker");
    // navigator.serviceWorker.register('service-worker.js');
};