import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setProgress } from "../../store/actions/progressActions";
import { setSerial } from "../../store/actions/serialActions";
import { SelectSSID, SelectSSID5 } from "../../components/Select";
import { Input } from "../../components/Input";
import { Button, UploadButton } from "../../components/Button";
import { Loader } from "../../components/Loader";
import Result from "../../components/Result";
import { setWiFi } from "../../functions/wifi";
import { checkTaskStatus } from "../../functions/task";
import { FormInfo } from "../../components/Form";

function Wifi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Получение serial из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const [serial, setSerialState] = useState(serialFromRedux || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resultForm, setResultForm] = useState(null); // Результат формы
  const [ssid2_4, setSsid2_4] = useState("");
  const [password2_4, setPassword2_4] = useState("");
  const [selectSSID2_4, setSelectSSID2_4] = useState("auto");
  const [ssid5, setSsid5] = useState("");
  const [password5, setPassword5] = useState("");
  const [selectSSID5, setSelectSSID5] = useState("auto");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Выбор файла
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResultForm(""); // Очистить результат формы при изменении файла
    }
  };

  // Загрузка файла
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
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Ошибка загрузки фото");

      const data = await response.json();
      setResultForm("Фото успешно загружено");
    } catch (error) {
      setResultForm("Произошла ошибка при загрузке фото. Попробуйте снова.");
    } finally {
      setIsUploading(false);
    }
  };

  // Заполняем поле serial из параметров URL, если оно есть
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serialFromUrl = queryParams.get("serial");
    if (serialFromUrl) {
      dispatch(setSerial(serialFromUrl));
      setSerialState(serialFromUrl);
    }
  }, [location.search, dispatch]);

  // Обновление serialState при изменении serial из Redux
  useEffect(() => {
    setSerialState(serialFromRedux);
  }, [serialFromRedux]);

  // Проверка статуса задачи при изменении URL
  useEffect(() => {
    checkTaskStatus(
      location,
      loading,
      result,
      dispatch,
      setSerial,
      setLoading,
      setResult,
      navigate,
    );
  }, [location.search, navigate, loading, dispatch, result]);

  const handleInputChange = (event) => {
    setSerialState(event.target.value);
  };

  const handleSetWiFi = async () => {
    dispatch(setProgress(0));
    setLoading(true);
    setResult(null);
    navigate(`?serial=${serial}`, { replace: true });
    try {
      await setWiFi(
        serial,
        ssid2_4,
        password2_4,
        selectSSID2_4,
        ssid5,
        password5,
        selectSSID5,
        setLoading,
        setResult,
        dispatch,
        navigate,
        progressFromRedux,
      );
    } catch (error) {
      // Обновление formContent при ошибке
      setFormContent({
        fromData: (
          <div class="textForm">
            <h2>Внимание</h2>
            <div>
              <pre>Произошёл сбой</pre>
            </div>
            <ul>
              <li>{error.message}</li>
            </ul>
          </div>
        ),
      });
      setLoading(false);
    }
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div id="wifi">
      <h2>Настройка WiFi</h2>

      {/* Форма с информацией (например, загрузка фото) */}
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={
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
        }
      />

      <div className="ssid-container">
      {/* Ввод pon-serial */}
      <Input
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={serial}
        onChange={handleInputChange}
        disabled={true}
      />
      </div>

      {/* Ввод SSID и пароля для 2.4ГГц */}
      <div className="ssid-container">
        <Input
          id="SSID2_4"
          type="text"
          placeholder="Введите SSID 2.4Ггц"
          value={ssid2_4}
          onChange={(e) => {
            const newSsid = e.target.value;
            setSsid2_4(newSsid);
            setSsid5(newSsid + "_5G"); // Обновляем SSID для 5ГГц
          }}
        />
        <SelectSSID
          value={selectSSID2_4}
          onChange={(e) => setSelectSSID2_4(e.target.value)}
        />
      </div>

      <div className="ssid-container">
      <Input
        id="password2_4"
        type="text"
        placeholder="Введите пароль"
        value={password2_4}
        onChange={(e) => setPassword2_4(e.target.value)}
      />
      </div>
      <div className="ssid-container">
        <Input
          id="SSID5"
          type="text"
          placeholder="Введите SSID 5Ггц"
          value={ssid5} // Значение автоматически обновляется на основе SSID2_4
          onChange={(e) => setSsid5(e.target.value)}
        />
        <SelectSSID5
          value={selectSSID5}
          onChange={(e) => setSelectSSID5(e.target.value)}
        />
      </div>
      <div className="ssid-container">
      <Input
        id="password5"
        type="text"
        placeholder="Введите пароль"
        value={password5 || password2_4} // Если пароль для 5 ГГц не задан, используем пароль для 2.4 ГГц
        onChange={(e) => setPassword5(e.target.value)}
      />
      </div>
      {/* Кнопка открытия формы для загрузки */}
      <UploadButton onClick={openForm} />

      {/* Индикатор загрузки */}
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader progress={progressFromRedux} />
          </div>
        </div>
      )}

      {/* Результат запроса на странице WiFi */}
      {result && <Result data={result} />}

      {/* Кнопка отправки запроса */}
      <Button name="Отправить запрос" onClick={handleSetWiFi} />
    </div>
  );
}

export default Wifi;
