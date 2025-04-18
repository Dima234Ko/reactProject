import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { uploadPhoto } from '../../functions/api';

export function FormPhoto({
  isUploading,
  setIsUploading,
  setFile,
  login,
  idUserSideCard,
  workFromRedux,
  setUploadSuccess,
}) {
  const [files, setFiles] = useState([]);
  const [resultForm, setResultForm] = useState('');

  // Обработка выбора файлов
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setResultForm('');
    }
  };

  // Загрузка всех выбранных файлов
  const handleUpload = async () => {
    if (files.length === 0) {
      setResultForm('Пожалуйста, выберите хотя бы один файл для загрузки');
      return;
    }

    if (!idUserSideCard) {
      setResultForm('Карточка в US не определена');
      return;
    }

    setIsUploading(true);
    setResultForm('Загрузка началась...');
    setUploadSuccess(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('Installer', 'esipov');
    formData.append('idUserSideCard', idUserSideCard);

    try {
      const response = await uploadPhoto('POST', `photos/uploads`, formData);
      setResultForm(response);
    } catch (error) {
      console.error('Ошибка при загрузке фото:', error);
      setResultForm('Произошла ошибка при загрузке файлов. Попробуйте снова.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="input-container">
      <div className="textForm">
        <h2>Загрузить фото</h2>
        <pre>
          Выберите скриншоты из приложения Analizator WiFi и заказ-наряд
        </pre>
        <h4>{login}</h4>
      </div>
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        multiple // Разрешаем выбор нескольких файлов
        style={{ display: 'none' }}
      />
      <label htmlFor="file-upload" className="custom-file-upload">
        Выбрать файлы
      </label>
      {files.length > 0 && (
        <div className="file-list">
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <Button
        name="Загрузить все"
        onClick={handleUpload}
        disabled={isUploading || files.length === 0}
      />
      {resultForm && <div className="upload-result">{resultForm}</div>}
    </div>
  );
}
