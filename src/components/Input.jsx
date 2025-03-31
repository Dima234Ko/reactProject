import React, { useState } from "react";

export const Input = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  disabled,
  onBlur,
  onKeyDown,
}) => {
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
      {type === "password" ? (
        <div className="input-content">
          <input
            className="some-input"
            id={id}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value || ""}
            onChange={handleChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            style={{
              marginLeft: "-30px",
              marginTop: "18px",
              border: "none",
              background: "transparent",
              padding: 6,
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            {showPassword ? "👁️‍🗨️" : "👁️"}
          </button>
        </div>
      ) : (
        <input
          className="some-input"
          id={id}
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={handleChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      )}
    </>
  );
};
