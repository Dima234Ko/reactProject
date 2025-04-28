import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';

function FiltrButton({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faFilterCircleXmark} />
      <span className="upload-text">Отфильтровать запросы</span>
    </button>
  );
}

export default FiltrButton;
