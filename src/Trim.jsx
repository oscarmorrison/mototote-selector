const Trim = ({ trim, selectVehicle }) => (
    <div>
        <h3>{trim.MfgDesc} {trim.MakeTrim} ({trim.Year})</h3>
        <ul>
            <li><strong>Drive Type:</strong> {trim.DriveTypeDesc}</li>
            <li><strong>Engine:</strong> {trim.Engine}</li>
            <li><strong>Transmission:</strong> {trim.Trans}</li>
            <li><strong>Type:</strong> {trim.TypeDesc}</li>
            <li><strong>Towing Capacity:</strong> {trim.TowCapacity} lbs</li>
            <li><strong>Towing Description:</strong> {trim.TowDesc}</li>
            <li><strong>Notes:</strong> {trim.Notes}</li>
        </ul>
        <button className="select-button" onClick={() => selectVehicle(trim)}>Select Vehicle</button>
    </div>
);

export default Trim;