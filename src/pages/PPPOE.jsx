import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setProgress } from "../store/actions/progressActions";
import { setSerial } from "../store/actions/serialActions";
import { Input } from "../components/Input";
import { Button, UserButton } from "../components/Button";
import { Loader } from "../components/Loader";
import Result from "../components/Result";
import { setPppoe } from "../functions/pppoe";
import { checkTask } from "../functions/task";
import { NextButton } from "../components/Link";
import { FormUser } from "../components/Form";

function Pppoe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем значения serial и progress из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const [serial, setSerialState] = useState(serialFromRedux || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [prevLogin, setPrevLogin] = useState("");

  // Заполняем поле serial из параметров URL, если оно есть
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serialFromUrl = queryParams.get("serial");
    if (serialFromUrl) {
      dispatch(setSerial(serialFromUrl)); // Обновляем serial в Redux
      setSerialState(serialFromUrl); // Обновляем локальное состояние для отображения
    }
  }, [location.search, dispatch]); 

  // Обновление serialState при изменении serial из Redux
  useEffect(() => {
    setSerialState(serialFromRedux);
  }, [serialFromRedux]);

  // Проверка статуса задачи при изменении URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const taskIdFromUrl = queryParams.get("task");

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
        80
      );
    }
  }, [location.search, dispatch, result, loading, navigate, serialFromRedux]);

  // Обработчик изменения serial
  const handleInputChange = (event) => {
    const newSerial = event.target.value;
    setSerialState(newSerial);
    dispatch(setSerial(newSerial)); // обновляем значение в Redux
  };

  // Обработчик изменения логина
  const handleLoginChange = (e) => {
    const newLogin = e.target.value;
    setLogin(newLogin);
  };

  // Отправка PPPoE запроса
  const handleSetPppoe = async () => {
    // Проверяем, был ли изменен логин
    if (login !== prevLogin) {
      setIsFormOpen(true); 
      setPrevLogin(login); 
    }

    dispatch(setProgress(0));
    setLoading(true);
    setResult(null);
    navigate(`?serial=${serial}`, { replace: true });

    try {
      await setPppoe(
        serial,
        login,
        password,
        setLoading,
        setResult,
        dispatch,
        navigate,
        progressFromRedux
      );
    } catch (error) {
      console.error("Ошибка применения параметров:", error);
      setLoading(false);
    }
  };

  // Открытие формы
  const openForm = () => {
    setIsFormOpen(true);
  };

  // Закрытие формы
  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div id="pppoe">
      <h2>Настройка PPPoE</h2>
      <FormUser isFormOpen={isFormOpen} closeForm={closeForm} />
      <Input
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={serial}
        onChange={handleInputChange}
        disabled={true}
      />
      <Input
        id="login"
        type="text"
        placeholder="Введите логин"
        value={login}
        onChange={handleLoginChange}
      />
      <Input
        id="password"
        type="text"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button name="Отправить запрос" onClick={handleSetPppoe} />
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader progress={progressFromRedux} />
          </div>
        </div>
      )}
      <UserButton onClick={openForm} />
      {result && <Result data={result} />}
      <NextButton
        to={`/wifi?serial=${serial}`}
        disabled={result === null || result.success === false}
      />
    </div>
  );
}

export default Pppoe;
