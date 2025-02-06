export const Input = ({ id, type, placeholder, value, onChange }) => {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <input
      className="some-input"
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};
