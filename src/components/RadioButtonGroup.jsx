export function RadioButtonGroup({
  options,
  isVisible,
  onChange,
  selectedValue, // Используем как начальное значение
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="radio-group">
      {isVisible && (
        <div className="radio-buttons">
          {Object.entries(options).map(([value, label]) => (
            <label key={value} style={{ display: 'block', margin: '10px 0' }}>
              <input
                type="radio"
                name="radioGroup"
                value={value}
                checked={selectedValue === value} // Управляется через selectedValue
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
