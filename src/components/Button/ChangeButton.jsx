import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsAslInterpreting } from '@fortawesome/free-solid-svg-icons';

function ChangeButton({ onClick, className = '' }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="startMenu"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faHandsAslInterpreting} />
      <div className="buttonText">
        <span className="upload-text">Замена NTU</span>
      </div>
    </button>
  );
}

export default ChangeButton;
