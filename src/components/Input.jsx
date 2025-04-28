import { useState } from 'react';

function Input({ id, type, placeholder, value, onChange, disabled, onBlur, onKeyDown }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    if (!disabled) {
      onChange(event);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {type === 'password' ? (
        <div className="input-content">
          <input
            className="some-input"
            id={id}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={togglePasswordVisibility}
            disabled={disabled}
          >
            {showPassword ? '👁️‍🗨️' : '👁️'}
          </button>
        </div>
      ) : (
        <input
          className="some-input"
          id={id}
          type={type}
          placeholder={placeholder}
          value={value || ''}
          onChange={handleChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      )}
    </>
  );
}

export default Input;