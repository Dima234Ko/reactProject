import { useState } from "react";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { authorization } from "../functions/authorization";
import { Loader } from "../components/Loader";
import Result from "../components/Result";

function Authorization() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null); 
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "login") {
      setLogin(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleAuthorization = async () => {
    setLoading(true);
    setResult(null);
    try {
      await authorization(login, password, setResult);
      navigate("/status");
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      setResult({ success: false, message: "Ошибка авторизации. Попробуйте еще раз" }); 
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
      {result && <Result data={result} />}
    </div>
  );
}

export default Authorization;
