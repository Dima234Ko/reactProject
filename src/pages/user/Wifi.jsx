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
import { FormInfo } from "../../components/Form/Form";
import { searchIdUs } from "../../functions/pppoe";
import { FormPhoto } from "../../components/Form/FormPhoto"; // Импортируем компонент для загрузки фото

function Wifi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const [serial, setSerialState] = useState(serialFromRedux || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [ssid2_4, setSsid2_4] = useState("");
  const [password2_4, setPassword2_4] = useState("");
  const [selectSSID2_4, setSelectSSID2_4] = useState("auto");
  const [ssid5, setSsid5] = useState("");
  const [password5, setPassword5] = useState("");
  const [selectSSID5, setSelectSSID5] = useState("auto");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Синхронизация serial с Redux
  useEffect(() => {
    setSerialState(serialFromRedux);
  }, [serialFromRedux]);

  // Проверка статуса задачи при изменении URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkTaskStatus(
          location,
          loading,
          result,
          dispatch,
          setSerial,
          setLoading,
          setResult,
          navigate,
        );
      } catch (error) {
        setResult({
          result: error.message,
          success: false,
        });
      }
    };
    fetchData();
  }, [location.search, navigate]);

  // Обработчик для настройки WiFi
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
      setResult({
        result: error.message,
        success: false,
      });
    }
  };

  // Открыть форму для загрузки файла
  const openForm = () => {
    setIsFormOpen(true);
  };

  // Закрыть форму для загрузки файла
  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Асинхронная функция для получения данных WiFi по serial
  const fetchDataWiFi = async () => {
    try {
      if (serial !== "") {
        const data = await searchIdUs(serial, setResult, "serial");
        if (data) {
          setSsid2_4(data.ssidWifi2);
          setSsid5(data.ssidWifi5);
          setPassword2_4(data.passWifi2);
          setPassword5(data.passWifi5);
        }
      }
    } catch (error) {
      console.error("Ошибка при получении данных WiFi:", error);
    }
  };

  useEffect(() => {
    fetchDataWiFi();
  }, [serial]);

  return (
    <div id="wifi">
      <h2>Настройка WiFi</h2>
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={
          <FormPhoto
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            setFile={setFile}
          />
        }
      />
      <div className="ssid-container">
        <Input
          id="id_Ntu"
          type="text"
          placeholder="Введите pon-serial"
          value={serial}
          onChange={(e) => setSerialState(e.target.value)}
          disabled={true}
        />
      </div>

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
          onChange={(e) => {
            const newSsid = e.target.value;
            setPassword2_4(e.target.value);
            setPassword5(e.target.value); // Обновляем пароль для 5ГГц
          }}
        />
      </div>

      <div className="ssid-container">
        <Input
          id="SSID5"
          type="text"
          placeholder="Введите SSID 5Ггц"
          value={ssid5}
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
          value={password5}
          onChange={(e) => setPassword5(e.target.value)}
        />
      </div>

      <UploadButton onClick={openForm} />

      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader progress={progressFromRedux} />
          </div>
        </div>
      )}

      {result && <Result data={result} />}

      <Button name="Отправить запрос" onClick={handleSetWiFi} />
    </div>
  );
}

export default Wifi;
