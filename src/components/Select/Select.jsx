import React from 'react';

function Select({ id, options, value, onChange }) {
  return (
    <select className="some-input" id={id} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
