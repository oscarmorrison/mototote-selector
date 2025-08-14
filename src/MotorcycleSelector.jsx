import { useState, useEffect } from 'react';
import Selector from './Selector';
import { getAllMotorcycleBrands, getMotorcycleData } from './utils/data-utils';

const MotorcycleSelector = ({ onMotorcycleSelect }) => {
    const [brands, setBrands] = useState([]);
    const [chosenBrand, setChosenBrand] = useState('');
    const [chosenYear, setChosenYear] = useState('');
    const [models, setModels] = useState(null);
    const [availableYears, setAvailableYears] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadBrands = async () => {
            try {
                const brandsList = await getAllMotorcycleBrands();
                setBrands(brandsList);
            } catch (error) {
                console.error('Error loading motorcycle brands:', error);
                setBrands([]);
            }
        };
        loadBrands();
    }, []);

    const handleBrandChange = async (brand) => {
        setChosenBrand(brand);
        setChosenYear('');
        setAvailableYears([]);
        setLoading(true);

        try {
            const motorcycles = await getMotorcycleData(brand);
            const years = [...new Set(motorcycles.map(m => m.year))];
            setAvailableYears(years.sort().reverse());
        } catch (error) {
            console.error('Error loading motorcycle data:', error);
            setAvailableYears([]);
        } finally {
            setLoading(false);
        }
    };

    const handleYearChange = async (year) => {
        setChosenYear(year);
        setLoading(true);

        try {
            const motorcycles = await getMotorcycleData(chosenBrand);
            const yearMotorcycles = motorcycles.filter(m => m.year === parseInt(year));
            setModels(yearMotorcycles);
        } catch (error) {
            console.error('Error loading motorcycle data:', error);
            setModels([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Selector
                label="Motorcycle Make"
                value={chosenBrand}
                options={brands.map(brand => ({
                    value: brand,
                    label: brand.charAt(0).toUpperCase() + brand.slice(1)
                }))}
                onChange={(e) => handleBrandChange(e.target.value)}
            />
            {!!chosenBrand && (
                <Selector
                    label="Motorcycle Year"
                    value={chosenYear}
                    options={availableYears.map(year => ({
                        value: year,
                        label: year
                    }))}
                    onChange={(e) => handleYearChange(e.target.value)}
                    disabled={loading}
                />
            )}
            {!!models && (
                <Selector
                    label="Motorcycle Model"
                    value=""
                    options={models.map(({ make, model, type }) => ({
                        value: `${make}_${model}`,
                        label: `${model} - ${type}`
                    }))}
                    onChange={(e) => {
                        const selectedModel = models.find(({ make, model }) =>
                            `${make}_${model}` === e.target.value);
                        onMotorcycleSelect(selectedModel);
                    }}
                />
            )}
        </form>
    );
};

export default MotorcycleSelector;
