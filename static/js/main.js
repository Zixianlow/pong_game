import { Router } from './router/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');
    console.log('app', app);
    new Router(app);
});

