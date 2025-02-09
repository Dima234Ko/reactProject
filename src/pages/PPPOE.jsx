import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setSerial } from "../store/actions/serialActions";
import { setProgress } from "../store/actions/progressActions";
import { Input } from "../components/Input";
import { Button, NextButton } from "../components/Button";
import { Loader } from "../components/Loader";
import Result from "../components/Result";
import { setPppoe } from "../functions/pppoe";

function Pppoe() {
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

  const handleSetPppoe = async () => {
    dispatch(setProgress(0)); // Сбросить прогресс в Redux
    setLoading(true);
    setResult(null);
    navigate(`?serial=${serialState}`, { replace: true }); // Обновляем URL с serial
    try {
      await setPppoe(
        serial,
        login,
        password,
        setLoading,
        setResult,
        dispatch,
        navigate,
        progressFromRedux, 
      );
    } catch (error) {
      console.error("Ошибка при получении статуса:", error);
      setLoading(false);
    }
  };

  return (
    <div id="pppoe">
      <h2>Настройка PPPoE</h2>
      <Input
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={serial}
        onChange={handleInputChange}
      />
      <Input
        id="login"
        type="text"
        placeholder="Введите логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input
        id="password"
        type="text"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button name="Отправить запрос" onClick={handleSetPppoe} />
      {loading && <Loader />}
      {result && <Result data={result} />}
      <NextButton />
    </div>
  );
}

export default Pppoe;
