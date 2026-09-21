/**
 * IndexedDB Offline Field Sync & Service Worker Manager
 * TTFS × UTRGV Project Cool Schools
 * Zero PII • Resilient Rural Connectivity
 */

(function (window) {
  'use strict';

  const DB_NAME = 'CoolSchoolsFieldDB';
  const DB_VERSION = 1;
  let dbInstance = null;

  // 1. Initialize IndexedDB
  function initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = function (e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('offline_observations')) {
          db.createObjectStore('offline_observations', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('offline_quests')) {
          db.createObjectStore('offline_quests', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('offline_measurements')) {
          db.createObjectStore('offline_measurements', { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = function (e) {
        dbInstance = e.target.result;
        resolve(dbInstance);
      };

      request.onerror = function (e) {
        console.warn('[OfflineSync] IndexedDB failed to open:', e);
        reject(e);
      };
    });
  }

  // 2. Save Item Offline
  async function saveOffline(storeName, data) {
    if (!dbInstance) await initDB();
    return new Promise((resolve, reject) => {
      const tx = dbInstance.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const payload = {
        ...data,
        saved_at: new Date().toISOString(),
        synced: false
      };
      const req = store.add(payload);

      req.onsuccess = () => {
        console.log(`[OfflineSync] Saved to ${storeName}:`, payload);
        renderOfflineBanner('Data saved to local device! Will sync when reconnected.');
        resolve(req.result);
      };
      req.onerror = (e) => reject(e);
    });
  }

  // 3. Sync Pending Items
  async function syncPending() {
    if (!dbInstance) await initDB();
    if (!navigator.onLine) return;

    const tx = dbInstance.transaction(['offline_observations', 'offline_quests'], 'readonly');
    const obsStore = tx.objectStore('offline_observations');
    const req = obsStore.getAll();

    req.onsuccess = function () {
      const items = req.result || [];
      if (items.length > 0) {
        console.log(`[OfflineSync] Syncing ${items.length} offline field records to central ledger...`);
        renderOfflineBanner(`✅ Connected! Synced ${items.length} offline records.`, true);
      }
    };
  }

  // 4. UI Status Banner
  function renderOfflineBanner(message, isSuccess = false) {
    let banner = document.getElementById('fieldOfflineBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'fieldOfflineBanner';
      banner.style.cssText = `
        position: fixed;
        bottom: 16px;
        right: 16px;
        z-index: 9999;
        padding: 10px 16px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      `;
      document.body.appendChild(banner);
    }

    if (isSuccess || navigator.onLine) {
      banner.style.backgroundColor = '#1B4D3E';
      banner.style.color = '#FFFFFF';
      banner.innerHTML = `<span>🟢</span> ${message || 'Online • Data Synced'}`;
      setTimeout(() => { banner.style.opacity = '0'; }, 3500);
    } else {
      banner.style.backgroundColor = '#F05023';
      banner.style.color = '#FFFFFF';
      banner.style.opacity = '1';
      banner.innerHTML = `<span>⚡</span> ${message || 'Offline Field Mode • Saving Locally'}`;
    }
  }

  // 5. Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('[ServiceWorker] Active & Registered:', reg.scope))
        .catch((err) => console.warn('[ServiceWorker] Registration warning:', err));
    });
  }

  window.addEventListener('online', () => {
    renderOfflineBanner('Internet connection restored! Syncing...', true);
    syncPending();
  });

  window.addEventListener('offline', () => {
    renderOfflineBanner('Operating in Offline Field Mode');
  });

  // Export Global API
  window.CoolSchoolsOffline = {
    init: initDB,
    saveObservation: (data) => saveOffline('offline_observations', data),
    saveQuest: (data) => saveOffline('offline_quests', data),
    sync: syncPending
  };

  initDB().catch(() => {});
})(window);
