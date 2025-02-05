import { Fragment, useState, useEffect } from 'react';
import './Widget.css';
import VehicleSelector from './VehicleSelector';
import MotorcycleSelector from './MotorcycleSelector';
import CarrierSelector from './CarrierSelector';

const Widget = () => {
    const [chosenVehicle, setChosenVehicle] = useState(null);
    const [chosenMotorcycle, setChosenMotorcycle] = useState(null);
    const [manualValues, setManualValues] = useState({
        wet_weight: '',
        front_tire_width: '',
        rear_tire_width: '',
        wheelbase: ''
    });
    const [aftermarketHitch, setAftermarketHitch] = useState(false);

    const isTestMode = new URLSearchParams(window.location.search).get('test') === 'true';

    useEffect(() => {
        if (chosenVehicle && !chosenVehicle.TowCapacity) {
            setAftermarketHitch(true);
        }
    }, [chosenVehicle]);

    const handleVehicleSelection = (vehicle) => {
        setChosenVehicle({
            ...vehicle,
            tongueWeight: vehicle.TowCapacity ? vehicle.TowCapacity * 0.1 : 0
        });
        setChosenMotorcycle(null); // Reset motorcycle selection when vehicle changes
    };

    const handleMotorcycleSelection = (motorcycle) => {
        setChosenMotorcycle(motorcycle);
    };

    const handleTestFill = () => {
        const vehicles = [
            {
                Year: 2020,
                TypeDesc: "Sport Utility Vehicle",
                MfgDesc: "Acura",
                MakeTrim: "RDX",
                DriveTypeDesc: "All-Wheel Drive",
                Engine: "2.0L Turbo Aluminum-Alloy I4",
                Trans: "10-Speed Automatic",
                Notes: "Requires: SH-AWD  trim level.  Note: Automatic transmission fluid cooler (ATF) required for max towing. Consult Acura dealer for details.",
                TowDesc: "Bumper Pull - Weight Carrying",
                TowCapacity: null
            },
            {
                Year: 2020,
                TypeDesc: "Sport Utility Vehicle",
                MfgDesc: "Acura",
                MakeTrim: "RDX",
                DriveTypeDesc: "All-Wheel Drive",
                Engine: "2.0L Turbo Aluminum-Alloy I4",
                Trans: "10-Speed Automatic",
                Notes: "Requires: SH-AWD  trim level.  Note: Automatic transmission fluid cooler (ATF) required for max towing. Consult Acura dealer for details.",
                TowDesc: "Bumper Pull - Weight Carrying",
                TowCapacity: 1500
            },
            {
                Year: 2023,
                TypeDesc: "Sport Utility Vehicle",
                MfgDesc: "Honda",
                MakeTrim: "Pilot",
                DriveTypeDesc: "All-Wheel Drive",
                Engine: "3.5L VTEC V-6",
                Trans: "9-Speed Automatic",
                Notes: "Requires: ATF Cooler for max towing of 5000 pounds.",
                TowDesc: "Bumper Pull - Weight Carrying",
                TowCapacity: 5000
            },
            {
                Year: 2024,
                TypeDesc: "Pickup Truck",
                MfgDesc: "Ford",
                MakeTrim: "F-150",
                DriveTypeDesc: "4x4",
                Engine: "3.5L EcoBoost V6",
                Trans: "10-Speed Automatic",
                Notes: "Requires Class III trailer hitch package",
                TowDesc: "Bumper Pull - Weight Carrying",
                TowCapacity: 8200
            },
            {
                Year: 2024,
                TypeDesc: "Sport Utility Vehicle",
                MfgDesc: "Toyota",
                MakeTrim: "4Runner",
                DriveTypeDesc: "4x4",
                Engine: "4.0L V6",
                Trans: "5-Speed Automatic",
                Notes: "With factory tow package",
                TowDesc: "Bumper Pull - Weight Carrying",
                TowCapacity: 5000
            }
        ];

        // Random motorcycle selection
        const motorcycles = [
            {
                key: "harley-davidson",
                url: "https://bikez.com/motorcycles/harley-davidson_sportster_s_2024.php",
                make: "Harley-Davidson",
                model: "Sportster S",
                year: 2024,
                type: "Sport",
                wet_weight: null,
                front_tire_width: 6.3,
                rear_tire_width: 7.09,
                wheelbase: 59.8
            },
            {
                key: "honda",
                url: "https://bikez.com/motorcycles/honda_rebel_500_abs_2019.php",
                make: "Honda",
                model: "Rebel 500 ABS",
                year: 2019,
                type: "Custom / cruiser",
                wet_weight: 414,
                front_tire_width: 5.12,
                rear_tire_width: 5.91,
                wheelbase: null
            },
            {
                key: "honda",
                url: "https://bikez.com/motorcycles/honda_vfr800f_2020.php",
                make: "Honda",
                model: "VFR800F",
                year: 2020,
                type: "Sport touring",
                wet_weight: 533.5,
                front_tire_width: 4.72,
                rear_tire_width: 7.09,
                wheelbase: 57.5
            },
            {
                key: "electric-bike",
                url: "https://example.com/rad-power-bike",
                make: "Rad Power Bikes",
                model: "RadRunner Plus",
                year: 2024,
                type: "Electric Bicycle",
                wet_weight: 150,
                front_tire_width: 3.3,
                rear_tire_width: 3.3,
                wheelbase: 44.5
            },
            {
                key: "triumph",
                url: "https://example.com/triumph-rocket",
                make: "Triumph",
                model: "Rocket 3 GT",
                year: 2024,
                type: "Cruiser",
                wet_weight: 892,
                front_tire_width: 5.9,
                rear_tire_width: 8.1,
                wheelbase: 66
            },
            {
                key: "kawasaki",
                url: "https://example.com/kawasaki-z400",
                make: "Kawasaki",
                model: "Z400",
                year: 2024,
                type: "Sport",
                wet_weight: 368,
                front_tire_width: 4.5,
                rear_tire_width: 5.9,
                wheelbase: 53.9
            }
        ];

        const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        const randomMotorcycle = motorcycles[Math.floor(Math.random() * motorcycles.length)];

        setChosenVehicle(randomVehicle);
        setChosenMotorcycle(randomMotorcycle);
    };

    const handleManualInput = (field, value) => {
        setManualValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleManualTongueWeightChange = (value) => {
        setChosenVehicle(prevVehicle => ({
            ...prevVehicle,
            tongueWeight: parseInt(value)
        }));
    };

    const getTowingCapacity = () => {
        return chosenVehicle?.TowCapacity || 0;
    };

    const hasValidTongueWeight = () => {
        return chosenVehicle?.tongueWeight;
    };

    return (
        <Fragment>
            {isTestMode && <button onClick={handleTestFill}>Test Fill</button>}
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
                    <div className="towing-details">
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={aftermarketHitch}
                                    onChange={(e) => setAftermarketHitch(e.target.checked)}
                                    disabled={!chosenVehicle.TowCapacity}
                                /> Aftermarket hitch
                            </label>
                        </div>
                        {(!chosenVehicle.TowCapacity || aftermarketHitch) && (
                            <div style={{ color: !chosenVehicle.tongueWeight ? 'red' : 'inherit' }}>
                                <input
                                    type="number"
                                    value={chosenVehicle.tongueWeight}
                                    onChange={(e) => handleManualTongueWeightChange(e.target.value)}
                                    placeholder="Enter tongue weight"
                                    style={{ borderColor: !chosenVehicle.tongueWeight ? 'red' : 'inherit' }}
                                /> lbs
                            </div>
                        )}
                        {!aftermarketHitch && (
                            <div><strong>Towing Capacity:</strong> {getTowingCapacity()} lbs</div>
                        )}
                        <div><strong>Tongue Weight:</strong> {chosenVehicle.tongueWeight} lbs</div>
                    </div>
                    
                    {hasValidTongueWeight() ? (
                        !chosenMotorcycle ? (
                            <MotorcycleSelector onMotorcycleSelect={handleMotorcycleSelection} />
                        ) : (
                            <Fragment>
                                <div className="vehicle-details motorcycle-details">
                                    <h3>
                                        {chosenMotorcycle.make} {chosenMotorcycle.model} ({chosenMotorcycle.year})
                                    </h3>
                                    <ul>
                                        <li style={{ color: !chosenMotorcycle.wet_weight && !manualValues.wet_weight ? 'red' : 'inherit' }}>
                                            <strong>Weight:</strong>{' '}
                                            {chosenMotorcycle.wet_weight || 
                                                <>
                                                    <input
                                                        type="number"
                                                        value={manualValues.wet_weight}
                                                        onChange={(e) => handleManualInput('wet_weight', e.target.value)}
                                                        placeholder="Enter weight"
                                                    />
                                                    <div className="helper-text">
                                                        Typical weights: Standard: 400-500 lbs | Sport: 350-450 lbs | Cruiser/Touring: 600-900 lbs
                                                    </div>
                                                </>
                                            } lbs
                                        </li>
                                        <li style={{ color: !chosenMotorcycle.front_tire_width && !manualValues.front_tire_width ? 'red' : 'inherit' }}>
                                            <strong>Tire Width (Front):</strong>{' '}
                                            {chosenMotorcycle.front_tire_width ||
                                                <>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={manualValues.front_tire_width}
                                                        onChange={(e) => handleManualInput('front_tire_width', e.target.value)}
                                                        placeholder="Enter front width"
                                                    />
                                                    <div className="helper-text">Average front tire width: 4-4.7 inches</div>
                                                </>
                                            } inches
                                        </li>
                                        <li style={{ color: !chosenMotorcycle.rear_tire_width && !manualValues.rear_tire_width ? 'red' : 'inherit' }}>
                                            <strong>Tire Width (Rear):</strong>{' '}
                                            {chosenMotorcycle.rear_tire_width ||
                                                <>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={manualValues.rear_tire_width}
                                                        onChange={(e) => handleManualInput('rear_tire_width', e.target.value)}
                                                        placeholder="Enter rear width"
                                                    />
                                                    <div className="helper-text">Average rear tire width: 6-8 inches</div>
                                                </>
                                            } inches
                                        </li>
                                        <li style={{ color: !chosenMotorcycle.wheelbase && !manualValues.wheelbase ? 'red' : 'inherit' }}>
                                            <strong>Wheelbase:</strong>{' '}
                                            {chosenMotorcycle.wheelbase ||
                                                <>
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        value={manualValues.wheelbase}
                                                        onChange={(e) => handleManualInput('wheelbase', e.target.value)}
                                                        placeholder="Enter wheelbase"
                                                    />
                                                    <div className="helper-text">Average wheelbase: 54-63 inches</div>
                                                </>
                                            } inches
                                        </li>
                                    </ul>
                                </div>
                                <CarrierSelector 
                                    chosenMotorcycle={chosenMotorcycle}
                                    manualValues={manualValues}
                                    tongueWeight={chosenVehicle.tongueWeight || 0}
                                />
                            </Fragment>
                        )
                    ) : (
                        <div style={{ color: 'red' }}>
                            No compatible carriers found. Please check your motorcycle specifications and ensure you have a compatible Class III or IV hitch with a 2-inch receiver. {!chosenVehicle.TowCapacity && "An aftermarket hitch may be required for your vehicle."}
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Widget;
