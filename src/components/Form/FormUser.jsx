import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";

export function FormUser({ login, setResult, searchIdUs, setInfoToUs, result }) {
  const [formFields, setFormFields] = useState({
    surname: "",
    name: "",
    patronymic: "",
    phone: "",
  });
  const [resultForm, setResultForm] = useState(null);

  const handleInputChange = (event, fieldName) => {
    const newValue = event.target.value;
    setFormFields((prevFields) => ({
      ...prevFields,
      [fieldName]: newValue,
    }));
  };

  const fillFormFromSearchIdUs = (data) => {
    if (data) {
      let parts = [];
      try {
        parts = data.userFullName.split(" ");
      } catch (error) {
        console.error("Ошибка при разбиении имени на части", error);
      }
      setFormFields({
        surname: parts[0] || "",
        name: parts[1] || "",
        patronymic: parts[2] || "",
        phone: data.userPhone || "",
      });
    }
  };

  const handleLoginChange = async () => {
    if (login !== "") {
      try {
        const data = await searchIdUs(login, setResult, "login");
        if (data) {
          fillFormFromSearchIdUs(data);
        }
      } catch (error) {
        console.error("Ошибка при проверке логина", error);
        setResult({
          result: "Ошибка при проверке логина",
          success: false,
        });
      }
    } else {
      setResult({
        result: "Введите логин",
        success: false,
      });
    }
  };

  const handleSetInfoToUs = async () => {
    try {
      if (result?.success) {
        const { surname, name, patronymic, phone } = formFields;
        setResultForm("");
        await setInfoToUs(login, surname, name, patronymic, phone);
        setResultForm("Данные записаны");
      }
    } catch {
      setResultForm(
        "Не удалось обновить данные, необходимо настроить PPPoE, дождаться окончания запроса и повторить попытку"
      );
    }
  };

  // Автоматическая проверка логина при монтировании компонента
  useEffect(() => {
    handleLoginChange();
  }, [login]);

  return (
    <div className="input-container">
      <h2>Данные {login} верны?</h2>
      <p className="subtitle">Если нет, уточните</p>
      <div className="form-group">
        <input
          className="some-input"
          id="surname"
          type="text"
          placeholder="Введите фамилию"
          value={formFields.surname || ""}
          onChange={(e) => handleInputChange(e, "surname")}
          aria-label="Фамилия"
        />
        <input
          className="some-input"
          id="name"
          type="text"
          placeholder="Введите имя"
          value={formFields.name || ""}
          onChange={(e) => handleInputChange(e, "name")}
          aria-label="Имя"
        />
        <input
          className="some-input"
          id="patronymic"
          type="text"
          placeholder="Введите отчество"
          value={formFields.patronymic || ""}
          onChange={(e) => handleInputChange(e, "patronymic")}
          aria-label="Отчество"
        />
        <input
          className="some-input"
          id="phone"
          type="tel"
          placeholder="Введите телефон"
          value={formFields.phone || ""}
          onChange={(e) => handleInputChange(e, "phone")}
          aria-label="Номер телефона"
        />
      </div>
      {resultForm && (
        <div className="upload-result" aria-live="polite">
          {resultForm}
        </div>
      )}
      <Button
        name="Записать"
        onClick={handleSetInfoToUs}
        aria-label="Сохранить данные пользователя"
      />
    </div>
  );
}