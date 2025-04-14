import React from 'react';

export function ExpressButton({ onClick, text, closeButton }) {
  return (
    <button
      className="button blue"
      id={closeButton ? 'activeButton' : 'false'}
      onClick={onClick}
    >
      <div className="buttonText">
        <span className="upload-text">{text}</span>
      </div>
    </button>
  );
}
