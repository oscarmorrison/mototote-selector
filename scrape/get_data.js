const axios = require('axios');
const fs = require('fs');
const promiseLimit = require('promise-limit');

// Base URLs for the AJAX requests
const baseMfgUrl = 'https://www.generalrv.com/rebraco/DataNugget/GetTowRatingMfgs';
const baseModelUrl = 'https://www.generalrv.com/rebraco/DataNugget/GetTowRatingMakeTrim';
const baseTowingCapacityUrl = 'https://www.generalrv.com/rebraco/DataNugget/GetTowRatingResultsDetailed';

// Define the years to scrape
const years = Array.from({ length: 26 }, (_, i) => 2025 - i); // Generates years from 2025 to 2000

// Limit the number of parallel requests to avoid overwhelming the server
const limit = promiseLimit(5);

// Helper function to introduce random timeouts between requests
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const getRandomTimeout = () => Math.floor(Math.random() * 3000) + 1000; // Between 1 and 4 seconds

// Function to get makes for a specific year
const getMakesForYear = async (year) => {
  try {
    const response = await axios.get(`${baseMfgUrl}?year=${year}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching makes for year ${year}:`, error.message);
    return [];
  }
};

// Function to get models for a specific make and year
const getModelsForMake = async (year, make) => {
  try {
    const response = await axios.get(`${baseModelUrl}?year=${year}&mfg=${make}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching models for make ${make} in year ${year}:`, error.message);
    return [];
  }
};

// Function to get towing capacity for a specific year, make, and model
const getTowingCapacity = async (year, make, model) => {
  try {
    const response = await axios.get(`${baseTowingCapacityUrl}?year=${year}&mfg=${make}&make=${model}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching towing capacity for ${make} ${model} in year ${year}:`, error.message);
    return [];
  }
};

// Main function to scrape all the data
const scrapeAllData = async () => {
  const allData = [];

  // Iterate over all years
  await Promise.all(years.map(year =>
    limit(async () => {
      console.log(`Fetching data for year: ${year}`);

      // Step 1: Get makes for the current year
      const makes = await getMakesForYear(year);
      await sleep(getRandomTimeout()); // Random timeout

      // Step 2: Iterate over all makes
      for (const make of makes) {
        console.log(`Fetching models for make: ${make} in year: ${year}`);

        // Step 3: Get models for the current make and year
        const models = await getModelsForMake(year, make);
        await sleep(getRandomTimeout()); // Random timeout

        // Step 4: Iterate over all models
        for (const model of models) {
          console.log(`Fetching towing capacity for ${make} ${model} in year: ${year}`);

          // Step 5: Get towing capacity for the current make and model
          const towingDetails = await getTowingCapacity(year, make, model);
          await sleep(getRandomTimeout()); // Random timeout

          // Step 6: Add all towing details to the final dataset
          for (const detail of towingDetails) {
            allData.push({
              Year: year,
              Make: make,
              ModelTrim: model,
              TowingCapacity: detail
            });
          }
        }
      }
    })
  ));

  // Save the data to outputdata.json
  fs.writeFileSync('outputdata.json', JSON.stringify(allData, null, 2), 'utf-8');
  console.log('Data scraping complete. Saved to outputdata.json');
};

// Run the scraper
scrapeAllData();