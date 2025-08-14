import { CDN_BASE } from './cdn.js';

export async function initWidget(el, opts = {}) {
  const res = await fetch(CDN_BASE + 'mototote-manifest.json', { mode: 'cors' });
  const manifest = await res.json();

  const type = (opts?.type || el.dataset.type || 'vehicle');
  const makeKey = (opts?.make || el.dataset.make || '').toLowerCase();

  const map = type === 'motorcycle' ? manifest.motorcycle : manifest.vehicle;
  const url = map[makeKey];
  if (!url) {
    console.warn('No data for', type, makeKey);
    return;
  }

  const dataRes = await fetch(url, { mode: 'cors' });
  const data = await dataRes.json();

  el.textContent = `Loaded ${type}:${makeKey} (${Array.isArray(data) ? data.length : Object.keys(data).length} items)`;
}

if (typeof document !== 'undefined') {
  const el = document.querySelector('[data-mototote]');
  if (el) initWidget(el);
}
