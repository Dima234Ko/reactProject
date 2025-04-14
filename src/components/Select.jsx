import { useState, useEffect, useRef } from 'react';

export function Select({ id, options, value, onChange }) {
  return (
    <select className="some-input" id={id} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function SelectRoot({ onChange, value }) {
  const options = [
    { label: 'Без прав', value: 'noRoles' },
    { label: 'Монтажник', value: 'installer' },
    { label: 'Инженер', value: 'engineer' },
    { label: 'Администратор', value: 'admin' },
  ];

  return (
    <select className="some-input" id="sel" value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function SelectSSID({ value, onChange }) {
  const options = [
    'auto',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
  ];
  return (
    <Select
      id="selectSSID2_4"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

export function SelectSSID5({ value, onChange }) {
  const options = [
    'auto',
    '36',
    '40',
    '44',
    '48',
    '149',
    '153',
    '157',
    '161',
    '165',
  ];
  return (
    <Select
      id="selectSSID5"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

export function DropdownSelect({ id, options, value, onChange }) {
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Фильтрация опций на основе введенного текста
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Обработка выбора опции
  const handleSelect = (selectedOption) => {
    setSearchTerm(selectedOption);
    onChange({ target: { value: selectedOption } });
    setIsOpen(false);
  };

  // Обработка изменения текста в поле ввода
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setIsOpen(true);

    // Проверяем, есть ли точное совпадение среди опций
    const exactMatch = options.find(
      (option) => option.toLowerCase() === inputValue.toLowerCase()
    );
    // Если точного совпадения нет, устанавливаем value в null
    onChange({ target: { value: exactMatch || null } });
  };

  // Закрытие списка при клике вне компонента и проверка значения
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // Проверяем, соответствует ли searchTerm опции, иначе сбрасываем в null
        const exactMatch = options.find(
          (option) => option.toLowerCase() === searchTerm.toLowerCase()
        );
        if (!exactMatch && searchTerm !== '') {
          setSearchTerm('');
          onChange({ target: { value: null } });
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchTerm, options, onChange]);

  return (
    <div ref={dropdownRef} className="dropdownContainer">
      <input
        type="text"
        id={id}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder="Введите имя пользователя"
        className="some-input"
      />

      {isOpen && (
        <ul className="dropdownList">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                className="dropdownElement"
                key={option}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="dropdownEmpty">Нет вариантов</li>
          )}
        </ul>
      )}
    </div>
  );
}
