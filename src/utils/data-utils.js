import Papa from 'papaparse';
import carriersCSV from '../data/mototote_carrier_metrics.csv?raw';

// Cache for loaded data
const dataCache = {
    index: null,
    vehicles: {},
    motorcycles: {}
};

// Load index data
const loadIndexData = async () => {
    if (dataCache.index) return dataCache.index;

    try {
        const response = await fetch('./index.json');
        if (!response.ok) throw new Error('Failed to load index data');
        dataCache.index = await response.json();
        return dataCache.index;
    } catch (error) {
        console.error('Error loading index data:', error);
        return { vehicles: [], motorcycles: [] };
    }
};

const getCarrierData = async () => {
    const data = Papa.parse(carriersCSV, {
        header: true
    }).data;

    return data;
};

const getVehicleData = async (make) => {
    // Check cache first
    if (dataCache.vehicles[make]) {
        return dataCache.vehicles[make];
    }

    try {
        const response = await fetch(`./vehicle_${make}.json`);
        if (!response.ok) throw new Error(`Failed to load ${make} data`);
        const data = await response.json();
        dataCache.vehicles[make] = data;
        return data;
    } catch (error) {
        console.error(`Error loading ${make} vehicle data:`, error);
        return [];
    }
};

const getMotorcycleData = async (brand) => {
    // Check cache first
    if (dataCache.motorcycles[brand]) {
        return dataCache.motorcycles[brand];
    }

    try {
        const response = await fetch(`./motorcycle_${brand}.json`);
        if (!response.ok) throw new Error(`Failed to load ${brand} data`);
        const data = await response.json();
        dataCache.motorcycles[brand] = data;
        return data;
    } catch (error) {
        console.error(`Error loading ${brand} motorcycle data:`, error);
        return [];
    }
};

const getAllVehicleMakes = async () => {
    const indexData = await loadIndexData();
    return indexData.vehicles || [];
};

const getAllMotorcycleBrands = async () => {
    const indexData = await loadIndexData();
    return indexData.motorcycles || [];
};

export {
    getCarrierData,
    getVehicleData,
    getMotorcycleData,
    getAllVehicleMakes,
    getAllMotorcycleBrands
};
