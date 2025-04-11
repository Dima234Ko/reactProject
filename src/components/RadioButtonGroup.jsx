export function RadioButtonGroup({
  options,
  isVisible,
  onChange,
  selectedValue,
  layout = 'vertical',
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="radio-group">
      {isVisible && (
        <div className={`radio-buttons radio-buttons--${layout}`}>
          {Object.entries(options).map(([value, label]) => (
            <label key={value}>
              <input
                type="radio"
                name="radioGroup"
                value={value}
                checked={selectedValue === value}
                onChange={handleChange}
              />
              {label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}