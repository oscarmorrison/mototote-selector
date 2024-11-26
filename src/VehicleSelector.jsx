import { useState, useEffect } from 'react';
import Selector from './Selector';
import TrimSelector from './TrimSelector';
import { fetchData } from './utils/utils';

const VehicleSelector = ({ onVehicleSelect }) => {
    const [makes, setMakes] = useState([]);
    const [chosenMake, setChosenMake] = useState('');
    const [chosenYear, setChosenYear] = useState('');
    const [chosenModel, setChosenModel] = useState('');
    const [models, setModels] = useState(null);

    useEffect(() => {
        const formatAndSetMakes = (data) => {
            const modelObjects = data.reduce((acc, make) => {
                acc[make.normalizedName] = make;
                return acc;
            }, {});
            setMakes(modelObjects);
        };
        fetchData('./data/car_data/MAKES.json', formatAndSetMakes, "Error loading makes");
    }, []);

    const handleMakeChange = (event) => {
        const make_key = event.target.value;
        setChosenMake(makes[make_key]);
        setChosenYear('');
        setChosenModel('');
    };

    const handleYearChange = async (year) => {
        setChosenYear(year);
        setChosenModel('');
        const url = `./data/car_data/${chosenMake.normalizedName}_${year}.json`;
        fetchData(url, setModels, "Error fetching models");
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Selector
                label="Make"
                value={chosenMake?.normalizedName || ''}
                options={Object.keys(makes).sort().map(makeKey => ({
                    value: makes[makeKey].normalizedName,
                    label: makes[makeKey].name
                }))}
                onChange={handleMakeChange}
            />
            {!!chosenMake && (
                <Selector
                    label="Year"
                    value={chosenYear}
                    options={(chosenMake.years || []).sort().reverse().map(year => ({
                        value: year,
                        label: year
                    }))}
                    onChange={(e) => handleYearChange(e.target.value)}
                />
            )}
            {!!models && (
                <Selector
                    label="Model"
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