import React from 'react';
import Select from './Select';

function SelectSSID5({ value, onChange }) {
  const options = [
    'auto',
    '36',
    '40',
    '42',
    '44',
    '48',
    '149',
    '153',
    '157',
    '161',
    '165',
  ];

  return (
    <Select
      id="selectSSID5"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

export default SelectSSID5;
