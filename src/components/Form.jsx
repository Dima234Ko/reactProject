import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from 'react';



export function FormUser({ isFormOpen, closeForm }) {
  const [input1, setInput1] = useState("");  // Для фамилии
  const [input2, setInput2] = useState("");  // Для имени
  const [input3, setInput3] = useState("");  // Для отчества

  // Обработчик изменения значений инпутов
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "input1") {
      setInput1(value);
    } else if (name === "input2") {
      setInput2(value);
    } else if (name === "input3") {
      setInput3(value);
    }
  };

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
        <h2>Если абонент новый, заполните форму</h2>
        <pre>если нет, просто закройте её</pre>
        <Input
          id="surname"
          type="text"
          name="input1"
          placeholder="Введите фамилию"
          value={input1}
          onChange={handleInputChange}
        />
        <Input
          id="name"
          type="text"
          name="input2"
          placeholder="Введите имя"
          value={input2}
          onChange={handleInputChange}
        />
        <Input
          id="patronymic"
          type="text"
          name="input3"
          placeholder="Введите отчество"
          value={input3}
          onChange={handleInputChange}
        />
        <Button name="Записать" />
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
        <h2>Внимание</h2>
        <div>
          <pre>В данной версии приложения:</pre>
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
    const [file, setFile] = useState(null); // для хранения выбранного файла
    const [isUploading, setIsUploading] = useState(false); // для отслеживания процесса загрузки
    const [result, setResult] = useState(''); // для вывода информационных сообщений

    const handleClose = () => {
      if (closeForm) closeForm();
    };

    // Обработчик выбора файла
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setResult(''); // Очистить сообщение при выборе нового файла
        }
    };

    // Функция для отправки фото
    const handleUpload = async () => {
        if (!file) {
            setResult('Пожалуйста, выберите файл для загрузки');
            return;
        }

        setIsUploading(true);
        setResult('Загрузка началась...'); // Информируем о начале загрузки

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Ошибка загрузки фото');
            }

            const data = await response.json();
            console.log('Фото успешно загружено:', data);
            setResult('Фото успешно загружено');
        } catch (error) {
            console.error('Ошибка при отправке фото:', error);
            setResult('Произошла ошибка при загрузке фото. Попробуйте снова.');
        } finally {
            setIsUploading(false);
        }
    };

    if (!isFormOpen) return null;

    return (
        <div className="custom-component">
            <div className="close-btn" onClick={handleClose}>
                &times;
            </div>
            <div className="input-container">
                <h2>Загрузить фото</h2>
                <pre>Выберите скриншоты из приложения Analizator WiFi</pre>
                <input 
                    type="file" 
                    id="file-upload" 
                    onChange={handleFileChange} 
                />

                <label htmlFor="file-upload" className="custom-file-upload">
                    Выбрать файл
                </label>

                {file && (
                    <div className="file-name">
                        <strong>Выбран файл: </strong>{file.name}
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
