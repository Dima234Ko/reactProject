// src/pages/PPPOE.jsx

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Для получения значения из Redux
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import Result from "../components/Result";

function Pppoe() {
  const serialFromRedux = useSelector((state) => state.serial.serial); // Получаем serial из Redux
  const [serial, setSerial] = useState(serialFromRedux);  // Инициализируем локальное состояние с помощью serial из Redux
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setSerial(serialFromRedux);  // При изменении serial в Redux, обновляем локальное состояние
  }, [serialFromRedux]);

  const handleInputChange = (event) => {
    setSerial(event.target.value);
  };

  const handleGetStatus = async () => {
    setLoading(true);
    setResult(null);
    try {
      // Ваш код для получения статуса
    } catch (error) {
      console.error("Ошибка при получении статуса:", error);
    }
  };

  return (
    <div id="pppoe">
      <h2>Настройка PPPoE</h2>
      <Input
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={serial}  // Отображаем значение serial из Redux
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
      <Button name="Отправить запрос" onClick={handleGetStatus} />
      {loading && <Loader />}
      {result && <Result data={result} />}
    </div>
  );
}

export default Pppoe;
