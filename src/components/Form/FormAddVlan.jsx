import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../Button/Button';

export function FormAddVlan({ setCreateSuccess, onClose }) {
  const [vlan, setVlan] = useState('');
  const [error, setError] = useState('');

  const isValidVlan = (value) => /^\d{2,4}$/.test(value);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setVlan(value);
    setError('');
  };

  const handleCreate = () => {
    if (!isValidVlan(vlan)) {
      setError('VLAN должен содержать от 2 до 4 цифр');
      return;
    }

    setCreateSuccess(vlan);
    setVlan('');
    setTimeout(() => {
      if (onClose) onClose();
    }, 1500);
  };

  const isButtonDisabled = !isValidVlan(vlan);

  return (
    <div className="input-container">
      <div className="textForm">
        <h2>Создать VLAN</h2>
        <pre>Укажите VLAN</pre>
        <div className="addVlan">
          <Input
            id="vlan"
            type="text"
            placeholder="Введите VLAN (2-4 цифры)"
            value={vlan}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {error && <div className="upload-result">{error}</div>}
      <Button name="ОК" onClick={handleCreate} disabled={isButtonDisabled} />
    </div>
  );
}
