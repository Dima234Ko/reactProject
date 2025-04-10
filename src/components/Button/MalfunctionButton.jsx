import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandMineOn } from '@fortawesome/free-solid-svg-icons'; 

export function MalfunctionButton({ onClick, className = '', disabled }) {
  return (
    <button
      className={`upload-button ${className} ${disabled ? 'disabled' : ''}`}
      id="startMenu"
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={faLandMineOn} />
      <div className="buttonText">
        <span className="upload-text">Неисправность</span>
      </div>
    </button>
  );
}
