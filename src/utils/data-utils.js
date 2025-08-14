import Papa from 'papaparse';
import carriersCSV from '../data/mototote_carrier_metrics.csv?raw'

const getCarrierData = async () => {
    const data = Papa.parse(carriersCSV, {
        header: true
    }).data;

    return data;
};

export { getCarrierData };
