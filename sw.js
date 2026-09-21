/**
 * Progressive Web App Service Worker (sw.js) - Version 2.0.0
 * Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools
 * 
 * Provides 100% offline field operation on rural Rio Grande Valley schoolyards
 * without cellular or Wi-Fi connectivity.
 * Implements Cache-First / Stale-While-Revalidate strategy for static assets,
 * local datasets, and pre-caches critical mapping & visualization CDN libraries.
 */

'use strict';

const CACHE_VERSION = 'ttfs-cool-schools-v2.0.0';
const STATIC_CACHE = `ttfs-static-${CACHE_VERSION}`;
const DATA_CACHE = `ttfs-data-${CACHE_VERSION}`;
const CDN_CACHE = `ttfs-cdn-${CACHE_VERSION}`;

// 1. Core Static Application Shell
const CORE_APP_SHELL = [
  './',
  './index.html',
  './index.css',
  './index.js',
  './style.css',
  './config.js',
  './manifest.json',
  './sw-register.js',
  './itree_engine.js',
  './donors_data.js',
  './rgv_archive_data.js',
  './photo_data.js',
  './agriculture_physics_data.js',
  './racelis_network_data.js',
  
  // Dashboard v2 Portals & Curriculums
  './teks_lesson_plans.html',
  './teks_lesson_plans.css',
  './teks_lesson_plans.js',
  './sponsorship_portal.html',
  './sponsorship_portal.css',
  './sponsorship_portal.js',
  './itree_ledger.html',
  './schoolyard_planner.html',
  './schoolyard_planner.css',
  './schoolyard_planner.js',
  './solar_shade_calculator.html',
  './canopy.html',
  './canopy.js',
  './biodiversity.html',
  './biodiversity.js',
  './albedo.html',
  './albedo.js',
  './surface_area.html',
  './temperature.html',
  './temperature.js',
  './tree_diary.html',
  './tree_diary.css',
  './tree_diary.js',
  './campus_quests.html',
  './time_machine.html',
  './utrgv_campus.html',
  './utrgv_campus.css',
  './utrgv_campus.js',
  './campuses.html',
  './campuses.css',
  './campuses.js',
  './dashboard_map.html',
  './tree_3d.html',
  './tree_3d.css',
  './tree_3d.js',
  './campus_3d.html',
  './campus_3d.css',
  './campus_3d.js',
  './protocols.html',
  './protocols.css',
  './protocols.js',
  './maintenance.html',
  './maintenance.css',
  './maintenance.js',
  './economics.html',
  './economics.css',
  './economics.js',
  './trails.html',
  './trails.css',
  './trails.js',
  './wind.html',
  './wind.js',
  './soil_moisture.html',
  './soil_moisture.css',
  './soil_moisture.js',
  './water_table.html',
  './water_table.css',
  './water_table.js',
  './soil_types.html',
  './soil_types.css',
  './soil_types.js',
  './district_comparison.html',
  './district_comparison.css',
  './district_comparison.js',
  './photo_wall.html',
  './photo_wall.css',
  './photo_wall.js',
  './user_access_strategy.html',
  './biodiversity_analog_concept.html',
  './biodiversity_analog_concept.css',
  './biodiversity_analog_concept.js',
  './rivas_tree_roster.html',
  './rivas_tree_roster.css',
  './rivas_tree_roster.js',
  './data_pipeline.html',
  './data_pipeline.css',
  './data_pipeline.js',
  './Month_1_HeatMap_Summary.html',
  './zoning.html',
  './zoning.css',
  './milestones.html',
  './milestones.css',
  './milestones.js',
  './portals/v5/index.html',
  './portals/v5/portal.css',
  './portals/v5/portal.js',
  './portals/v3/portal_v3_concept_a_scroll.html',
  './portals/v4/portal_v4_concept_a.html',
  './portals/v4/portal_v4_concept_b.html',

  // Campus Profiles
  './donna_rivas.html',
  './donna_garza.html',
  './donna_jw_caceres.html',
  './donna_ochoa.html',
  './donna_salinas.html',
  './donna_singleterry.html',
  './donna_solis.html',
  './donna_stainke.html',
  './mercedes_academy.html',
  './mercedes_chacon.html',
  './mercedes_harrell.html',
  './mercedes_high.html',
  './mercedes_hinojosa.html',
  './mercedes_travis.html',
  './school.html',
  './school.js'
];

// 2. Local GeoJSON, Zone & Inventory Datasets
const LOCAL_DATASETS = [
  './data/campus_summaries.csv',
  './data/campus_zones.json',
  './data/campus_boundary.json',
  './data/jason_m_rivas_zones.json',
  './data/jason_m_rivas_zones_data.js',
  './data/mock_trees.json',
  './data/mock_trees_data.js',
  './data/mock_biodiversity.json',
  './data/mock_biodiversity_data.js',
  './data/mock_observations.json',
  './data/mock_observations_data.js',
  './data/mock_students.json',
  './data/mock_trails.json',
  './data/heat_attendance_metrics.json',
  './data/local_attendance_rates.csv',
  './data/rgv_plant_palette.js',
  './data/landscape_designer_cases.js'
];

