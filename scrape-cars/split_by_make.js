const fs = require('fs');
const path = require('path');

// Function to load and parse the large JSON file
function loadLargeJson(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Function to sanitize file names
function sanitizeFileName(fileName) {
    // Normalize the file name by removing unwanted characters and standardizing the format
    return fileName
        .replace(/[\/:*?"<>|]/g, '') // Remove invalid characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .replace(/_+/g, '_') // Replace multiple underscores with a single underscore
        .replace(/_\(.*?\)/g, '') // Remove anything in parentheses
        .replace(/_+/g, '_') // Clean up any remaining underscores
        .replace(/^_+|_+$/g, ''); // Trim leading and trailing underscores
}

// Function to organize data by Make
function organizeByMake(data) {
    const organizedData = {};

    data.forEach((vehicle) => {
        const make = vehicle.Make;

        // Initialize the structure if it doesn't exist
        if (!organizedData[make]) {
            organizedData[make] = [];
        }

        // Push the vehicle data into the right make
        organizedData[make].push(vehicle);
    });

    return organizedData;
}

// Function to create individual JSON files
function createJsonFiles(outputDir, organizedData) {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const allMakes = []; // Array to store all makes

    Object.keys(organizedData).forEach((make) => {
        const safeMake = sanitizeFileName(make);
        allMakes.push(safeMake); // Add the make to the allMakes array
        const modelTrimFiles = {}; // Object to store model trims and their associated file names

        organizedData[make].forEach(vehicle => {
            const modelTrim = vehicle.ModelTrim;
            const safeModelTrim = sanitizeFileName(modelTrim);
            const makeTrimFileName = `${safeMake}_${safeModelTrim}.json`;
            const makeTrimFilePath = path.join(outputDir, makeTrimFileName);

            // Write each make_trim to a file
            fs.writeFileSync(makeTrimFilePath, JSON.stringify(vehicle, null, 4));
            console.log(`Created file: ${makeTrimFilePath}`);

            // Store the model trim and its associated file name
            modelTrimFiles[modelTrim] = makeTrimFileName;
        });

        // Create MAKE.json with model trims as keys and file names as values
        const makeFileName = `${safeMake}.json`;
        const makeFilePath = path.join(outputDir, makeFileName);
        fs.writeFileSync(makeFilePath, JSON.stringify(modelTrimFiles, null, 4));
        console.log(`Created file: ${makeFilePath}`);
    });

    // Create MAKES.json with a list of all makes
    const makesFilePath = path.join(outputDir, 'MAKES.json');
    fs.writeFileSync(makesFilePath, JSON.stringify(allMakes, null, 4));
    console.log(`Created file: ${makesFilePath}`);
}

// Main function to execute the process
function splitJsonFile(inputFilePath, outputDir) {
    try {
        const data = loadLargeJson(inputFilePath);
        const organizedData = organizeByMake(data);
        createJsonFiles(outputDir, organizedData);
    } catch (error) {
        console.error('Error processing the file:', error);
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
