const Selector = ({ label, value, options, onChange }) => (
    <div className="selector-group">
        <label>{label}</label>
        <select className="vehicle-select" value={value} onChange={onChange} required>
            <option value="" disabled>{`Select ${label.toLowerCase()}`}</option>
            {options.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
            ))}
        </select>
    </div>
);

export default Selector;