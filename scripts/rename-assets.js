import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');

console.log('Renaming assets with mototote-widget prefix...');

// Files to rename
const filesToRename = [
  { from: 'index.json', to: 'mototote-widget-index.json' },
  { from: 'mototote_carrier_metrics.csv', to: 'mototote-widget-carrier-metrics.csv' }
];

// Rename specific files
filesToRename.forEach(({ from, to }) => {
  const fromPath = path.join(distDir, from);
  const toPath = path.join(distDir, to);

  if (fs.existsSync(fromPath)) {
    fs.renameSync(fromPath, toPath);
    console.log(`Renamed: ${from} → ${to}`);
  }
});

// Rename vehicle files
const vehicleFiles = fs.readdirSync(distDir).filter(file =>
  file.startsWith('vehicle_') && file.endsWith('.json')
);

vehicleFiles.forEach(file => {
  const make = file.replace('vehicle_', '').replace('.json', '');
  const newName = `mototote-widget-vehicle-${make}.json`;
  const fromPath = path.join(distDir, file);
  const toPath = path.join(distDir, newName);

  fs.renameSync(fromPath, toPath);
  console.log(`Renamed: ${file} → ${newName}`);
});

// Rename motorcycle files
const motorcycleFiles = fs.readdirSync(distDir).filter(file =>
  file.startsWith('motorcycle_') && file.endsWith('.json')
);

motorcycleFiles.forEach(file => {
  const brand = file.replace('motorcycle_', '').replace('.json', '');
  const newName = `mototote-widget-motorcycle-${brand}.json`;
  const fromPath = path.join(distDir, file);
  const toPath = path.join(distDir, newName);

  fs.renameSync(fromPath, toPath);
  console.log(`Renamed: ${file} → ${newName}`);
});

console.log('Asset renaming complete!');
