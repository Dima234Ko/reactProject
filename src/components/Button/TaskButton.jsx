import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons'; 

export function TaskButton({ onClick, text }) {
  return (
    <button
      className="upload-button action-btn"
      id="activeButton"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChartLine} />
      <div className="buttonText">
        <span className="upload-text">{text}</span>
      </div>
    </button>
  );
}
