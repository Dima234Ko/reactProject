import React, { useState, useEffect } from "react";
import { ExpressButton } from "../Button";
import { requestAPI } from "../../functions/api";
import { useSelector } from "react-redux";

export function FormDeleteUser() {
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

  // Обработка изменения пользователя
  const handleEdit = async () => {
    // Формируем объект body из formData
    const body = {
      id: userId,
      root: "noRoles",
    };

    try {
      const response = await requestAPI("POST", "ADMIN/updateUser", body);
      setResultForm("Доступ запрещён");
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error("Ошибка", error);
      setResultForm("Произошла ошибка");
    }
  };

  return (
    <div className="input-container">
      <h2>Подтвердите</h2>
      <pre>Запретить доступ пользователю ID: {userId}?</pre>
      <div className="input-container">
        <ExpressButton onClick={handleEdit} text="Да" closeButton={false} />
      </div>
      {/* Отображение результата */}
      {resultForm && <div className="upload-result">{resultForm}</div>}
    </div>
  );
}
