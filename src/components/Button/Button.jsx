import React from 'react';

export function Button({
  name,
  id,
  onClick,
  className = '',
  disabled = false,
}) {
  return (
    <button
      className={`button blue ${className}`}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}