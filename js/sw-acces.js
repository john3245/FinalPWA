function actualizaCacheDinamico(dynamicCache, request, response) {
    if (response.ok) {
        //la respuesta tiene data y se debe almacaenar en cache
        return caches.open(dynamicCache).then(cache => {
            cache.put(request, response.clone());
            return cache.clone();
        });
    } else { //si no viene nada en la respuesta
        return response;
    }
}