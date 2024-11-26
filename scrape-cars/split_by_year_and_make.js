const fs = require('fs');
const path = require('path');

// Function to load and parse the large JSON file
function loadLargeJson(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Function to organize data by Year, Make, and Model, consolidating variations and keying by model name
function organizeByYearMakeAndModel(data) {
    const organizedData = {};

    data.forEach((vehicle) => {
        const year = vehicle.Year;
        const make = vehicle.Make;
        const modelTrim = vehicle.ModelTrim;
        const trimData = vehicle.TowingCapacity;
        delete trimData.GearRatio;
        delete trimData.Id;

        // Initialize the structure if it doesn't exist
        if (!organizedData[year]) {
            organizedData[year] = {};
        }
        if (!organizedData[year][make]) {
            organizedData[year][make] = {};
        }
        if (!organizedData[year][make][modelTrim]) {
            organizedData[year][make][modelTrim] = [];
        }

        // Check for duplicates before pushing
        const existingTrimData = organizedData[year][make][modelTrim];
        if (!existingTrimData.some(existing => JSON.stringify(existing) === JSON.stringify(trimData))) {
            // Push the towing capacity variations into the model's entry, keyed by the model name
            existingTrimData.push(trimData);
        }
    });

    return organizedData;
}

// Function to normalize names
function normalizeName(name) {
    return name
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9_]/g, '_') // Replace non-alphanumeric characters with underscores
        .replace(/_+/g, '_') // Replace multiple underscores with a single underscore
        .trim(); // Trim whitespace
}

// Update the createJsonFiles function to handle the new structure
function createJsonFiles(outputDir, organizedData) {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const makesData = []; // Array to hold makes and their corresponding years

    Object.keys(organizedData).forEach((year) => {
        Object.keys(organizedData[year]).forEach((make) => {
            const normalizedMake = normalizeName(make); // Normalize the make name
            const normalizedYear = normalizeName(year); // Normalize the year name

            // Check if the make already exists in the makesData array
            let makeEntry = makesData.find(entry => entry.normalizedName === normalizedMake);
            if (!makeEntry) {
                // If it doesn't exist, create a new entry
                makeEntry = {
                    name: make, // Original make name
                    normalizedName: normalizedMake, // Normalized make name
                    years: [] // Array to hold the years
                };
                makesData.push(makeEntry); // Add the new entry to the array
            }
            // Add the year to the make entry if it doesn't already exist
            if (!makeEntry.years.includes(normalizedYear)) {
                makeEntry.years.push(normalizedYear);
            }

            const modelData = {}; // Object to store model data keyed by model name

            Object.keys(organizedData[year][make]).forEach((modelTrim) => {
                modelData[modelTrim] = organizedData[year][make][modelTrim]; // Key the variations by model name
            });

            const fileName = `${normalizedMake}_${normalizedYear}.json`; // File naming by make and year
            const filePath = path.join(outputDir, fileName);

            // Write the models keyed by their name into the file
            fs.writeFileSync(filePath, JSON.stringify(modelData, null, 4));
            console.log(`Created file: ${filePath}`);
        });
    });

    // Write the MAKES.json file
    const makesFilePath = path.join(outputDir, 'MAKES.json');
    fs.writeFileSync(makesFilePath, JSON.stringify(makesData, null, 4));
    console.log(`Created file: ${makesFilePath}`);
}

// Main function to execute the process
function splitJsonFile(inputFilePath, outputDir) {
    try {
        const data = loadLargeJson(inputFilePath);
        const organizedData = organizeByYearMakeAndModel(data); // Call the updated function
        createJsonFiles(outputDir, organizedData);
        console.log('JSON file split successfully!');
    } catch (error) {
        console.error('Error splitting the JSON file:', error);
    }
}

// Read file path and output directory from command-line arguments
const inputFilePath = process.argv[2]; // First argument: input JSON file
const outputDir = process.argv[3]; // Second argument: output directory

if (!inputFilePath || !outputDir) {
    console.error('Please provide the path to the JSON file and the output directory as arguments.');
    process.exit(1); // Exit with an error code
}

// Execute the splitting
splitJsonFile(inputFilePath, outputDir);
