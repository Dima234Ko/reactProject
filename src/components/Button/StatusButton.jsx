import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';

function StatusButton({ onClick, className = '' }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="startMenu"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faUserCheck} />
      <div className="buttonText">
        <span className="upload-text">Статус NTU</span>
      </div>
    </button>
  );
}

export default StatusButton;
