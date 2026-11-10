const CACHE_NAME = "card-ledger-app-v132";
const APP_SHELL = [
  "./",
  "./index.html",
  "./zh.html",
  "./styles.css",
  "./themes.css",
  "./advanced.css",
  "./set-catalog.js",
  "./card-selectors.js",
  "./hci-selection-catalog.js",
  "./app.js",
  "./advanced.js",
  "./library.js",
  "./subset-selectors.js",
  "./library.css",
  "./catalog.html",
  "./catalog.css",
  "./catalog-section.css",
  "./catalog-tools.css",
  "./catalog.js",
  "./concise-ui.css",
  "./vendor/qrcode.min.js",
  "./vendor/face-api/face-api.js",
  "./vendor/face-api/model/tiny_face_detector_model-weights_manifest.json",
  "./vendor/face-api/model/tiny_face_detector_model.bin",
  "./vendor/face-api/model/face_landmark_68_tiny_model-weights_manifest.json",
  "./vendor/face-api/model/face_landmark_68_tiny_model.bin",
  "./vendor/face-api/model/face_recognition_model-weights_manifest.json",
  "./vendor/face-api/model/face_recognition_model.bin",
  "./manifest.webmanifest",
  "./assets/card-ledger-hero.png",
  "./assets/stitch/collectors-league-logo.png",
  "./assets/app-icons/icon-192.png",
  "./assets/app-icons/icon-512.png",
  "./assets/app-icons/apple-touch-icon.png",
  "./assets/generated-brand/card-ledger-monogram-transparent.png",
  "./assets/generated-brand/category-search-transparent.png",
  "./assets/generated-brand/avatar-option-1.png",
  "./assets/generated-brand/avatar-option-2.png",
  "./assets/generated-brand/avatar-option-3.png",
  "./assets/generated-brand/avatar-option-4.png",
  "./assets/generated-brand/avatar-option-5.png",
  "./assets/generated-brand/avatar-option-6.png",
  "./assets/generated-brand/avatar-option-7.png",
  "./assets/generated-brand/avatar-option-8.png",
  "./assets/diy-players/stephen-curry.jpg",
  "./assets/diy-players/victor-wembanyama.jpg",
  "./assets/diy-players/lebron-james.jpg",
  "./assets/diy-players/kobe-bryant.jpg",
  "./assets/diy-players/lionel-messi.jpg",
  "./assets/diy-players/lamine-yamal.jpg",
  "./assets/diy-players/jude-bellingham.jpg",
  "./assets/diy-players/shohei-ohtani.jpg"
];
const NETWORK_FIRST_FILES = new Set(["", "index.html", "styles.css", "concise-ui.css", "library.js", "library.css", "set-catalog.js", "card-selectors.js", "app.js", "advanced.js", "manifest.webmanifest", "service-worker.js"]);

function shouldUseNetworkFirst(request) {
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  const file = url.pathname.split("/").pop() || "";
  return NETWORK_FIRST_FILES.has(file);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (shouldUseNetworkFirst(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
