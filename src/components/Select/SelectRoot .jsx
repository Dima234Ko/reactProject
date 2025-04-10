import React from 'react';
import { Select } from './Select';  

export function SelectRoot({ onChange, value }) {
  const options = [
    { label: 'Без прав', value: 'noRoles' },
    { label: 'Монтажник', value: 'installer' },
    { label: 'Инженер', value: 'engineer' },
    { label: 'Администратор', value: 'admin' },
  ];

  return (
    <Select
      id="sel"
      options={options.map(option => option.value)}  
      onChange={onChange}
    />
  );
}
