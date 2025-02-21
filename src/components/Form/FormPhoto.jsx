import React, { useState } from "react";
import { Button } from "../../components/Button";
import { requestPhoto } from "../../functions/api";

export function FormPhoto({ isUploading, setIsUploading, setFile }) {
  const [file, setLocalFile] = useState(null);
  const [resultForm, setResultForm] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLocalFile(selectedFile);
      setResultForm(""); // Очищаем сообщение об ошибке или успехе
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setResultForm("Пожалуйста, выберите файл для загрузки");
      return;
    }

    setIsUploading(true);
    setResultForm("Загрузка началась...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await requestPhoto("POST", "photos", formData);
      if (response.ok) {
        setResultForm("Фото успешно загружено");
      } else {
        setResultForm("Ошибка загрузки фото");
      }
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
