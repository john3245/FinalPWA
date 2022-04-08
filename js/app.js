
var url = window.location.href; //obtenemos todo el url
var pwaLocation = '/FinalPWA/sw.js'; //path donde se encuentra el sw en GitHub
 
if(navigator.serviceWorker){
    console.log("Tienes serviceworker");
    if(url.includes('localhost')||url.includes('192.168.1.64')||url.includes('127.0.0.1') ){
        pwaLocation = '/sw.js';
    }
navigator.serviceWorker.register(pwaLocation);
}

self.addEventListener('install',event=>{
    console.log("Instalando service worker 2.3")
     registration.update();
    const descargasPendientes = new Promise((resolve, reject)=>{
      setTimeout(() => {
        console.log("Instalaciones descargadas.....");
        self.skipWaiting();
        resolve();
      }, 2000);
      
    })
  
    event.waitUntil(descargasPendientes);
  
  
  
    });
  
    self.addEventListener('activate',event=>{
      console.log("Activate service worker 2.3")
      });
      
    
    self.addEventListener('fetch',event=>{
        console.log("ServiceWorker:"+ event.request.url)
        });
  
  
        self.addEventListener('sync',event=>{
         console.log("se tiene conexión")
         console.log(event);
         console.log(event.tag)
  
          });
  