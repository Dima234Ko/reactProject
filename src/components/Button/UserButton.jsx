import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

export function UserButton({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faUserPen} />
      <span className="upload-text">Уточнить пользователя</span>
    </button>
  );
}