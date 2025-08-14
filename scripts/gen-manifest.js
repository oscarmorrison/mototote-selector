import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIST = 'dist';
const BASE = 'https://oscarmorrison.com/mototote-selector/';

const files = readdirSync(DIST);
const manifest = {
  index: null,
  carrierMetrics: null,
  motorcycle: {},
  vehicle: {}
};

for (const f of files) {
  if (!/^[\w\-\.&]+$/.test(f)) continue;
  if (f === 'mototote-widget-index.json') manifest.index = BASE + f;
  if (f === 'mototote-widget-carrier-metrics.csv') manifest.carrierMetrics = BASE + f;

  let m;
  if ((m = f.match(/^mototote-widget-motorcycle-(.+)\.json$/))) {
    manifest.motorcycle[m[1]] = BASE + f;
  } else if ((m = f.match(/^mototote-widget-vehicle-(.+)\.json$/))) {
    manifest.vehicle[m[1]] = BASE + f;
  }
}

writeFileSync(join(DIST, 'mototote-manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Wrote dist/mototote-manifest.json with', Object.keys(manifest.motorcycle).length, 'motorcycle and', Object.keys(manifest.vehicle).length, 'vehicle entries');
