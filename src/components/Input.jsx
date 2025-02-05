import { useState } from 'react';

export function InputNTU({ onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="input-ntu">
      <input
        className="some-input"
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
