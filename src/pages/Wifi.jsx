import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setProgress } from "../store/actions/progressActions";
import { SelectSSID, SelectSSID5 } from "../components/Select";
import { Input } from "../components/Input";
import { Button, UploadButton } from "../components/Button";
import { Loader } from "../components/Loader";
import Result from "../components/Result";
import { setWiFi } from "../functions/wifi";
import { checkTask } from "../functions/task";
import { FormPhoto } from "../components/Form";

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
  const [ssid2_4, setSsid2_4] = useState("");
  const [password2_4, setPassword2_4] = useState("");
  const [selectSSID2_4, setSelectSSID2_4] = useState("auto");
  const [ssid5, setSsid5] = useState("");
  const [password5, setPassword5] = useState("");
  const [selectSSID5, setSelectSSID5] = useState("auto");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formRef = useRef(null);

  // Обновление serialState при изменении serial из Redux
  useEffect(() => {
    setSerialState(serialFromRedux);
  }, [serialFromRedux]);

  // Проверка статуса задачи при изменении URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const taskIdFromUrl = queryParams.get("task");

    // Если есть taskId, запрос еще не выполняется, и результат еще не получен
    if (taskIdFromUrl && !loading && !result) {
      setLoading(true);
      setResult(null);
      checkTask(
        "setNTU/taskStatus",
        taskIdFromUrl,
        dispatch,
        setLoading,
        setResult,
        navigate,
        0,
        50,
      );
    }
  }, [location.search, navigate, loading, dispatch, result, serialFromRedux]);

  // Закрытие формы при клике вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFormOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    setSerialState(event.target.value); // Обновляем local state для serial
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
      console.error("Ошибка применения параметров:", error);
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
      <FormPhoto isFormOpen={isFormOpen} closeForm={closeForm} />
      <Input
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={serial}
        onChange={handleInputChange}
        disabled={true}
      />
      <div className="ssid-container">
        <Input
          id="SSID2_4"
          type="text"
          placeholder="Введите SSID 2.4Ггц"
          value={ssid2_4}
          onChange={(e) => setSsid2_4(e.target.value)}
        />
        <SelectSSID
          value={selectSSID2_4}
          onChange={(e) => setSelectSSID2_4(e.target.value)}
        />
      </div>
      <Input
        id="password2_4"
        type="text"
        placeholder="Введите пароль"
        value={password2_4}
        onChange={(e) => setPassword2_4(e.target.value)}
      />

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
      <Input
        id="password5"
        type="text"
        placeholder="Введите пароль"
        value={password5}
        onChange={(e) => setPassword5(e.target.value)}
      />
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
