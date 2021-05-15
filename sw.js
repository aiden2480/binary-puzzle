const version = "1.14.2";
const cacheName = `binarypuzzle-${version}`;
const currentVersion = 14;

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            let clist = [
                "index.html", "latest.html",
                "images/22a-2D_arrays.png",
                "images/22b-DataTypes.png",
                "images/22c-StructureChart.png",
                "images/22d-MainAlgorithm.png",
                "images/22e-reusableCode.png",
                "images/22fi-SolveRowPairs-DeskCheck.png",
                "images/22fii-Lines6and7.png",
                "images/22Gi-writeAlgorithm.png",
                "images/22Gii-driverForTesting.png",
                "images/appleicon.png",
                "images/22_QuestionSetup.png",
                "images/binarypuzzle.png",
                "images/keyframes.gif",
                "images/techEdIcon.png",
            ];
            
            for (let i = 0; i < currentVersion; i++) {
                let cver = String(i + 1).padStart(2, "0");
                clist.push(`puz1${cver}.html`);
                clist.push(`js/puz1${cver}.js`);
                clist.push(`css/puz1${cver}.css`);
            }

            return cache.addAll(clist).then(() => self.skipWaiting());
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(event.request, {ignoreSearch: true}))
        .then(response => {
            return response || fetch(event.request);
        })
    );
});
