import React from 'react';
import Select from './Select';

function SelectRoot({ onChange, value }) {
  const options = ['noRoles', 'installer', 'engineer', 'admin'];

  return (
    <Select
      id="sel"
      options={options}
      value={value}
      onChange={onChange} 
    />
  );
}


export default SelectRoot;
