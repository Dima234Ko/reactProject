import React from 'react';
import { Select } from './Select';

export function SelectSSID({ value, onChange }) {
  const options = [
    'auto',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
  ];

  return (
    <Select
      id="selectSSID2_4"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}
