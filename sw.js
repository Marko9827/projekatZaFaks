
"use strict";
var app_v = "projekatzafaks_1.0.2";
var assets = ["/","/app/index.html","/app/favicon.svg","/app/access/css/main.css","/app/access/js/main.js","/app/access/img/pwa/ico192.png","/app/access/img/pwa/ico512.png"];


self.addEventListener("install", function(installEvent) {
    installEvent.waitUntil(
        caches.open(app_v).then(function(cache) {
            cache.addAll(assets);
        })
    );
});
self.addEventListener("active", function(event) {
    console.log("Service worker activate event!");
});
self.addEventListener("fetch", function(fetchEvent) {
     fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(function(res) {
            return res || fetch(fetchEvent.request);
        })
    );
});

self.addEventListener("sync", function (event) {
    if (event.tag === "persistToDatabase") {
        event.waitUntil(persistLocalChanges()
            .then(function() {
                self.registration.showNotification("Markdowns synced to server");
            })
            .catch(function() {
                console.log("Error syncing markdowns to server");
            })
        );
    }
});
