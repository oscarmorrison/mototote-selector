import { Fragment, useState } from 'react';
import styles from './Widget.css?inline'; // Assuming you still want to keep the CSS file

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

const MODELS = [
  'Model A',
  'Model B',
  // Add more models here
];

const YEARS = ['2020', '2021', '2022', '2023'];

const Widget = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleMakeChange = (e) => setMake(e.target.value);
  const handleModelChange = (e) => setModel(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Make: ${make}, Model: ${model}, Year: ${year}`);
  };

  return (
    <Fragment>
      <style>{`
                #root {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 2rem;
                    font-family: "Roboto", sans-serif;
                    background-color: #fff;
                }

                h2 {
                    font-size: 2rem;
                    text-align: center;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                p {
                    font-size: 1.2rem;
                    text-align: center;
                    margin-bottom: 2rem;
                }

                form {
                    display: flex;
                    flex-direction: column;
                    max-width: 600px;
                    margin: 0 auto;
                    text-align: left;
                }

                label {
                    font-size: 1rem;
                    margin-bottom: 0.5rem;
                    display: block;
                }

                select {
                    width: 100%;
                    padding: 0.75rem;
                    margin-bottom: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1.1rem;
                    background-color: #fff;
                    transition: border-color 0.3s, box-shadow 0.3s;
                }

                select:focus {
                    border-color: #007BFF;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                    outline: none;
                }

                input[type="checkbox"] {
                    margin-right: 0.5rem;
                }

                button {
                    padding: 1rem;
                    border: none;
                    border-radius: 4px;
                    background-color: #007BFF;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    margin-top: 1rem;
                    width: 100%;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #0056b3;
                }
            `}</style>

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
          >
            <option value='' disabled>
              Select a model
            </option>
            {MODELS.map((modelOption) => (
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
