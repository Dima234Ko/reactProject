import { useState } from "react";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { authorization } from "../functions/authorization";
import { Loader } from "../components/Loader";

function Authorization() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Обработчик изменений для полей ввода
  const handleInputChange = (event) => {
    const { id, value } = event.target; // Деструктурируем из event.target
    if (id === "login") {
      setLogin(value); // Обновляем состояние для логина
    } else if (id === "password") {
      setPassword(value); // Обновляем состояние для пароля
    }
  };

  const handleAuthorization = async () => {
    setLoading(true);
    try {
      await authorization(login, password); // Передаем login и password в функцию авторизации
      navigate("/status");
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      alert("Ошибка авторизации. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="authorization">
      <h2>Авторизация</h2>
      <Input
        id="login"
        type="text"
        placeholder="Введите логин"
        value={login}
        onChange={handleInputChange}
      />
      <Input
        id="password"
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={handleInputChange}
      />
      <Button name="Авторизоваться" onClick={handleAuthorization} />
      {loading && <Loader />}
    </div>
  );
}

export default Authorization;
