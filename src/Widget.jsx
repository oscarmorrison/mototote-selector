import { Fragment, useState } from 'react';
import './Widget.css';
import VehicleSelector from './VehicleSelector';
import MotorcycleSelector from './MotorcycleSelector';
import CarrierSelector from './CarrierSelector';

const Widget = () => {
    const [chosenVehicle, setChosenVehicle] = useState(null);
    const [chosenMotorcycle, setChosenMotorcycle] = useState(null);

    console.log('chosenVehicle', chosenVehicle);
    console.log('chosenMotorcycle', chosenMotorcycle);

    const handleVehicleSelection = (vehicle) => {
        setChosenVehicle(vehicle);
        setChosenMotorcycle(null); // Reset motorcycle selection when vehicle changes
    };

    const handleMotorcycleSelection = (motorcycle) => {
        setChosenMotorcycle(motorcycle);
    };

    return (
        <Fragment>
            <h2>Vehicle & Bike Fit Calculator</h2>
            <p>
                Find out if you can haul your bike with your vehicle and which MotoTote
                carrier works best for you.
            </p>
            {!chosenVehicle ? (
                <VehicleSelector onVehicleSelect={handleVehicleSelection} />
            ) : (
                <Fragment>
                    <h3>
                        {chosenVehicle.MfgDesc} {chosenVehicle.MakeTrim} ({chosenVehicle.Year})
                    </h3>
                    <div><strong>Towing Capacity:</strong> {chosenVehicle.TowCapacity} lbs</div>
                    {!chosenMotorcycle ? (
                        <MotorcycleSelector onMotorcycleSelect={handleMotorcycleSelection} />
                    ) : (
                        <Fragment>
                            <div className="vehicle-details motorcycle-details">
                                <h3>
                                    {chosenMotorcycle.make} {chosenMotorcycle.model} ({chosenMotorcycle.year})
                                </h3>
                                <ul>
                                    <li><strong>Type:</strong> {chosenMotorcycle.type}</li>
                                    <li><strong>Weight:</strong> {chosenMotorcycle.wet_weight} kg</li>
                                    <li><strong>Tire Width (Front):</strong> {chosenMotorcycle.front_tire_width} inches</li>
                                    <li><strong>Tire Width (Rear):</strong> {chosenMotorcycle.rear_tire_width} inches</li>
                                    <li><strong>Wheelbase:</strong> {chosenMotorcycle.wheelbase} inches</li>
                                </ul>
                            </div>
                            <CarrierSelector />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Widget;