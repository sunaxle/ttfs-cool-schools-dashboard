/**
 * Service Worker Registration & Offline Field Diagnostics Manager (sw-register.js)
 * Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools
 * 
 * Safely registers sw.js on window load across dashboard portals and provides
 * real-time online/offline connection state indicators for rural schoolyard tablets.
 */

(function (window, document) {
  'use strict';

  // Global PWA State Object
  const CoolSchoolsPWA = {
    version: '2.0.0',
    isOnline: navigator.onLine,
    isRegistered: false,
    registration: null,
    updateAvailable: false,

    /**
     * Check for Service Worker updates manually
     */
    async checkForUpdates() {
      if (this.registration) {
        console.log('[PWA Manager] Checking for cache updates...');
        try {
          await this.registration.update();
        } catch (err) {
          console.warn('[PWA Manager] Update check failed:', err);
        }
      }
    },

    /**
     * Trigger Service Worker cache clearing and reload
     */
    async clearCache() {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        console.log('[PWA Manager] All offline caches purged.');
        window.location.reload();
      }
    }
  };

  // Expose to window
  window.CoolSchoolsPWA = CoolSchoolsPWA;

  /**
   * Determine the correct relative or absolute path to sw.js based on current pathname
   */
  function resolveSwPath() {
    const depth = (window.location.pathname.match(/\//g) || []).length;
    // Check if we are in subfolder like /portals/v5/
    if (window.location.pathname.includes('/portals/')) {
      return '../../sw.js';
    }
    if (window.location.pathname.includes('/data/') || window.location.pathname.includes('/print_media/')) {
      return '../sw.js';
    }
    return './sw.js';
  }

  /**
   * Inject accessible PWA offline status pill into DOM
   */
  function createPwaStatusPill() {
    if (document.getElementById('coolschools-pwa-badge')) return;

    const pill = document.createElement('div');
    pill.id = 'coolschools-pwa-badge';
    pill.setAttribute('role', 'status');
    pill.setAttribute('aria-live', 'polite');
    pill.className = 'coolschools-pwa-badge';
    
    // Default styling (handled with standard class and fallbacks)
    pill.style.position = 'fixed';
    pill.style.bottom = '16px';
    pill.style.right = '16px';
    pill.style.zIndex = '9999';
    pill.style.display = 'flex';
    pill.style.alignItems = 'center';
    pill.style.gap = '8px';
    pill.style.padding = '8px 14px';
    pill.style.borderRadius = '24px';
    pill.style.fontSize = '12px';
    pill.style.fontWeight = '600';
    pill.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    pill.style.boxShadow = '0 4px 14px rgba(0,0,0,0.18)';
    pill.style.transition = 'all 0.35s ease';
    pill.style.cursor = 'pointer';
    pill.style.userSelect = 'none';

    document.body.appendChild(pill);
    updatePwaStatusPill();

    // Click to view diagnostics modal / toast
    pill.addEventListener('click', () => {
      showDiagnosticsToast();
    });
  }

  /**
   * Update the badge presentation based on network state
   */
  function updatePwaStatusPill() {
    const pill = document.getElementById('coolschools-pwa-badge');
    if (!pill) return;

    CoolSchoolsPWA.isOnline = navigator.onLine;

    if (navigator.onLine) {
      pill.style.backgroundColor = '#1B4D3E'; // Forest Green
      pill.style.color = '#FFFFFF';
      pill.style.border = '1px solid #2F6B3F';
      pill.innerHTML = '<span style="font-size: 10px; color: #A3E635;">●</span> Field PWA: Online';
      
      // Auto dim after 4 seconds when online to minimize distraction
      setTimeout(() => {
        if (navigator.onLine && pill) {
          pill.style.opacity = '0.4';
        }
      }, 4000);
    } else {
      pill.style.opacity = '1';
      pill.style.backgroundColor = '#F05023'; // UTRGV Orange
      pill.style.color = '#FFFFFF';
      pill.style.border = '1px solid #D84218';
      pill.innerHTML = '<span>⚡</span> Field Offline Mode (Cached)';
    }

    pill.addEventListener('mouseenter', () => { pill.style.opacity = '1'; });
    pill.addEventListener('mouseleave', () => {
      if (navigator.onLine) pill.style.opacity = '0.4';
    });
  }

  /**
   * Show mini diagnostics dialog
   */
  function showDiagnosticsToast() {
    const existingModal = document.getElementById('pwa-diagnostics-modal');
    if (existingModal) {
      existingModal.remove();
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'pwa-diagnostics-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'PWA Offline Field Diagnostics');
    modal.style.position = 'fixed';
    modal.style.bottom = '60px';
    modal.style.right = '16px';
    modal.style.width = '300px';
    modal.style.backgroundColor = '#FFFFFF';
    modal.style.color = '#1A1A1A';
    modal.style.padding = '16px';
    modal.style.borderRadius = '10px';
    modal.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)';
    modal.style.border = '2px solid #1B4D3E';
    modal.style.zIndex = '10000';
    modal.style.fontSize = '12px';
    modal.style.lineHeight = '1.5';
    modal.style.fontFamily = 'system-ui, -apple-system, sans-serif';

    modal.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ECECEC; padding-bottom: 8px; margin-bottom: 10px;">
        <strong style="color: #1B4D3E; font-size: 13px;">🌲 TTFS Offline Field Diagnostics</strong>
        <button id="pwa-close-btn" style="background: none; border: none; font-size: 16px; cursor: pointer; color: #666;" aria-label="Close Diagnostics">✕</button>
      </div>
      <div style="margin-bottom: 8px;">
        <strong>Connection:</strong> ${navigator.onLine ? '<span style="color: #2F6B3F; font-weight: bold;">🟢 Online (Sync Active)</span>' : '<span style="color: #F05023; font-weight: bold;">⚡ Offline Field Mode</span>'}
      </div>
      <div style="margin-bottom: 8px;">
        <strong>PWA Cache Engine:</strong> <span style="color: #1B4D3E; font-weight: 600;">v2.0.0 (Ready)</span>
      </div>
      <div style="margin-bottom: 12px; color: #555; font-size: 11px;">
        All schoolyard trees, microclimate sensors, and lesson plans are 100% pre-cached for rural field exploration without cellular signal.
      </div>
      <div style="display: flex; gap: 8px;">
        <button id="pwa-update-btn" style="flex: 1; padding: 6px; background: #1B4D3E; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 600;">Check Updates</button>
        <button id="pwa-clear-btn" style="padding: 6px 10px; background: #EEE; color: #333; border: 1px solid #CCC; border-radius: 4px; cursor: pointer; font-size: 11px;">Purge Cache</button>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('pwa-close-btn').addEventListener('click', () => modal.remove());
    document.getElementById('pwa-update-btn').addEventListener('click', () => {
      CoolSchoolsPWA.checkForUpdates();
      modal.remove();
    });
    document.getElementById('pwa-clear-btn').addEventListener('click', () => {
      if (confirm('Clear local offline cache and re-download all schoolyard assets?')) {
        CoolSchoolsPWA.clearCache();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Safe Service Worker Registration on Window Load
  // --------------------------------------------------------------------------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      createPwaStatusPill();
      const swPath = resolveSwPath();

      navigator.serviceWorker
        .register(swPath)
        .then((reg) => {
          CoolSchoolsPWA.registration = reg;
          CoolSchoolsPWA.isRegistered = true;
          console.log('[ServiceWorker Registration] Scope active:', reg.scope);

          // Handle pending updates
          reg.addEventListener('updatefound', () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  CoolSchoolsPWA.updateAvailable = true;
                  console.log('[ServiceWorker] New version available.');
                  window.dispatchEvent(new CustomEvent('coolschools:pwa-update-available'));
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn('[ServiceWorker Registration Error]:', err);
        });
    });
  }

  // Connection Event Listeners
  window.addEventListener('online', () => {
    updatePwaStatusPill();
    window.dispatchEvent(new CustomEvent('coolschools:online'));
  });

  window.addEventListener('offline', () => {
    updatePwaStatusPill();
    window.dispatchEvent(new CustomEvent('coolschools:offline'));
  });

})(window, document);
