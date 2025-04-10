import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'; 

export function DisconnectButton({ onClick, className = '', disabled }) {
  return (
    <button
      className={`upload-button ${className} ${disabled ? 'disabled' : ''}`}
      id="startMenu"
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={faUserSlash} />
      <div className="buttonText">
        <span className="upload-text">Отключение</span>
      </div>
    </button>
  );
}
