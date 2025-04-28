import React from 'react';
import { TbArrowBackUp } from 'react-icons/tb';

function BackButton({ onClick, className = '' }) {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      <TbArrowBackUp size={24} />
    </button>
  );
}

export default BackButton;