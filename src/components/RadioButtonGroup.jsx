function RadioButtonGroup({
  options = {}, // Добавлено значение по умолчанию
  isVisible = true, // Добавлено значение по умолчанию
  onChange,
  selectedValue,
  layout = 'vertical', // Уже есть значение по умолчанию
  nameGroup = 'radioGroup', // Уже есть значение по умолчанию
  text = 'h5', // Уже есть значение по умолчанию
}) {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  // Проверяем, является ли text допустимым HTML-тегом
  const TextComponent = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
  ].includes(text)
    ? text
    : 'h5'; // Фallback на h5, если передан некорректный тег

  return (
    <div className="radio-group">
      {isVisible && (
        <div className={`radio-buttons radio-buttons--${layout}`}>
          {Object.entries(options).map(([value, label]) => (
            <label key={value} className="radio-label">
              <input
                type="radio"
                name={nameGroup}
                value={value}
                checked={selectedValue === value}
                onChange={handleChange}
                aria-label={label}
              />
              <TextComponent>{label}</TextComponent>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default RadioButtonGroup;
