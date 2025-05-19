import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons';

function NewConnectionButton({ onClick, className = '', disabled }) {
  return (
    <button
      className={`upload-button ${className} ${disabled ? 'disabled' : ''}`}
      id="startMenu"
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={faCircleNodes} />
      <div className="buttonText">
        <span className="upload-text">Подключение</span>
      </div>
    </button>
  );
}

export default NewConnectionButton;
