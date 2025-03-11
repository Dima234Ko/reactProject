import React from "react";

export function RadioButtonGroup({
  options,
  isVisible,
  onChange,
  selectedValue,
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
            <label key={value} style={{ display: "block", margin: "10px 0" }}>
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
