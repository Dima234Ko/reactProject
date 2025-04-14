import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';

export function ChangeEditUser({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faUnlock} />
      <span className="upload-text">Изменить пользователя</span>
    </button>
  );
}
