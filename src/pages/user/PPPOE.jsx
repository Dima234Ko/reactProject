import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setProgress } from "../../store/actions/progressActions";
import { setSerial } from "../../store/actions/serialActions";
import { Input } from "../../components/Input";
import { Button, UserButton } from "../../components/Button";
import { Loader } from "../../components/Loader";
import Result from "../../components/Result";
import { setPppoe, searchIdUs, setInfoToUs } from "../../functions/pppoe";
import { checkTaskStatus } from "../../functions/task";
import { NextButton } from "../../components/Link";
import { FormInfo } from "../../components/Form";

function Pppoe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const [serial, setSerialState] = useState(serialFromRedux || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [prevLogin, setPrevLogin] = useState("");
  const [resultForm, setResultForm] = useState(null);

  const [formFields, setFormFields] = useState({
    surname: "",
    name: "",
    patronymic: "",
    phone: "",
  });

  const loginInputRef = useRef(null);  // Ссылка на инпут логина

  const handleInputChange = (event, fieldName) => {
    const newValue = event.target.value;
    setFormFields((prevFields) => ({
      ...prevFields,
      [fieldName]: newValue,
    }));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serialFromUrl = queryParams.get("serial");
    if (serialFromUrl) {
      dispatch(setSerial(serialFromUrl));
      setSerialState(serialFromUrl);
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    setSerialState(serialFromRedux);
  }, [serialFromRedux]);

  useEffect(() => {
    checkTaskStatus(
      location,
      loading,
      result,
      dispatch,
      setSerial,
      setLoading,
      setResult,
      navigate
    );
  }, [location.search, navigate, loading, dispatch, result]);

  // Обработчик изменения логина при потере фокуса
  const handleLoginChange = async () => {
    console.log("Login changed or blurred");
    if (login !== ""){
      try {
        await searchIdUs(login, setResult);
      } catch (error) {
        console.error("Ошибка при проверке логина", error);
        setResult({
          result :'Ошибка при проверке логина',
          success: false
        })
      }
    } else 
      setResult({
        result :'Введите логин',
        success: false
    })
  };

  // Отправка данных в ЮС
  const handleSetInfoToUs = async () => {
    const { surname, name, patronymic, phone } = formFields;
    setResultForm("");
    try {
      await setInfoToUs(login, surname, name, patronymic, phone);
      setResultForm("Данные записаны");
    } catch (error) {
      setResultForm("Ошибка при записи данных");
      console.error("Ошибка при отправке данных: ", error);
    }
  };

  // Отправка PPPoE запроса
  const handleSetPppoe = async () => {
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
      setFormContent({
        fromData: (
          <div className="textForm">
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
            {resultForm && <div className="upload-result">{resultForm}</div>}
            <Button name="Записать" onClick={handleSetInfoToUs} />
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
        onChange={(e) => setLogin(e.target.value)}
        onBlur={handleLoginChange}
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
