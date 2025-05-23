import React from 'react';
import { IoMenu } from 'react-icons/io5';

function MenuButton({ onClick, className = '' }) {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      <IoMenu size={24} />
    </button>
  );
}

export default MenuButton;
