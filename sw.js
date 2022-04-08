
  importScripts('js/sw-acces.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';
const APP_SHELL = ["./","index.html","css/style.css","img/marketing.png","img/supervision.png","js/app.js","js/libs/jquery.js","pages/response.html","pages/ok.html"];
const APP_SHELL_INMUTABLE = ["https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css","https://fonts.googleapis.com/css?family=Quicksand:300,400",
"https://fonts.googleapis.com/css?family=Lato:400,300","https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css","http://www.w3.org/2000/svg"
];


self.addEventListener('install', event => {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHELL);
    });
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
        cache.addAll(APP_SHELL_INMUTABLE);
    });
    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});


self.addEventListener('activate', event => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(respuesta);
});


self.addEventListener('fetch', event => {
    const respuesta = caches.match(event.request).then(res => {
        if (res) { return res; } else {
            return fetch(event.request).then(newRes => {
                return actualizaCacheDinamico(DYNAMIC_CACHE, event.request, newRes);
            });
        }
    });

    event.respondWith(respuesta);
});