import { useState, useEffect, useRef } from "react";

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
    { label: "Без прав", value: "noRoles" },
    { label: "Монтажник", value: "installer" },
    { label: "Инженер", value: "engineer" },
    { label: "Администратор", value: "admin" },
  ];

  return (
    <select className="some-input" value={value} onChange={onChange}>
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
    "auto",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
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
    "auto",
    "36",
    "40",
    "42",
    "44",
    "48",
    "149",
    "153",
    "157",
    "161",
    "165",
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
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Фильтрация опций на основе введенного текста
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
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
      (option) => option.toLowerCase() === inputValue.toLowerCase(),
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
          (option) => option.toLowerCase() === searchTerm.toLowerCase(),
        );
        if (!exactMatch && searchTerm !== "") {
          setSearchTerm("");
          onChange({ target: { value: null } });
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchTerm, options, onChange]);

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
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
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            overflowY: "auto",
            margin: 0,
            padding: 0,
            listStyle: "none",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  background: option === searchTerm ? "#f0f0f0" : "white",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#f5f5f5")}
                onMouseLeave={(e) =>
                  (e.target.style.background =
                    option === searchTerm ? "#f0f0f0" : "white")
                }
              >
                {option}
              </li>
            ))
          ) : (
            <li style={{ padding: "8px 12px", color: "#666" }}>
              Нет вариантов
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
