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
  const handleChange = (event) => {
    if (!disabled) {
      onChange(event);
    }
  };

  return (
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
  );
};