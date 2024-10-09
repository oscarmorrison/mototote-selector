import { Fragment, useState, useEffect } from 'react';
import './Widget.css'; // Import the CSS file directly

const Widget = () => {
    // User selected
    const [chosenMake, setChosenMake] = useState('');
    const [chosenYear, setChosenYear] = useState('');
    const [chosenModel, setChosenModel] = useState('');
    const [chosenVehicle, setChosenVehicle] = useState();

    // Data driven
    const [models, setModels] = useState(null);
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
        setChosenModel('');
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
                setModels(null); // Reset models on error
            }
        }
    };

    const handleModelChange = async (e) => {
        const selectedModel = e.target.value;
        setChosenModel(selectedModel);
    };

    const selectVehicle = (vehicle) => {
        console.log('chosenVehicle: ', chosenVehicle);
        setChosenVehicle(vehicle);
    };

    console.log('chosenModel: ', chosenModel);

    if (chosenVehicle) {
        return <VehicleDisplay chosenVehicle={chosenVehicle} />;
    }

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
                    {!!models && <ModelSelector chosenModel={chosenModel} models={models} handleModelChange={handleModelChange} />}
                    {!!chosenModel && <TrimSelector trimOptions={models[chosenModel]} selectVehicle={selectVehicle} />}
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
                {Object.keys(models).sort().map(model => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>
        </Fragment>
    );
};

const TrimSelector = (props) => {
    const { trimOptions, selectVehicle } = props;
    return (
        <Fragment>
            {trimOptions.map(trim => (<Trim trim={trim} selectVehicle={selectVehicle} />))}
        </Fragment>
    );
};


const Trim = ({trim, selectVehicle}) => {
    const onClick = (e) => {
        e.preventDefault();
        selectVehicle(trim);
    };

    return (
        <Fragment>
        <div>
            <h3>{trim.MfgDesc} {trim.MakeTrim} ({trim.Year})</h3>
            <ul>
                <li><strong>Drive Type:</strong> {trim.DriveTypeDesc}</li>
                <li><strong>Engine:</strong> {trim.Engine}</li>
                <li><strong>Transmission:</strong> {trim.Trans}</li>
                <li><strong>Type:</strong> {trim.TypeDesc}</li>
                <li><strong>Towing Capacity:</strong> {trim.TowCapacity} lbs</li>
                <li><strong>Towing Description:</strong> {trim.TowDesc}</li>
            </ul>
            <button className="select-button" onClick={onClick}>Select Vehicle</button>
            </div>
        </Fragment>
    );
};

const VehicleDisplay = (props) => {
    const { chosenVehicle } = props;
    return (
        <Fragment>
            <h3>{chosenVehicle.MfgDesc} {chosenVehicle.MakeTrim} ({chosenVehicle.Year})</h3>
            <div><strong>Towing Capacity:</strong> {chosenVehicle.TowCapacity} lbs</div>
        </Fragment>
    );
};

export default Widget;
