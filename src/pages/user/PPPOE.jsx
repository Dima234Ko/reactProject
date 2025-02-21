import { useState, useEffect } from "react";
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
import { FormInfo } from "../../components/Form/Form";
import { FormUser } from "../../components/Form/FormUser";

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
  const [formContent, setFormContent] = useState({
    fromData: (
      <div className="textForm">
        <h2>Внимание</h2>
        <div>
          <pre>Произошёл сбой</pre>
        </div>
        <ul>
          <li>Необходимо настроить PPPoE</li>
        </ul>
      </div>
    ),
  });

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
    const fetchData = async () => {
      try {
        await checkTaskStatus(
          location,
          loading,
          result,
          dispatch,
          setSerial,
          setLoading,
          setResult,
          navigate
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
        setIsFormOpen(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [location.search, navigate]);

  const handleSetPppoe = async () => {
    if (login !== "") {
      if (login !== prevLogin) {
        setPrevLogin(login);
      }
      dispatch(setProgress(0));
      setLoading(true);
      setResult(null);
      navigate(`?serial=${serial}`, { replace: true });

      setFormContent({
        fromData: (
          <FormUser
            login={login}
            setResult={setResult}
            searchIdUs={searchIdUs}
            setInfoToUs={setInfoToUs}
            result={result}
          />
        ),
      });
      setIsFormOpen(true);

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
    } else {
      setResult({
        result: "Введите логин",
        success: false,
      });
    }
  };

  const openForm = () => {
    if (login !== "") {
      setIsFormOpen(true);
    } else {
      setResult({
        result: "Введите логин",
        success: false,
      });
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div id="pppoe">
      <h2>Настройка PPPoE</h2>
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={formContent.fromData}
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