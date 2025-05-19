import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';

function DeleteUserButton({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faUserSlash} />
      <span className="upload-text">Запретить доступ</span>
    </button>
  );
}

export default DeleteUserButton;
