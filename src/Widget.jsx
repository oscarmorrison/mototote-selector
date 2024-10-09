import { Fragment, useState, useEffect } from 'react';
import './Widget.css'; // Import the CSS file directly

const Widget = () => {
    // User selected
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
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
        setMake(makes[selectedMake]);
        setModel('');
        setYear('');

//         if (selectedMake) {
//             try {
//                 // Fetch the models from the specified relative URL
//                 const response = await fetch(`./data/${selectedMake}.json`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const models = await response.json();
//                 setModels(models);
//             } catch (error) {
//                 console.error('Error fetching models:', error);
//                 setModels([]); // Reset models on error
//             }
//         }
    };

    const handleYearChange = async (e) => {
        const selectedYear = e.target.value;
        setYear(selectedYear);
    
        if (selectedYear) {
            try {
                const response = await fetch(`./data/${make.normalizedName}_${selectedYear}.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const models = await response.json();
                console.log('models', models);
                setModels(models);
            } catch (error) {
                console.error('Error fetching models:', error);
                setModels([]); // Reset models on error
            }
        }
    };

    console.log('User selected', make.normalizedName, year);

    return (
        <Fragment>
            <h2>Vehicle & Bike Fit Calculator</h2>
            <p>
                Find out if you can haul your bike with your vehicle and which MotoTote
                carrier works best for you.
            </p>
            <form onSubmit={() => null}>
                <div>
                    <MakeSelector make={make} makes={makes} handleMakeChange={handleMakeChange} />
                    {!!make && <YearSelector year={year} years={make.years} handleYearChange={handleYearChange} />}
                </div>
            </form>
        </Fragment>
    );
};

const MakeSelector = (props) => {
    const value = props.make && props.make.normalizedName || '';
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
    const { year, years } = props;
    if (! years || years.length === 0) {
        return null;
    }

    return (
        <Fragment>
            <label htmlFor='make'>Year</label>
            <select id='make' value={props.year} onChange={props.handleYearChange} required>
                <option value='' disabled>Select the year</option>
                {years.sort().reverse().map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </Fragment>
    );
}

export default Widget;
