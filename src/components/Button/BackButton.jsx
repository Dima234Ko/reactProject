import React from 'react';
import { TbArrowBackUp } from 'react-icons/tb';

export function BackButton({ onClick, className = '' }) {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
       <TbArrowBackUp size={24} />
    </button>
  );
}