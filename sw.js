const version = "2021.05.16";
const currentVersion = 13;
var cacheName = `binarypuzzle-${version}`;

if (self.navigator.onLine) { // Update cache if online
    fetch("https://api.github.com/repos/aiden2480/binary-puzzle/commits").then((resp) => {
        resp.json().then((data) => {
            self.cacheName = `binarypuzzle-${data[0]["sha"].slice(0, 7)}`;
        })
    })
}

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

                if ((i + 1) >= 3) { // This was the version css/js files were added
                    clist.push(`js/puz1${cver}.js`);
                    clist.push(`css/puz1${cver}.css`);
                }
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
