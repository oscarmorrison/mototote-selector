import { useState, useEffect } from 'react';
import { getCarrierData } from './utils/data-utils';


const CarrierSelector = () => {
    const [carriers, setCarriers] = useState();

    useEffect(() => {
        const fetchCarriers = async () => {
            const carriers = await getCarrierData();
            console.log('carriers', carriers);
            setCarriers(carriers);
        };
        
        fetchCarriers();
    }, []);

    return <div>CarrierSelector</div>;
};

export default CarrierSelector;