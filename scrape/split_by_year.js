const fs = require('fs');
const path = require('path');

// Function to load and parse the large JSON file
function loadLargeJson(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Function to organize data by Year only
function organizeByYear(data) {
    const organizedData = {};

    data.forEach((vehicle) => {
        const year = vehicle.Year;

        // Initialize the structure if it doesn't exist
        if (!organizedData[year]) {
            organizedData[year] = [];
        }

        // Push the vehicle data into the right year
        organizedData[year].push(vehicle);
    });

    return organizedData;
}

// Function to create individual JSON files
function createJsonFiles(outputDir, organizedData) {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    Object.keys(organizedData).forEach((year) => {
        const fileName = `${year}.json`;
        const filePath = path.join(outputDir, fileName);

        // Write each year data to a file
        fs.writeFileSync(filePath, JSON.stringify(organizedData[year], null, 4));
        console.log(`Created file: ${filePath}`);
    });
}

// Main function to execute the process
function splitJsonFile(inputFilePath, outputDir) {
    try {
        const data = loadLargeJson(inputFilePath);
        const organizedData = organizeByYear(data);
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
