import Papa from 'papaparse';
import carriersCSV from './data/carriers.csv?raw'

const getCarrierData = () => {
    const data = Papa.parse(carriersCSV, {
        header: false
    }).data.reduce((data, row) => {
        data[row[0]] = {
            title: row[1],
            url: row[2],
        };
        return data;
    }, ({}));

    return data;
};

export { getCarrierData };
