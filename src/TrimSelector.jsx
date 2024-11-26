import Trim from './Trim';

const TrimSelector = ({ trimOptions, selectVehicle }) => (
    <div>
        {trimOptions.map(trim => (
            <Trim key={trim.MakeTrim} trim={trim} selectVehicle={selectVehicle} />
        ))}
    </div>
);

export default TrimSelector;