import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read all JSON files from a directory and create individual make files
function createVehicleMakeFiles(dirPath, outputDir) {
    const files = fs.readdirSync(dirPath);
    const makeData = {};

    // Group files by make
    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(dirPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(content);

            // Extract make name from filename (e.g., "acura_2020.json" -> "acura")
            const makeName = file.split('_')[0];

            if (!makeData[makeName]) {
                makeData[makeName] = [];
            }

            // Add year to each vehicle
            const year = parseInt(file.split('_')[1]?.split('.')[0]);

            if (data && typeof data === 'object') {
                // Handle object-based data (like honda_2020.json)
                Object.keys(data).forEach(modelKey => {
                    const modelVehicles = data[modelKey];
                    if (Array.isArray(modelVehicles)) {
                        modelVehicles.forEach(vehicle => {
                            if (vehicle) {
                                vehicle.Year = vehicle.Year || year;
                                makeData[makeName].push(vehicle);
                            }
                        });
                    }
                });
            } else if (data && Array.isArray(data)) {
                // Handle array-based data (fallback)
                data.forEach(vehicle => {
                    if (vehicle) {
                        vehicle.Year = vehicle.Year || year;
                        makeData[makeName].push(vehicle);
                    }
                });
            }
        }
    });

    // Create individual files for each make with vehicle_ prefix
    Object.keys(makeData).forEach(make => {
        const makeFilePath = path.join(outputDir, `vehicle_${make}.json`);
        fs.writeFileSync(makeFilePath, JSON.stringify(makeData[make], null, 2));
    });

    return Object.keys(makeData);
}

// Function to read motorcycle data and create individual brand files
function createMotorcycleBrandFiles(dirPath, outputDir) {
    const files = fs.readdirSync(dirPath);
    const brandData = {};

    // Group files by brand
    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(dirPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(content);

            // Extract brand name from filename (e.g., "honda_2020.json" -> "honda")
            const brandName = file.split('_')[0];

            if (!brandData[brandName]) {
                brandData[brandName] = [];
            }

            // Add year to each motorcycle
            const year = parseInt(file.split('_')[1]?.split('.')[0]);

            if (data && typeof data === 'object') {
                // Handle object-based data
                Object.keys(data).forEach(modelKey => {
                    const modelMotorcycles = data[modelKey];
                    if (Array.isArray(modelMotorcycles)) {
                        modelMotorcycles.forEach(motorcycle => {
                            if (motorcycle) {
                                motorcycle.year = motorcycle.year || year;
                                brandData[brandName].push(motorcycle);
                            }
                        });
                    }
                });
            } else if (data && Array.isArray(data)) {
                // Handle array-based data (fallback)
                data.forEach(motorcycle => {
                    if (motorcycle) {
                        motorcycle.year = motorcycle.year || year;
                        brandData[brandName].push(motorcycle);
                    }
                });
            }
        }
    });

    // Create individual files for each brand with motorcycle_ prefix
    Object.keys(brandData).forEach(brand => {
        const brandFilePath = path.join(outputDir, `motorcycle_${brand}.json`);
        fs.writeFileSync(brandFilePath, JSON.stringify(brandData[brand], null, 2));
    });

    return Object.keys(brandData);
}

// Create index files with make/brand lists
function createIndexFiles(vehicleMakes, motorcycleBrands, outputDir) {
    const indexData = {
        vehicles: vehicleMakes.sort(),
        motorcycles: motorcycleBrands.sort(),
        timestamp: new Date().toISOString()
    };

    fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(indexData, null, 2));
}

// Bundle all data
console.log('Creating individual make/brand data files...');

// Create output directory
const outputDir = path.join(__dirname, '../src/data');
fs.mkdirSync(outputDir, { recursive: true });

// Create individual files
const vehicleMakes = createVehicleMakeFiles(path.join(__dirname, '../scrape-cars/output'), outputDir);
const motorcycleBrands = createMotorcycleBrandFiles(path.join(__dirname, '../scrape-motorcycles/motorcycle_data'), outputDir);

// Create index file
createIndexFiles(vehicleMakes, motorcycleBrands, outputDir);

console.log(`Created ${vehicleMakes.length} vehicle make files`);
console.log(`Created ${motorcycleBrands.length} motorcycle brand files`);
console.log(`Data files written to src/data/`);

// Log some sample data for verification
if (vehicleMakes.length > 0) {
    const sampleMake = vehicleMakes[0];
    const sampleMakeData = JSON.parse(fs.readFileSync(path.join(outputDir, `vehicle_${sampleMake}.json`), 'utf8'));
    console.log(`Sample ${sampleMake} vehicles: ${sampleMakeData.length}`);
}
