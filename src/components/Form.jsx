import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function FormUser({ isFormOpen, closeForm }) {
  const [input1, setInput1] = useState("");  // Для фамилии
  const [input2, setInput2] = useState("");  // Для имени
  const [input3, setInput3] = useState("");  // Для отчества

  // Обработчик изменения значений инпутов
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "input1") {
      setInput1(value);
    } else if (name === "input2") {
      setInput2(value);
    } else if (name === "input3") {
      setInput3(value);
    }
  };

  // Обработчик закрытия формы
  const handleClose = () => {
    if (closeForm) closeForm(); // Вызов переданного колбэка для закрытия формы
  };

   if (!isFormOpen) return null; // Если форма не открыта, ничего не рендерим

  return (
    <div className="custom-component">
      <div className="close-btn" onClick={handleClose}>
        &times;
      </div>
      <div className="input-container">
        <h2>Если абонент новый, заполните форму</h2>
        <pre>если нет, просто закройте её</pre>
        <Input
          id="surname"
          type="text"
          name="input1"
          placeholder="Введите фамилию"
          value={input1}
          onChange={handleInputChange}
        />
        <Input
          id="name"
          type="text"
          name="input2"
          placeholder="Введите имя"
          value={input2}
          onChange={handleInputChange}
        />
        <Input
          id="patronymic"
          type="text"
          name="input3"
          placeholder="Введите отчество"
          value={input3}
          onChange={handleInputChange}
        />
        <Button name="Записать" />
      </div>
    </div>
  );
}

export function FormInfo({ isFormOpen, closeForm }) {
    // Обработчик закрытия формы
  const handleClose = () => {
    if (closeForm) closeForm(); // Вызов переданного колбэка для закрытия формы
  };

   if (!isFormOpen) return null; // Если форма не открыта, ничего не рендерим

  return (
    <div className="custom-component">
      <div className="close-btn" onClick={handleClose}>
        &times;
      </div>
      <div className="input-container">
        <h2>Внимание</h2>
        <pre>В данной версии приложения 
            функции из расширенной настройки, 
            вынесены в меню в верхнем правом углу.</pre>
      </div>
    </div>
  );
}