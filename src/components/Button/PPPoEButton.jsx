import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';

export function PPPoEButton({ onClick, className = '' }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="startMenu"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faNetworkWired} />
      <div className="buttonText">
        <span className="upload-text">PPPoE</span>
      </div>
    </button>
  );
}
