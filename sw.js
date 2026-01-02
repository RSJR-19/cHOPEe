const CACHE_NAME = 'cHOPEe-v2';

const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./logo_icon.png",
    "./logo_icon_bnw.png",
    './Empty_Cup.svg',
    './Filled_cup.svg',
    './full-bnw.svg',
    './full-colored.svg',
    './manifest.json',
    './cafe_bgm.mp3',
    './click.mp3',
    './order.mp3',
    './pour.mp3',
    './quotes.js',
    './short.svg',
    './Plate.svg'
]

self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>{
            console.log('success')
            return cache.addAll(ASSETS_TO_CACHE);
        }))})

self.addEventListener('activate', event=>{
    event.waitUntil(
        caches.keys().then(keys =>{
            return Promise.all(
                keys.map(key =>{
                    if (key !== CACHE_NAME){
                        return caches.delete(key);
                    }}))}))});

self.addEventListener('fetch', event =>{
    event.respondWith(
        caches.match(event.request).then(response =>{
            return response || fetch(event.request);
        }))})