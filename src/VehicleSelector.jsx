import { useState, useEffect } from 'react';
import Selector from './Selector';
import TrimSelector from './TrimSelector';
import { getAllVehicleMakes, getVehicleData } from './utils/data-utils';

const VehicleSelector = ({ onVehicleSelect }) => {
    const [makes, setMakes] = useState([]);
    const [chosenMake, setChosenMake] = useState('');
    const [chosenYear, setChosenYear] = useState('');
    const [chosenModel, setChosenModel] = useState('');
    const [models, setModels] = useState(null);
    const [availableYears, setAvailableYears] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadMakes = async () => {
            try {
                const makesList = await getAllVehicleMakes();
                setMakes(makesList);
            } catch (error) {
                console.error('Error loading vehicle makes:', error);
                setMakes([]);
            }
        };
        loadMakes();
    }, []);

    const handleMakeChange = async (event) => {
        const makeName = event.target.value;
        setChosenMake(makeName);
        setChosenYear('');
        setChosenModel('');
        setAvailableYears([]);
        setLoading(true);

        try {
            const vehicles = await getVehicleData(makeName);
            const years = [...new Set(vehicles.map(v => v.Year))];
            setAvailableYears(years.sort().reverse());
        } catch (error) {
            console.error('Error loading vehicle data:', error);
            setAvailableYears([]);
        } finally {
            setLoading(false);
        }
    };

    const handleYearChange = async (year) => {
        setChosenYear(year);
        setChosenModel('');
        setLoading(true);

        try {
            const vehicles = await getVehicleData(chosenMake);
            const yearVehicles = vehicles.filter(v => v.Year === parseInt(year));

            const modelGroups = {};
            yearVehicles.forEach(vehicle => {
                if (!modelGroups[vehicle.MakeTrim]) {
                    modelGroups[vehicle.MakeTrim] = [];
                }
                modelGroups[vehicle.MakeTrim].push(vehicle);
            });

            setModels(modelGroups);
        } catch (error) {
            console.error('Error loading vehicle data:', error);
            setModels({});
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Selector
                label="Vehicle Make"
                value={chosenMake}
                options={makes.map(make => ({
                    value: make,
                    label: make.charAt(0).toUpperCase() + make.slice(1)
                }))}
                onChange={handleMakeChange}
            />
            {!!chosenMake && (
                <Selector
                    label="Vehicle Year"
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
                    label="Vehicle Model"
                    value={chosenModel}
                    options={Object.keys(models).sort().map(model => ({
                        value: model,
                        label: model
                    }))}
                    onChange={(e) => setChosenModel(e.target.value)}
                />
            )}
            {!!chosenModel && (
                <TrimSelector
                    trimOptions={models[chosenModel]}
                    selectVehicle={onVehicleSelect}
                />
            )}
        </form>
    );
};

export default VehicleSelector;
