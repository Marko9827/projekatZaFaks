var express = require("express"),
    app = express(),
    open = require("open"),
    packageJSON = require('./package.json'),//JSON.parse('['+require('./package.json')+']'),
    path = require("path"),
    fs = require("fs"),
    port = process.env.PORT || 8080;


app.get("/app/", function (req, res) {
    //   res.sendFile(path.join(__dirname, "/index.html"));
    res.sendFile(path.join(__dirname, "/app/index.html"));
    console.log(req.url);
});

const files = [
    "/",
    "/app/index.html",
    "/app/favicon.svg",
    "/app/access/css/main.css",
    "/app/access/js/main.js",
    "/app/access/img/pwa/ico192.png",
    "/app/access/img/pwa/ico512.png"
];

try {
    const data = fs.writeFileSync('sw.js', `
"use strict";
var app_v = "${packageJSON.name}_${packageJSON.version}";
var assets = ${JSON.stringify(files)};


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
`);
    //file written successfully
} catch (err) {
    console.error(err);
}

try {
    const data = fs.writeFileSync('/manifest.json', `{
    "name": "${packageJSON.name}",
    "short_name":  "${packageJSON.name}",
    "description": "${packageJSON.description}",
    "start_url": "/?uwf=home",
    "orientation": "landscape-primary",
    "display": "minimal-ui",
    "background_color": "#ffffff",
    "theme_color": "#ffffff",
    "icons": [
        {
            "src": "/app/access/img/pwa/ico192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/app/access/img/pwa/ico512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "lang": "rs-RS",
    "status": "ok"
}`);
    //file written successfully
} catch (err) {
    console.error(err);
}


app.get("/app/manifest.json", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/manifest.json"));
    console.log(req.url);
});


app.get("/sw.js", function (req, res) {
    res.sendFile(path.join(__dirname, "/sw.js"));
    console.log(req.url);
});


app.get("/", function (req, res) {
    //   res.sendFile(path.join(__dirname, "/index.html"));
    res.sendFile(path.join(__dirname, "/index.html"));
    console.log(req.url);
});

app.get("*", function (req, res) {
    //   res.sendFile(path.join(__dirname, "/index.html"));
    res.sendFile(path.join(__dirname, req.url));
    console.log(req.url);
});


app.use(express.static("app"));
app.listen(port, function () {
    var lg = "",
        url = "http://localhost:" + port;
    open(url);
    console.log(url);
});
