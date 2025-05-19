import React, { useState } from 'react';
import { requestAPI } from '../../functions/api';
import Input from '../../components/Input';
import Button from '../Button/Button';
import SelectRoot from '../../components/Select/SelectRoot ';

function FormAddUser({ setCreateSuccess, onClose }) {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    login: '',
    password: '',
    root: '',
  });
  const [resultForm, setResultForm] = useState('');

  // Обработка изменения полей ввода
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setResultForm('');
  };

  // Обработка создания пользователя
  const handleCreate = async () => {
    const requiredFields = ['lastName', 'firstName', 'login', 'password'];
    const hasEmptyFields = requiredFields.some(
      (field) => !formData[field].trim()
    );

    if (hasEmptyFields) {
      setResultForm('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setResultForm('Создание пользователя...');

    // Формируем объект body из formData
    const body = {
      lastName: formData.lastName,
      firstName: formData.firstName,
      middleName: formData.middleName,
      login: formData.login,
      password: formData.password,
      root: formData.root,
    };

    try {
      const response = await requestAPI('POST', 'ADMIN/createUser', body);
      setResultForm('Пользователь успешно создан');
      setCreateSuccess(true);
      setFormData({
        lastName: '',
        firstName: '',
        middleName: '',
        login: '',
        password: '',
        root: '',
      });
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
      setResultForm(
        'Произошла ошибка при создании пользователя. Попробуйте снова.'
      );
    }
  };

  return (
    <div className="input-container">
      <div className="textForm">
        <h2>Создать пользователя</h2>
        <pre>Укажите права доступа</pre>
        <div className="sel">
          <SelectRoot
            value={formData.root}
            onChange={(e) =>
              handleInputChange({
                target: { name: 'root', value: e.target.value },
              })
            }
          />
        </div>
        <pre>Укажите данные</pre>
        <div className="addUser">
          <Input
            id="login"
            type="text"
            placeholder="Введите логин"
            value={formData.login}
            onChange={(e) =>
              handleInputChange({
                target: { name: 'login', value: e.target.value },
              })
            }
          />
          <Input
            id="password"
            type="password"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={(e) =>
              handleInputChange({
                target: { name: 'password', value: e.target.value },
              })
            }
          />
          <Input
            id="lastName"
            type="text"
            placeholder="Введите фамилию"
            value={formData.lastName}
            onChange={(e) =>
              handleInputChange({
                target: { name: 'lastName', value: e.target.value },
              })
            }
          />
          <Input
            id="firstName"
            type="text"
            placeholder="Введите имя"
            value={formData.firstName}
            onChange={(e) =>
              handleInputChange({
                target: { name: 'firstName', value: e.target.value },
              })
            }
          />
          <Input
            id="middleName"
            type="text"
            placeholder="Введите отчество"
            value={formData.middleName}
            onChange={(e) =>
              handleInputChange({
                target: { name: 'middleName', value: e.target.value },
              })
            }
          />
        </div>
      </div>
      {resultForm && <div className="upload-result">{resultForm}</div>}
      <Button name="Создать" onClick={handleCreate} />
    </div>
  );
}

export default FormAddUser;
