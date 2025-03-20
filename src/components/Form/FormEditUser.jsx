import React, { useState, useEffect } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { requestAPI } from "../../functions/api";
import { useSelector } from "react-redux";

export function FormEditUser({ setCreateSuccess, onClose }) {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    login: "",
    password: "",
    root: "",
  });
  const [resultForm, setResultForm] = useState("");
  const userId = useSelector((state) => state.checkboxUser.checkedValue);

  // Обработка изменения полей ввода
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setResultForm("");
  };

  // Получение данных пользователя при загрузке компонента
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await requestAPI("GET", `ADMIN/getUserById/${userId}`);
        setFormData({
          lastName: response.lastName || "",
          firstName: response.firstName || "",
          middleName: response.middleName || "",
          login: response.login || "",
          password: "",
          root: response.root || "",
        });
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
        setResultForm("Ошибка при загрузке данных");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Обработка изменения пользователя
  const handleEdit = async () => {
    setResultForm("Создание пользователя...");

    // Формируем объект body из formData
    const body = {
      id: userId,
      lastName: formData.lastName,
      firstName: formData.firstName,
      middleName: formData.middleName,
    };

    if (formData.password.trim()) {
      body.password = formData.password;
    }

    try {
      const response = await requestAPI("POST", "ADMIN/updateUser", body);
      setResultForm("Пользователь успешно изменен");
      setCreateSuccess(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
      setResultForm(
        "Произошла ошибка при создании пользователя. Попробуйте снова.",
      );
    }
  };

  return (
    <div className="input-container">
      <div className="textForm"> 
        <h2>Изменить пользователя</h2>
        <pre>Данные пользователя ID: {userId}</pre>

        <Input
          id="login"
          placeholder="Логин"
          name="login"
          value={formData.login}
          disabled={true}
        />
        <Input
          id="lastName"
          placeholder="Фамилия"
          name="lastName"
          value={formData.lastName}
          onChange={(e) =>
            handleInputChange({
              target: { name: "lastName", value: e.target.value },
            })
          }
        />
        <Input
          id="firstName"
          placeholder="Имя"
          name="firstName"
          value={formData.firstName}
          onChange={(e) =>
            handleInputChange({
              target: { name: "firstName", value: e.target.value },
            })
          }
        />
        <Input
          id="middleName"
          placeholder="Отчество"
          name="middleName"
          value={formData.middleName}
          onChange={(e) =>
            handleInputChange({
              target: { name: "middleName", value: e.target.value },
            })
          }
        />

        <pre>Укажите пароль</pre>

        <Input
          id="password"
          type="password"
          placeholder="Введите новый пароль"
          name="password"
          value={formData.password}
          onChange={(e) =>
            handleInputChange({
              target: { name: "password", value: e.target.value },
            })
          }
        />
        </div>
        {/* Отображение результата */}
        {resultForm && <div className="upload-result">{resultForm}</div>}
        {/* Кнопка создания */}
        <Button name="Изменить" onClick={handleEdit} />
    </div>
  );
}
