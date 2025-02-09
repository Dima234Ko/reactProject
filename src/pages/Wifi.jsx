import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setSerial } from "../store/actions/serialActions";
import { SelectSSID, SelectSSID5 } from "../components/Select";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import Result from "../components/Result";
import { NextButton } from "../components/Link";

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
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Обновление serialState при изменении serial из Redux
  useEffect(() => {
    setSerialState(serialFromRedux);
  }, [serialFromRedux]);

  // Проверка статуса задачи при изменении URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const taskIdFromUrl = queryParams.get("task");
    dispatch(setSerial(queryParams.get("serial")));

    if (taskIdFromUrl && !loading) {
      // Если в URL есть taskId и запрос еще не выполняется
      if (!result) {
        // Здесь должен быть запрос с использованием taskId
        console.log("Получение данных по taskId:", taskIdFromUrl);
        // Вы можете добавить вызов функции для получения информации по taskId
      }
    }
  }, [location.search, navigate, loading, dispatch, result]);

  const handleInputChange = (event) => {
    setSerialState(event.target.value); // Обновляем local state для serial
  };

  const handleSetPppoe = () => {
    // Добавьте логику отправки запроса, если нужно
    console.log("Отправить запрос на сервер");
  };

  return (
    <div id="pppoe">
      <h2>Настройка WiFi</h2>
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
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <SelectSSID />
      </div>
      <Input
        id="password2_4"
        type="text"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {loading && <Loader />}
      {result && <Result data={result} />}
      <Button name="Отправить запрос" onClick={handleSetPppoe} />
    </div>
  );
}

export default Wifi;
