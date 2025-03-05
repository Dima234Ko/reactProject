import React, { useState } from "react";
import { Button } from "../../components/Button";
import { requestPhoto } from "../../functions/api";

export function FormPhoto({
  isUploading,
  setIsUploading,
  setFile,
  login,
  idUserSideCard,
}) {
  const [file, setLocalFile] = useState(null);
  const [resultForm, setResultForm] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLocalFile(selectedFile);
      setResultForm("");
    }
  };

  const handleUpload = async () => {
    // Проверяем, выбран ли файл
    if (!file) {
      setResultForm("Пожалуйста, выберите файл для загрузки");
      return;
    }

    if (!idUserSideCard){
      setResultForm("Карточка в US не определена");
      return;
    }

    // Начинаем процесс загрузки
    setIsUploading(true);
    setResultForm("Загрузка началась...");

    // Создаем FormData и добавляем файл
    const formData = new FormData();
    formData.append("file", file); // Добавляем файл
    formData.append("Installer", "esipov"); // Добавляем поле Installer
    formData.append("idUserSideCard", idUserSideCard); // Добавляем поле idUserSideCard

    try {
      // Отправляем запрос на сервер
      let response = await requestPhoto("POST", "photos/upload", formData);
      // Обрабатываем успешный ответ
      setResultForm(response);
    } catch (error) {
      // Обрабатываем ошибку
      console.error("Ошибка при загрузке фото:", error); // Логируем ошибку для отладки
      setResultForm("Произошла ошибка при загрузке фото. Попробуйте снова.");
    } finally {
      // Завершаем процесс загрузки
      setIsUploading(false);
    }
  };

  return (
    <div className="input-container">
      <form>
        <div className="textForm">
          <h2>Загрузить фото</h2>
          <pre>
            Выберите скриншоты из приложения Analizator WiFi для учетной записи
          </pre>
          <h4>{login}</h4>
        </div>
        {/* Поле для выбора файла */}
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          style={{ display: "none" }} // Скрываем стандартный input
        />
        {/* Кастомная кнопка для выбора файла */}
        <label htmlFor="file-upload" className="custom-file-upload">
          Выбрать файл
        </label>
      </form>

      {/* Отображение имени выбранного файла */}
      {file && (
        <div className="file-name">
          <strong>Выбран файл: </strong>
          {file.name}
        </div>
      )}

      {/* Кнопка для загрузки файла */}
      <Button
        name="Загрузить"
        onClick={handleUpload}
        disabled={isUploading || !file} // Кнопка неактивна, если файл не выбран или идет загрузка
      />

      {/* Отображение результата загрузки */}
      {resultForm && <div className="upload-result">{resultForm}</div>}
    </div>
  );
}
