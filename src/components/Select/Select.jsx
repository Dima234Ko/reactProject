import React, { useState, useRef, useEffect } from 'react';

function Select({ id, options = [], value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`dropdown-select ${open ? 'open' : ''}`} id={id} ref={dropdownRef}>
      <button
        className="dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value || 'Выбрать...'}
        <span className="arrow">▼</span>
      </button>

      {open && options.length > 0 && (
        <ul className="dropdown-menu" role="listbox">
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={option === value}
              className={`dropdown-item ${option === value ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;


