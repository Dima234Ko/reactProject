import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { getStatus } from "../functions/status";
import { Loader } from "../components/Loader";
import Result from "../components/Result";

function Pppoe() {
  const [serial, setSerial] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (event) => {
    setSerial(event.target.value); 
  };

  const handleGetStatus = async () => {
    setLoading(true);
    setResult(null);
    try {
   
        


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
        value={serial}
        onChange={handleInputChange}
      />
            <Input
        id="login"
        type="text"
        placeholder="Введите логин"
        value={login}
        onChange={handleInputChange}
      />

<Input
        id="password"
        type="text"
        placeholder="Введите пароль"
        value={password}
        onChange={handleInputChange}
      />

      <Button name="Отправить запрос" onClick={handleGetStatus} />
      {loading && <Loader />}
      {result && <Result data={result} />} 
    </div>
  );
}

export default Pppoe;
