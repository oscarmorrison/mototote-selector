import { Fragment, useState, useEffect } from 'react';
import './Widget.css'; // Import the CSS file directly

const MAKES = [
  'Acura',
  'Audi',
  'BMW',
  'Buick',
  'Cadillac',
  'Chevrolet',
  'Dodge',
  'Ford',
  'GMC',
  'Honda',
  'Hyundai',
  'Infiniti',
  'Jeep',
  'Kia',
  'Land Rover',
  'Lexus',
  'Lincoln',
  'Mazda',
  'Mercedes-Benz',
  'Mitsubishi',
  'Nissan',
  'Porsche',
  'Ram',
  'Subaru',
  'Toyota',
  'Volkswagen',
  'Volvo',
];

const YEARS = ['2020', '2021', '2022', '2023'];

const Widget = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [models, setModels] = useState([]); // Initialize models as an empty array

  const handleMakeChange = async (e) => {
    const selectedMake = e.target.value;
    setMake(selectedMake);
    setModel(''); // Reset model when make changes
    setModels([]); // Reset models when make changes

    if (selectedMake) {
      try {
        // Fetch the models from the specified relative URL
        const response = await fetch(`./data/${selectedMake}.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Print out the received data
        console.log('Received data:', data);

        // Extract model names from the response object
        const modelNames = Object.keys(data);
        setModels(modelNames); // Update models state with the model names
      } catch (error) {
        console.error('Error fetching models:', error);
        setModels([]); // Reset models on error
      }
    }
  };

  const handleModelChange = (e) => setModel(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Make: ${make}, Model: ${model}, Year: ${year}`);
  };

  return (
    <Fragment>
      <h2>Vehicle & Bike Fit Calculator</h2>
      <p>
        Find out if you can haul your bike with your vehicle and which MotoTote
        carrier works best for you.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='make'>Make</label>
          <select id='make' value={make} onChange={handleMakeChange} required>
            <option value='' disabled>
              Select a make
            </option>
            {MAKES.map((makeOption) => (
              <option key={makeOption} value={makeOption}>
                {makeOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='model'>Model</label>
          <select
            id='model'
            value={model}
            onChange={handleModelChange}
            required
            disabled={models.length === 0} // Disable if no models are available
          >
            <option value='' disabled>
              Select a model
            </option>
            {models.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='year'>Year</label>
          <select id='year' value={year} onChange={handleYearChange} required>
            <option value='' disabled>
              Select a year
            </option>
            {YEARS.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </Fragment>
  );
};

export default Widget;
