import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setProgress } from "../../store/actions/progressActions";
import { setSerial } from "../../store/actions/serialActions";
import { Input } from "../../components/Input";
import { Button, UserButton } from "../../components/Button";
import { Loader } from "../../components/Loader";
import Result from "../../components/Result";
import { setPppoe } from "../../functions/pppoe";
import { checkTaskStatus } from "../../functions/task";
import { NextButton } from "../../components/Link";
import { FormInfo } from "../../components/Form";

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

  // Состояние для полей формы
  const [formFields, setFormFields] = useState({
    surname: "",
    name: "",
    patronymic: "",
    phone: "",
  });

  // Функция при клике на кнопку "Записать"
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Форма отправлена с данными:", formFields);
    closeForm();
  };

  // Функция для обновления состояния полей формы
  const handleInputChange = (event, fieldName) => {
    const newValue = event.target.value;
    setFormFields((prevFields) => ({
      ...prevFields,
      [fieldName]: newValue,
    }));
  };

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
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={
          <div className="input-container">
            <h2>Если абонент новый, заполните форму</h2>
            <pre>если нет, просто закройте её</pre>
              <input
                className="some-input"
                id="surname"
                type="text"
                placeholder="Введите фамилию"
                value={formFields.surname}
                onChange={(e) => handleInputChange(e, "surname")}
              />
              <input
                className="some-input"
                id="name"
                type="text"
                placeholder="Введите имя"
                value={formFields.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
              <input
                className="some-input"
                id="patronymic"
                type="text"
                placeholder="Введите отчество"
                value={formFields.patronymic}
                onChange={(e) => handleInputChange(e, "patronymic")}
              />
              <input
                className="some-input"
                id="phone"
                type="tel"
                placeholder="Введите телефон"
                value={formFields.phone}
                onChange={(e) => handleInputChange(e, "phone")}
              />
              <button className="button blue" type="submit">
                Записать
              </button>
          </div>
        }
      />
      <Input
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={serial}
        onChange={(e) => setSerialState(e.target.value)}
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
