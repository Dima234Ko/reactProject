import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState, useEffect, useRef } from "react";

export function FormUser({ isFormOpen, closeForm }) {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleClose = () => {
    if (closeForm) closeForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!surname || !name || !patronymic || !phone) {
      setErrorMessage("Пожалуйста, заполните все поля.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMessage("Пожалуйста, введите корректный номер телефона.");
      return;
    }

    setErrorMessage("");
    console.log("Данные отправлены:", { surname, name, patronymic, phone });
  };

  if (!isFormOpen) return null;

  return (
    <div className="custom-component" ref={formRef}>
      <div className="close-btn" onClick={handleClose} role="button" aria-label="Close Form">
        &times;
      </div>
      <div className="input-container">
        <div className="textForm">
          <h2>Если абонент новый, заполните форму</h2>
          <pre>если нет, просто закройте её</pre>
        </div>
        <form onSubmit={handleSubmit}>
          <Input id="surname" type="text" placeholder="Введите фамилию" value={surname} onChange={(e) => setSurname(e.target.value)} required />
          <Input id="name" type="text" placeholder="Введите имя" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input id="patronymic" type="text" placeholder="Введите отчество" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} required />
          <Input id="phone" type="tel" placeholder="Введите телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Button name="Записать" />
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}




export function FormInfo({ isFormOpen, closeForm }) {
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
          <h2>Внимание</h2>
          <div>
            <pre>В данной версии приложения:</pre>
          </div>
          <ul>
            <li>Функции из расширенной настройки вынесены в меню в верхнем правом углу.</li>
            <li>Решена проблема прерывания запроса при сворачивании браузера.</li>
            <li>Добавлена возможность заполнения ФИО абонента для карточки в US.</li>
            <li>Реализована возможность передачи ошибки (скопируйте ссылку, передайте её на 2ЛТП с описанием проблемы).</li>
          </ul>
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
