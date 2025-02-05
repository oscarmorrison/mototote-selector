import { useState, useEffect } from 'react';
import { getCarrierData } from './utils/data-utils';

const isTestMode = new URLSearchParams(window.location.search).get('test') === 'true';

const CarrierSelector = ({ chosenMotorcycle, manualValues, tongueWeight }) => {
    const [carriers, setCarriers] = useState([]);
    const MOTOTOTE_WEIGHT = 60; // lbs

    useEffect(() => {
        const fetchCarriers = async () => {
            const carrierData = await getCarrierData();
            setCarriers(carrierData);
        };
        
        fetchCarriers();
    }, []);

    // Check if we have all required values
    const hasMissingData = !chosenMotorcycle?.wet_weight && !manualValues.wet_weight ||
        !chosenMotorcycle?.front_tire_width && !manualValues.front_tire_width ||
        !chosenMotorcycle?.rear_tire_width && !manualValues.rear_tire_width ||
        !chosenMotorcycle?.wheelbase && !manualValues.wheelbase ||
        !tongueWeight;

    if (hasMissingData) {
        return (
            <div className="carrier-selector">
                <div style={{ color: 'red', marginTop: '1rem' }}>
                    Please fill in all missing motorcycle specifications to see compatible carriers.
                </div>
            </div>
        );
    }

    // Calculate necessary values for compatibility check
    const bikeWeight = chosenMotorcycle?.wet_weight || parseFloat(manualValues.wet_weight);
    const frontTireWidth = chosenMotorcycle?.front_tire_width || parseFloat(manualValues.front_tire_width);
    const rearTireWidth = chosenMotorcycle?.rear_tire_width || parseFloat(manualValues.rear_tire_width);
    const wheelbase = chosenMotorcycle?.wheelbase || parseFloat(manualValues.wheelbase);

    const getCompatibleCarriers = () => {
        if (!carriers.length || !bikeWeight || !frontTireWidth || !rearTireWidth || !wheelbase) return [];

        return carriers.filter(carrier => {
            // Check total weight (bike + carrier) against tongue weight capacity
            const totalWeight = bikeWeight + MOTOTOTE_WEIGHT;
            if (totalWeight > tongueWeight) return false;
            if (totalWeight > parseFloat(carrier.weight_lbs)) return false;

            // Check tire width compatibility
            if (frontTireWidth > parseFloat(carrier.front_tire_width_inch)) return false;
            if (rearTireWidth > parseFloat(carrier.rear_tire_width_inch)) return false;

            // Check wheelbase compatibility
            if (wheelbase > parseFloat(carrier.wheelbase_inch)) return false;

            return true;
        });
    };

    const compatibleCarriers = getCompatibleCarriers();

    return (
        <div className="carrier-selector">
            <h3>Compatible Carriers ({compatibleCarriers.length} of {carriers.length})</h3>
            <div className="carrier-list">
                {compatibleCarriers.map(carrier => (
                    <div key={carrier.key} className="carrier-item">
                        <div className="carrier-image">
                            {carrier.image && (
                                <img 
                                    src={carrier.image} 
                                    alt={carrier.carrier_name}
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            )}
                        </div>
                        <div className="carrier-details">
                            <h4>{carrier.carrier_name}</h4>
                            <ul>
                                <li>Max Weight: {carrier.weight_lbs} lbs</li>
                                <li>Max Wheelbase: {carrier.wheelbase_inch}"</li>
                                <li>Tire Width Capacity: {carrier.front_tire_width_inch}" front, {carrier.rear_tire_width_inch}" rear</li>
                            </ul>
                            <a href={carrier.url} target="_blank" rel="noopener noreferrer">
                                View Details
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {isTestMode && (
                <div className="carrier-calculations">
                    <h5>Calculations:</h5>
                    <ul>
                        <li>Total Weight: {bikeWeight + MOTOTOTE_WEIGHT} lbs</li>
                        <li>Front Tire Width: {frontTireWidth}"</li>
                        <li>Rear Tire Width: {rearTireWidth}"</li>
                        <li>Wheelbase: {wheelbase}"</li>
                    </ul>
                </div>
            )}

            {compatibleCarriers.length === 0 && carriers.length > 0 && (
                <div style={{ color: 'red', marginTop: '1rem' }}>
                    No compatible carriers found. Please check your motorcycle specifications.
                </div>
            )}
        </div>
    );
};

export default CarrierSelector;