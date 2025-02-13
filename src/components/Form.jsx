import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState, useEffect, useRef } from "react";

export function FormInfo({ isFormOpen, closeForm, formData }) {
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeForm]);

  const handleClose = () => {
    if (closeForm) closeForm();
  };

  if (!isFormOpen) return null;

  return (
    <div className="custom-component" ref={formRef}>
      <div className="close-btn" onClick={handleClose}>
        &times;
      </div>
      <div className="input-container">
        <div className="textForm">
          {formData}
        </div>
      </div>
    </div>
  );
}





export function FormPhoto({ isFormOpen, closeForm }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeForm]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setResult("Пожалуйста, выберите файл для загрузки");
      return;
    }

    setIsUploading(true);
    setResult("Загрузка началась...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/upload", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Ошибка загрузки фото");

      const data = await response.json();
      setResult("Фото успешно загружено");
    } catch (error) {
      setResult("Произошла ошибка при загрузке фото. Попробуйте снова.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isFormOpen) return null;

  return (
    <div className="custom-component" ref={formRef}>
      <div className="close-btn" onClick={closeForm}>
        &times;
      </div>
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
        <Button name="Загрузить" onClick={handleUpload} disabled={isUploading} />
        {result && <pre className="upload-result">{result}</pre>}
      </div>
    </div>
  );
}
