const fs = require('fs');
const path = require('path');

// Function to load and parse the large JSON file
function loadLargeJson(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Function to organize data by Year and Make
function organizeByYearAndMake(data) {
    const organizedData = {};

    data.forEach((vehicle) => {
        const year = vehicle.Year;
        const make = vehicle.Make; // Get the make of the vehicle

        // Initialize the structure if it doesn't exist
        if (!organizedData[year]) {
            organizedData[year] = {};
        }
        if (!organizedData[year][make]) {
            organizedData[year][make] = [];
        }

        // Push the vehicle data into the right year and make
        organizedData[year][make].push(vehicle);
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

    Object.keys(organizedData).forEach((year) => {
        Object.keys(organizedData[year]).forEach((make) => {
            const normalizedMake = normalizeName(make); // Normalize the make name
            const normalizedYear = normalizeName(year); // Normalize the year name

            const fileName = `${normalizedMake}_${normalizedYear}.json`; // Update file naming convention
            const filePath = path.join(outputDir, fileName); // Use the output directory for the file path

            // Write each year and make data to a file
            fs.writeFileSync(filePath, JSON.stringify(organizedData[year][make], null, 4));
            console.log(`Created file: ${filePath}`);
        });
    });
}

// Main function to execute the process
function splitJsonFile(inputFilePath, outputDir) {
    try {
        const data = loadLargeJson(inputFilePath);
        const organizedData = organizeByYearAndMake(data); // Call the updated function
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
