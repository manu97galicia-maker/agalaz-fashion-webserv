/**
 * Agalaz Virtual Try-On Widget
 *
 * Usage:
 *   <script src="https://agalaz.com/widget.js" data-api-key="agz_live_..."></script>
 *   <div id="agalaz-tryon" data-garment="https://example.com/product.jpg"></div>
 *
 * The widget injects a "Try it on" button and opens a modal with the try-on UI.
 */
(function () {
  'use strict';

  // Find our script tag to read the API key
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  var apiKey = currentScript.getAttribute('data-api-key') || '';
  var baseUrl = currentScript.src.replace(/\/widget\.js.*$/, '');

  if (!apiKey) {
    console.warn('[Agalaz] Missing data-api-key attribute on script tag.');
    return;
  }

  // Detect language from page
  var lang = document.documentElement.lang === 'es' ? 'es' : 'en';

  var BUTTON_TEXT = lang === 'es' ? 'Pruébatela con IA' : 'Try it on with AI';
  var MODAL_ID = 'agalaz-modal-overlay';

  // Styles for the button and modal
  var style = document.createElement('style');
  style.textContent = [
    '.agalaz-btn {',
    '  display: inline-flex; align-items: center; gap: 8px;',
    '  padding: 12px 24px; border: none; border-radius: 10px;',
    '  background: #1e1b4b; color: white; cursor: pointer;',
    '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
    '  font-size: 14px; font-weight: 800; letter-spacing: 0.05em;',
    '  transition: background 0.2s, transform 0.1s;',
    '}',
    '.agalaz-btn:hover { background: #4f46e5; transform: translateY(-1px); }',
    '.agalaz-btn:active { transform: translateY(0); }',
    '.agalaz-btn svg { width: 18px; height: 18px; }',
    '#' + MODAL_ID + ' {',
    '  position: fixed; inset: 0; z-index: 999999;',
    '  background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);',
    '  display: flex; align-items: center; justify-content: center;',
    '  animation: agalazFadeIn 0.2s ease;',
    '}',
    '#' + MODAL_ID + ' .agalaz-modal {',
    '  background: white; border-radius: 16px; overflow: hidden;',
    '  width: 90vw; max-width: 420px; height: 85vh; max-height: 750px;',
    '  box-shadow: 0 25px 50px rgba(0,0,0,0.25);',
    '  animation: agalazSlideUp 0.3s ease;',
    '}',
    '#' + MODAL_ID + ' iframe {',
    '  width: 100%; height: 100%; border: none;',
    '}',
    '@keyframes agalazFadeIn { from { opacity: 0; } to { opacity: 1; } }',
    '@keyframes agalazSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }',
  ].join('\n');
  document.head.appendChild(style);

  // Sparkles SVG icon
  var sparklesSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>';

  function openModal(garmentUrl) {
    // Don't open twice
    if (document.getElementById(MODAL_ID)) return;

    var params = 'key=' + encodeURIComponent(apiKey) + '&lang=' + lang;
    if (garmentUrl) params += '&garment=' + encodeURIComponent(garmentUrl);

    var overlay = document.createElement('div');
    overlay.id = MODAL_ID;

    var modal = document.createElement('div');
    modal.className = 'agalaz-modal';

    var iframe = document.createElement('iframe');
    iframe.src = baseUrl + '/embed?' + params;
    iframe.allow = 'camera';

    modal.appendChild(iframe);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Close on overlay click (outside modal)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', handleEscape);
  }

  function closeModal() {
    var overlay = document.getElementById(MODAL_ID);
    if (overlay) overlay.remove();
    document.removeEventListener('keydown', handleEscape);
  }

  function handleEscape(e) {
    if (e.key === 'Escape') closeModal();
  }

  // Listen for messages from the iframe
  window.addEventListener('message', function (e) {
    if (!e.data || !e.data.type) return;
    if (e.data.type === 'agalaz:close') closeModal();
    // Stores can listen for 'agalaz:result' to get the generated image
  });

  // Initialize: find all #agalaz-tryon containers and inject buttons
  function init() {
    var containers = document.querySelectorAll('#agalaz-tryon, [data-agalaz-tryon]');
    containers.forEach(function (container) {
      if (container.getAttribute('data-agalaz-init')) return;
      container.setAttribute('data-agalaz-init', 'true');

      var garmentUrl = container.getAttribute('data-garment') || '';

      var btn = document.createElement('button');
      btn.className = 'agalaz-btn';
      btn.innerHTML = sparklesSvg + ' ' + BUTTON_TEXT;
      btn.addEventListener('click', function () {
        openModal(garmentUrl);
      });

      container.appendChild(btn);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also watch for dynamically added containers (SPA support)
  if (typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function () {
      var uninit = document.querySelectorAll('#agalaz-tryon:not([data-agalaz-init]), [data-agalaz-tryon]:not([data-agalaz-init])');
      if (uninit.length > 0) init();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
