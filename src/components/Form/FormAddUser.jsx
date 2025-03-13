import React, { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { requestAPI } from "../../functions/api";

export function FormAddUser({
  isCreating,
  setIsCreating,
  setCreateSuccess,
  onClose
}) {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    login: "",
    password: "",
    root: ""
  });
  const [resultForm, setResultForm] = useState("");
  const [selectRoot, setSelectRoot] = useState("");
  const rootNames = ["Администратор", "Инженер", "Монтажник"];
  const rootValue = [1, 2, 3];

  // Обработка изменения полей ввода
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(`Изменение поля ${name}: ${value}`); // Отладка
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setResultForm("");
  };

  // Обработка создания пользователя
  const handleCreate = async () => {
    const requiredFields = ["lastName", "firstName", "login", "password"];
    const hasEmptyFields = requiredFields.some(field => !formData[field].trim());
    
    if (hasEmptyFields) {
      setResultForm("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setIsCreating(true);
    setResultForm("Создание пользователя...");

    try {
      const response = await requestAPI(
        "POST",
        "users/create",
        formData
      );
      setResultForm("Пользователь успешно создан");
      setCreateSuccess(true);
      setFormData({
        lastName: "",
        firstName: "",
        middleName: "",
        login: "",
        password: "",
        root: ""
      });
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
      setResultForm("Произошла ошибка при создании пользователя. Попробуйте снова.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="input-container">
      <form>
        <div className="textForm">
          <h2>Создать пользователя</h2>
          <pre>Заполните данные нового пользователя</pre>
        </div>

        <h3>Укажите права доступа</h3>
         <div className="selectRoot"> 
          <Select
            id="user-root"
            options={rootNames}
            value={rootValue}
            onChange={(e) => selectRoot(e.target.value)}
        />
        </div>

        <h3>Укажите логин и пароль</h3>
        {/* Поля ввода */}
      
          <Input
            id="login"
            type="text"
            placeholder="Введите логин"
            value={formData.login}
            onChange={(e) => handleInputChange({ target: { name: "login", value: e.target.value } })}
            disabled={isCreating} // Отключаем при создании
          />
          <Input
            id="password"
            type="password"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={(e) => handleInputChange({ target: { name: "password", value: e.target.value } })}
            disabled={isCreating}
          />

            <h3>Укажите данные сотрудника</h3>

          <Input
            id="lastName"
            type="text"
            placeholder="Введите фамилию"
            value={formData.lastName}
            onChange={(e) => handleInputChange({ target: { name: "lastName", value: e.target.value } })}
            disabled={isCreating}
          />
          <Input
            id="firstName"
            type="text"
            placeholder="Введите имя"
            value={formData.firstName}
            onChange={(e) => handleInputChange({ target: { name: "firstName", value: e.target.value } })}
            disabled={isCreating}
          />
          <Input
            id="middleName"
            type="text"
            placeholder="Введите отчество"
            value={formData.middleName}
            onChange={(e) => handleInputChange({ target: { name: "middleName", value: e.target.value } })}
            disabled={isCreating}
          />
    
    

        {/* Кнопка создания */}
        <Button
          name="Создать"
          onClick={handleCreate}
          disabled={isCreating}
        />
      </form>

      {/* Отображение результата */}
      {resultForm && <div className="create-result">{resultForm}</div>}
    </div>
  );
}