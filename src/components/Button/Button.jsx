import React from 'react';

function Button({
  name,
  id,
  onClick,
  className = 'button blue',
  disabled = false,
}) {
  return (
    <button className={className} id={id} onClick={onClick} disabled={disabled}>
      {name}
    </button>
  );
}

export default Button;
