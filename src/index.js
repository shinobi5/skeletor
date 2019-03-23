import Header from '/components/Header/Header.js';

// Registering service worker
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
};

// Register components
customElements.define('skl-header', Header);