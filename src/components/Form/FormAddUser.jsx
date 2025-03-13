import React, { useState } from "react";
import { Button } from "../../components/Button";
import { requestAPI } from "../../functions/api";

export function FormAddUser({
  isCreating,
  setIsCreating,
  setCreateSuccess
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

  // Обработка изменения полей ввода
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setResultForm(""); // Очищаем сообщение об ошибке при изменении
  };

  // Обработка создания пользователя
  const handleCreate = async () => {
    // Проверка на заполненность обязательных полей
    const requiredFields = ["lastName", "firstName", "login", "password"];
    const hasEmptyFields = requiredFields.some(field => !formData[field].trim());
    
    if (hasEmptyFields) {
      setResultForm("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setIsCreating(true);
    setResultForm("Создание пользователя...");
    setCreateSuccess(true);

//     try {
//       const response = await requestUser(
//         "POST",
//         "users/create",
//         formData
//       );
//       setResultForm("Пользователь успешно создан");
//       setFormData({
//         lastName: "",
//         firstName: "",
//         middleName: "",
//         login: "",
//         password: "",
//         root: ""
//       });
//     } catch (error) {
//       console.error("Ошибка при создании пользователя:", error);
//       setResultForm("Произошла ошибка при создании пользователя. Попробуйте снова.");
//     } finally {
//       setIsCreating(false);
//     }
       };

  return (
    <div className="input-container">
      <form>
        <div className="textForm">
          <h2>Создать пользователя</h2>
          <pre>Заполните данные нового пользователя</pre>
        </div>

        {/* Поля ввода */}
        <div className="form-fields">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Фамилия *"
            required
          />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Имя *"
            required
          />
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
            placeholder="Отчество"
          />
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
            placeholder="Логин *"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Пароль *"
            required
          />
          <input
            type="text"
            name="root"
            value={formData.root}
            onChange={handleInputChange}
            placeholder="Права доступа"
          />
        </div>
      </form>

      {/* Кнопка создания */}
      <Button
        name="Создать"
        onClick={handleCreate}
        disabled={isCreating}
      />

      {/* Отображение результата */}
      {resultForm && <div className="create-result">{resultForm}</div>}
    </div>
  );
}