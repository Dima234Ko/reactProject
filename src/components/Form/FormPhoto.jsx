import React, { useState } from "react";
import { Button } from "../../components/Button";
import { requestAPI } from "../../functions/api";

export function FormPhoto({ isUploading, setIsUploading, setFile }) {
  // Локальные состояния для файла и сообщения
  const [file, setLocalFile] = useState(null);
  const [resultForm, setResultForm] = useState("");

  // Обработчик изменения файла
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLocalFile(selectedFile); // Сохраняем файл в локальное состояние
      setResultForm(""); // Очищаем сообщение об ошибке или успехе
    }
  };

  // Обработчик загрузки файла
  const handleUpload = async () => {
    if (!file) {
      setResultForm("Пожалуйста, выберите файл для загрузки");
      return;
    }

    setIsUploading(true); // Включаем индикатор загрузки
    setResultForm("Загрузка началась...");

    const formData = new FormData();
    formData.append("file", file); // Добавляем файл в FormData
 
    try{
        console.log('1')
    response = await requestAPI("POST", photos, formData);
    if (!response.ok) throw new Error("Ошибка загрузки фото");
        setResultForm("Фото успешно загружено");
    } catch (error) {
      setResultForm("Произошла ошибка при загрузке фото. Попробуйте снова.");
    } finally {
      setIsUploading(false); 
    }
  };

  return (
    <div className="input-container">
      <div className="textForm">
        <h2>Загрузить фото</h2>
        <pre>Выберите скриншоты из приложения Analizator WiFi</pre>
      </div>
      <input type="file" id="file-upload" onChange={handleFileChange} />
      <label htmlFor="file-upload" className="custom-file-upload">
        Выбрать файл
      </label>
      {file && (
        <div className="file-name">
          <strong>Выбран файл: </strong>
          {file.name}
        </div>
      )}
      <Button
        name="Загрузить"
        onClick={handleUpload}
        disabled={isUploading}
      />
      {resultForm && <div className="upload-result">{resultForm}</div>}
    </div>
  );
}
