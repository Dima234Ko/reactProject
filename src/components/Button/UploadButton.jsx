import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';

export function UploadButton({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faFileImport} />
      <span className="upload-text">Добавить фото</span>
    </button>
  );
}
