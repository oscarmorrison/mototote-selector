import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const WET_WEIGHT_MULTIPLIER = 1.12;
const KG_TO_LB_MULTIPLIER = 2.20462;


// Read files from the data directory
const dataDir = './data';

// Get all files in the directory that match the pattern YYYY_motorcycle.json
const files = readdirSync(dataDir).filter(file => 
    /^\d{4}_motorcycles\.json$/.test(file)
);

const sanitizeMakeName = (fileName) => {
    return fileName
        .replace(/[\/:*?"<>|]/g, '') // Remove invalid characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .replace(/_+/g, '_') // Replace multiple underscores with a single underscore
        .replace(/_\(.*?\)/g, '') // Remove anything in parentheses
        .replace(/_+/g, '_') // Clean up any remaining underscores
        .replace(/^_+|_+$/g, '')
        .toLowerCase();
}


const getWeightFromString = (string) => {
    const match = string.match(/\((\d+(\.\d+)?)\s+pounds\)/);
    return match ? Number(parseFloat(match[1]).toFixed(1)) : null;
};

const getWeight = (wet, dry) => {
    if (!wet && !dry) return null;
    if (wet) return getWeightFromString(wet);
    return Number((getWeightFromString(dry) * WET_WEIGHT_MULTIPLIER).toFixed(1));
};

const getTireWidth = (tireString) => {
    if (!tireString) return null;
    
    // Handle any format with width/height pattern (e.g., "120/90", "120/70-ZR17")
    const mmMatch = tireString.match(/^(\d+)\//);
    if (mmMatch) {
        return Number((parseFloat(mmMatch[1]) / 25.4).toFixed(2));
    }
    
    // Handle inch format (e.g., "3.00-19" or "3.00-19-4PR")
    const inchMatch = tireString.match(/^(\d+\.?\d*)-\d+/);
    if (inchMatch) {
        return Number(parseFloat(inchMatch[1]).toFixed(2));
    }
    
    return null;
};

const getWheelbaseInches = (wheelbaseString) => {
    if (!wheelbaseString) return null;
    
    // Match the inches value inside parentheses
    const match = wheelbaseString.match(/\(([\d.]+)\s*inches\)/);
    if (match) {
        return Number(parseFloat(match[1]).toFixed(1));
    }
    
    return null;
};

const transformMotorcycle = (motorcycle) => {
    // Log and skip invalid entries
    if (!motorcycle || !motorcycle.data) {
        console.log('Invalid motorcycle entry found:');
        console.log(JSON.stringify(motorcycle, null, 2));
        return null;
    }

    // Skip ATVs
    if (motorcycle.data.type === "ATV") {
        return null;
    }

    const cleanData = {};
    cleanData.key = sanitizeMakeName(motorcycle.make);
    cleanData.url = motorcycle.url;
    cleanData.make = motorcycle.make;
    cleanData.model = motorcycle.model;
    cleanData.year = motorcycle.year;
    cleanData.type = motorcycle.data.type || null;
    cleanData.wet_weight = getWeight(motorcycle.data.wet_weight, motorcycle.data.dry_weight);
    cleanData.front_tire_width = getTireWidth(motorcycle.data.fronttyre);
    cleanData.rear_tire_width = getTireWidth(motorcycle.data.reartyre);
    cleanData.wheelbase = getWheelbaseInches(motorcycle.data.wheelbase);
    return cleanData;
}

// Create motorcycle_data directory if it doesn't exist
const outputDir = './motorcycle_data';
if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
}

// Create a map to collect makes and their years
const makesMap = new Map();

// Read and process all files
files.forEach(file => {
    const filePath = join(dataDir, file);
    try {
        const data = readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        
        // Group motorcycles by make and year
        const motorcyclesByMakeYear = {};
        
        jsonData.forEach(motorcycle => {
            const cleanData = transformMotorcycle(motorcycle);
            if (cleanData) {
                // Process motorcycle files as before
                const fileName = `${cleanData.key}_${cleanData.year}.json`;
                if (!motorcyclesByMakeYear[fileName]) {
                    motorcyclesByMakeYear[fileName] = [];
                }
                motorcyclesByMakeYear[fileName].push(cleanData);

                // Collect make and year information
                if (!makesMap.has(cleanData.make)) {
                    makesMap.set(cleanData.make, new Set());
                }
                makesMap.get(cleanData.make).add(cleanData.year.toString());
            }
        });
        
        // Write individual motorcycle files
        Object.entries(motorcyclesByMakeYear).forEach(([fileName, motorcycles]) => {
            const outputPath = join(outputDir, fileName);
            writeFileSync(outputPath, JSON.stringify(motorcycles, null, 2));
        });
        
    } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
    }
});

// Convert makesMap to the desired format and write MAKES.json
const makesArray = Array.from(makesMap).map(([name, yearsSet]) => ({
    name,
    normalizedName: sanitizeMakeName(name).toLowerCase(),
    years: Array.from(yearsSet).sort()
}));

// Sort makes alphabetically by name
makesArray.sort((a, b) => a.name.localeCompare(b.name));

// Write MAKES.json
writeFileSync(
    join(outputDir, 'MAKES.json'),
    JSON.stringify(makesArray, null, 2)
);