// 3. Local Media Assets & Species Artwork
const LOCAL_ASSETS = [
  './assets/utrgv-agroecology.png',
  './assets/texas-trees-foundation.png',
  './assets/rgv_watercolor_map.jpg',
  './assets/baseline_field.png',
  './assets/live_oak_leaf.jpg',
  './assets/mesquite_leaf.jpg',
  './assets/cedar_elm_leaf.jpg',
  './assets/photo_sapling.jpg',
  './assets/photo_butterfly.jpg',
  './assets/photo_gecko.jpg',
  './assets/realistic_thornscrub.jpg',
  './assets/year_1_saplings.png',
  './assets/year_5_canopy.png',
  './assets/year_10_mature.png'
];

// 4. Core CDN Dependencies (ArcGIS JS API, D3, Chart.js, Three.js, Leaflet)
const CDN_DEPENDENCIES = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://d3js.org/d3.v7.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  'https://js.arcgis.com/4.29/',
  'https://js.arcgis.com/4.29/esri/themes/light/main.css',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap'
];

/**
 * Safely cache a collection of items using Promise.allSettled
 * so a single missing asset or CDN CORS block never fails installation.
 */
async function safeCacheAdd(cacheName, urlList) {
  const cache = await caches.open(cacheName);
  const results = await Promise.allSettled(
    urlList.map(async (url) => {
      try {
        const req = new Request(url, { mode: url.startsWith('http') ? 'cors' : 'same-origin' });
        const res = await fetch(req);
        if (res.ok || res.type === 'opaque') {
          await cache.put(req, res);
        }
      } catch (err) {
        // Fallback or ignore non-critical offline fetch hiccups
        console.warn(`[SW Precache Non-Fatal] ${url}:`, err.message);
      }
    })
  );
  return results;
}

// --------------------------------------------------------------------------
// Lifecycle: Install
// --------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  console.log(`[ServiceWorker ${CACHE_VERSION}] Installing & Pre-caching Core Field Assets...`);
  self.skipWaiting();

  event.waitUntil(
    Promise.all([
      safeCacheAdd(STATIC_CACHE, [...CORE_APP_SHELL, ...LOCAL_ASSETS]),
      safeCacheAdd(DATA_CACHE, LOCAL_DATASETS),
      safeCacheAdd(CDN_CACHE, CDN_DEPENDENCIES)
    ]).then(() => {
      console.log(`[ServiceWorker ${CACHE_VERSION}] Pre-caching complete. Offline field mode ready.`);
    })
  );
});

// --------------------------------------------------------------------------
// Lifecycle: Activate & Cache Invalidation
// --------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  console.log(`[ServiceWorker ${CACHE_VERSION}] Activating & claiming clients...`);
  const currentCaches = [STATIC_CACHE, DATA_CACHE, CDN_CACHE];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (!currentCaches.includes(key)) {
            console.log(`[ServiceWorker] Purging legacy cache: ${key}`);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// --------------------------------------------------------------------------
// Fetch Handler: Cache-First with Stale-While-Revalidate Fallback
// --------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only intercept GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Strategy 1: CDN Dependencies & Static Assets -> Cache First, Background Update
  if (
    url.origin.includes('unpkg.com') ||
    url.origin.includes('jsdelivr.net') ||
    url.origin.includes('cloudflare.com') ||
    url.origin.includes('arcgis.com') ||
    url.origin.includes('googleapis.com') ||
    url.origin.includes('gstatic.com') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.json') ||
    url.pathname.endsWith('.geojson') ||
    url.pathname.endsWith('.csv')
  ) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
        // Return cached immediately if available
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              const targetCache = url.origin === self.location.origin ? (url.pathname.includes('/data/') ? DATA_CACHE : STATIC_CACHE) : CDN_CACHE;
              caches.open(targetCache).then((cache) => cache.put(request, networkResponse.clone()));
            }
            return networkResponse;
          })
          .catch(() => {
            // Offline - network failed, already handled by cachedResponse if present
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Strategy 2: HTML Page Navigation -> Stale-While-Revalidate with Portal Fallback
  if (request.mode === 'navigate' || (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then((cachedPage) => {
        const networkFetch = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, networkResponse.clone()));
            }
            return networkResponse;
          })
          .catch(async () => {
            // If completely offline and page not in cache, fallback to index
            if (cachedPage) return cachedPage;
            const rootFallback = await caches.match('./index.html');
            if (rootFallback) return rootFallback;
            return caches.match('./portals/v5/index.html');
          });

        return cachedPage || networkFetch;
      })
    );
    return;
  }

  // Strategy 3: Default Handler (Cache match -> Network fetch -> Cache clone)
  event.respondWith(
    caches.match(request).then((cached) => {
      return cached || fetch(request).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, networkRes.clone()));
        }
        return networkRes;
      }).catch(() => {
        // Return 204 No Content for missing background telemetry when offline
        return new Response(null, { status: 204, statusText: 'Offline' });
      });
    })
  );
});

// --------------------------------------------------------------------------
// Message Events (Skip Waiting / Diagnostics / Status)
// --------------------------------------------------------------------------
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_VERSION,
      staticCache: STATIC_CACHE,
      dataCache: DATA_CACHE,
      cdnCache: CDN_CACHE
    });
  }

  if (event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k)));
    }).then(() => {
      if (event.ports[0]) event.ports[0].postMessage({ success: true });
    });
  }
});
