import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState, useEffect, useRef } from "react";

export function FormUser({ isFormOpen, closeForm }) {
  const [surname, setSurname] = useState(""); // Для фамилии
  const [name, setName] = useState(""); // Для имени
  const [patronymic, setPatronymic] = useState(""); // Для отчества
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Для сообщений об ошибке

  // Обработчик закрытия формы
  const handleClose = () => {
    if (closeForm) closeForm(); // Вызов переданного колбэка для закрытия формы
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    // Проверка на пустые поля
    if (!surname || !name || !patronymic || !phone) {
      setErrorMessage("Пожалуйста, заполните все поля.");
      return;
    }

    setErrorMessage(""); // Очищаем сообщение об ошибке
    // Логика отправки данных или их сохранения
    console.log("Данные отправлены:", { surname, name, patronymic, phone });
  };

  if (!isFormOpen) return null; // Если форма не открыта, ничего не рендерим

  return (
    <div className="custom-component">
      <div className="close-btn" onClick={handleClose}>
        &times;
      </div>
      <div className="input-container">
        <div className="textForm">
          <h2>Если абонент новый, заполните форму</h2>
          <pre>если нет, просто закройте её</pre>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id="surname"
            type="text"
            placeholder="Введите фамилию"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <Input
            id="name"
            type="text"
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            id="patronymic"
            type="text"
            placeholder="Введите отчество"
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
          />
          <Input
            id="phone"
            type="text"
            placeholder="Введите телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button name="Записать" />
        </form>

        {/* Если есть ошибка, показываем её */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}

export function FormInfo({ isFormOpen, closeForm }) {
  // Обработчик закрытия формы
  const handleClose = () => {
    if (closeForm) closeForm(); // Вызов переданного колбэка для закрытия формы
  };

  if (!isFormOpen) return null; // Если форма не открыта, ничего не рендерим

  return (
    <div className="custom-component">
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
            <li>
              Функции из расширенной настройки вынесены в меню в верхнем правом
              углу.
            </li>
            <li>
              Решена проблема прерывания запроса при сворачивании браузера.
            </li>
            <li>
              Добавлена возможность заполнения ФИО абонента для карточки в US.
            </li>
            <li>
              Реализована возможность передачи ошибки (скопируйте ссылку,
              передайте её на 2ЛТП с описанием проблемы).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function FormPhoto({ isFormOpen, closeForm }) {
  const [file, setFile] = useState(null); // для хранения выбранного файла
  const [isUploading, setIsUploading] = useState(false); // для отслеживания процесса загрузки
  const [result, setResult] = useState(""); // для вывода информационных сообщений

  const formRef = useRef(null); // Ссылка на форму

  // Закрытие формы при клике вне формы
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm(); // Закрытие формы
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeForm]);

  // Обработчик выбора файла
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(""); // Очистить сообщение при выборе нового файла
    }
  };

  // Функция для отправки фото
  const handleUpload = async () => {
    if (!file) {
      setResult("Пожалуйста, выберите файл для загрузки");
      return;
    }

    setIsUploading(true);
    setResult("Загрузка началась..."); // Информируем о начале загрузки

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка загрузки фото");
      }

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

        <Button
          name="Загрузить"
          onClick={handleUpload}
          disabled={isUploading}
        />

        {result && <pre className="upload-result">{result}</pre>}
      </div>
    </div>
  );
}
