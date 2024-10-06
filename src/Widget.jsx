import { Fragment } from 'react';
import styles from "./Widget.css?inline";
import { getCarrierData } from './data-utils.js';


const Widget = () => {

    const onClick = () => {
        const carrierData = getCarrierData();
        console.log(carrierData);
    };

    return (
        <Fragment>
            <style>{styles}</style>
            <h2>Mototote widget</h2>
            <p>Vehicle & Bike Fit Calculator</p>
            <button onClick={onClick}>Test</button>
        </Fragment>
    )
};

export default Widget
