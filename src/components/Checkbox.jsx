import React from 'react';

export function Checkbox({ label, id, checked, onChange }) {
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
      />
      <span className="checkbox-checkmark"></span>
      <h4>{label}</h4>
    </label>
  );
}
