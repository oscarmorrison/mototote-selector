import { Fragment, useState, useEffect } from 'react';
import './Widget.css'; // Import the CSS file directly

const Widget = () => {
    // User selected
    const [chosenMake, setChosenMake] = useState('');
    const [chosenYear, setChosenYear] = useState('');
    const [chosenModel, setChosenModel] = useState('');

    // Data driven
    const [models, setModels] = useState([]);
    const [makes, setMakes] = useState([]);

    const loadMakesData = () => {
        fetch('./data/MAKES.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const makes = data.reduce((makes, make) => {
                    makes[make.normalizedName] = make;                    
                    return makes;
                }, {});
                setMakes(makes);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    useEffect(() => {
        loadMakesData();
    }, []);

    const handleMakeChange = async (e) => {
        const selectedMake = e.target.value;
        console.log('Make: ', selectedMake);
        console.log('Make: ', makes[selectedMake]);
        setChosenMake(makes[selectedMake]);
        setChosenYear('');
        setChosenModel('');
    };

    const handleYearChange = async (e) => {
        const selectedYear = e.target.value;
        setChosenYear(selectedYear);
    
        if (selectedYear) {
            try {
                const response = await fetch(`./data/${chosenMake.normalizedName}_${selectedYear}.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const models = await response.json();
                setModels(models);
            } catch (error) {
                console.error('Error fetching models:', error);
                setModels([]); // Reset models on error
            }
        }
    };

    const handleModelChange = async (e) => {
        const selectedModel = e.target.value;
        setChosenModel(selectedModel);
    };

    console.log("models", models);

    return (
        <Fragment>
            <h2>Vehicle & Bike Fit Calculator</h2>
            <p>
                Find out if you can haul your bike with your vehicle and which MotoTote
                carrier works best for you.
            </p>
            <form onSubmit={() => null}>
                <div>
                    <MakeSelector chosenMake={chosenMake} makes={makes} handleMakeChange={handleMakeChange} />
                    {!!chosenMake && <YearSelector chosenYear={chosenYear} years={chosenMake.years} handleYearChange={handleYearChange} />}
                    {!!(models && models.length) && <ModelSelector chosenModel={chosenModel} models={models} handleModelChange={handleModelChange} />}

                </div>
            </form>
        </Fragment>
    );
};

const MakeSelector = (props) => {
    const value = props.chosenMake && props.chosenMake.normalizedName || '';
    return (
        <Fragment>
            <label htmlFor='make'>Make</label>
            <select id='make' value={value} onChange={props.handleMakeChange} required>
                <option value='' disabled>Select a make</option>
                {Object.keys(props.makes).sort().map(makeKey => (
                    <option key={makeKey} value={props.makes[makeKey].normalizedName}>
                        {props.makes[makeKey].name}
                    </option>
                ))}
            </select>
        </Fragment>
    );
};

const YearSelector = (props) => {
    const { chosenYear, years } = props;
    if (! years || years.length === 0) {
        return null;
    }

    return (
        <Fragment>
            <label htmlFor='make'>Year</label>
            <select id='make' value={chosenYear} onChange={props.handleYearChange} required>
                <option value='' disabled>Select the year</option>
                {years.sort().reverse().map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </Fragment>
    );
};

const ModelSelector = (props) => {
    const { models } = props;
    return (
        <Fragment>
            <label htmlFor='model'>Model</label>
            <select id='model' value={props.chosenModel} onChange={props.handleModelChange} required>
                <option value='' disabled>Select the model</option>
                {models.sort().map(model => (
                    <option key={model.ModelTrim} value={model.modelTrim}>
                        {model.ModelTrim}
                    </option>
                ))}
            </select>
        </Fragment>
    );
};

export default Widget;
