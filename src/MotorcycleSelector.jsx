import { useState, useEffect } from 'react';
import Selector from './Selector';
import { fetchData } from './utils/utils';

const MotorcycleSelector = ({ onMotorcycleSelect }) => {
    const [makes, setMakes] = useState([]);
    const [chosenMake, setChosenMake] = useState('');
    const [chosenYear, setChosenYear] = useState('');
    const [models, setModels] = useState(null);

    useEffect(() => {
        const formatAndSetMakes = (data) => {
            const modelObjects = data.reduce((acc, make) => {
                acc[make.normalizedName] = make;
                return acc;
            }, {});
            setMakes(modelObjects);
        };
        fetchData('./data/motorcycle_data/MOTO_MAKES.json', formatAndSetMakes, "Error loading motorcycle makes");
    }, []);

    const handleMakeChange = async (make) => {
        setChosenMake(make);
        setChosenYear('');
    };

    const handleYearChange = async (year) => {
        setChosenYear(year);
        const url = `./data/motorcycle_data/${chosenMake.normalizedName}_${year}.json`;
        fetchData(url, setModels, "Error fetching motorcycle models");
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Selector
                label="Motorcycle Make"
                value={chosenMake?.normalizedName || ''}
                options={Object.keys(makes).sort().map(makeKey => ({
                    value: makes[makeKey].normalizedName,
                    label: makes[makeKey].name
                }))}
                onChange={(e) => handleMakeChange(makes[e.target.value])}
            />
            {!!chosenMake && (
                <Selector
                    label="Motorcycle Year"
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
