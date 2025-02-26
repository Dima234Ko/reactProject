import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setProgress } from "../../store/actions/progressActions";
import { setSerial } from "../../store/actions/serialActions";
import { setRegion } from "../../store/actions/regionActions";
import { Input } from "../../components/Input";
import { Button, UserButton } from "../../components/Button";
import { Loader } from "../../components/Loader";
import Result from "../../components/Result";
import { setPppoe, searchIdUs, setInfoToUs } from "../../functions/pppoe";
import { checkTaskStatus } from "../../functions/task";
import { NextButton } from "../../components/Link";
import { FormInfo } from "../../components/Form/Form";
import { FormUser } from "../../components/Form/FormUser";
import { getParamBrowserUrl } from "../../functions/url";
import { getRegion } from "../../functions/region";

function Pppoe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const regionFromRedux = useSelector((state) => state.region.region);
  const [serial, setSerialState] = useState(serialFromRedux || "");
  const [regionId, setRegionId] = useState(regionFromRedux || "");
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
          <h4>Необходимо настроить PPPoE</h4>
        </ul>
      </div>
    ),
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    setSerialState(serialFromRedux);
    const params = new URLSearchParams(location.search);
    const regionFromUrl = getParamBrowserUrl("region");
    setRegionId(regionFromUrl);
    dispatch(setRegion(regionFromUrl));
  }, [serialFromRedux, location.search]);

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
          navigate,
        );
      } catch (error) {
        setResult({
          result: error.message,
          success: false,
        });
      }
    };
    fetchData();
  }, [location.search, navigate]);

  const handleSetPppoe = async () => {
    if (login !== "") {
      if (login !== prevLogin) {
        setPrevLogin(login);
      }
      setLoading(true);
      setResult(false);
      dispatch(setProgress(0));

      setFormContent({
        fromData: (
          <FormUser
            login={login}
            data={data}
            setInfoToUs={setInfoToUs}
            closeForm={closeForm}
            setResult={setResult}
            searchIdUs={searchIdUs}
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
          regionId,
        );
      } catch (error) {
        setResult({
          result: error.message,
          success: false,
        });
      }
    } else {
      setResult({
        result: "Введите логин",
        success: false,
      });
    }
  };

  const handleLoginChange = async () => {
    setFormContent({
      fromData: (
        <div className="textForm">
          <h2>Внимание</h2>
          <div>
            <pre>Произошёл сбой</pre>
          </div>
          <ul>
            <h4>Необходимо настроить PPPoE</h4>
          </ul>
        </div>
      ),
    });
    if (login !== "") {
      try {
        let fetchedData = await searchIdUs(login, setResult, "login");
        setData(fetchedData);
      } catch (error) {
        console.error("Ошибка при проверке логина", error);
        setResult({
          result: "Ошибка при проверке логина",
          success: false,
        });
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
      <h5>{getRegion(regionId)}</h5>
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={formContent.fromData}
      />
      <div className="pon-container">
        <Input
          id="id_Ntu"
          type="text"
          placeholder="Введите pon-serial"
          value={serial}
          onChange={(e) => setSerialState(e.target.value)}
          disabled={true}
        />
        <Input
          id="level_Ntu"
          type="text"
          value={JSON.parse(localStorage.getItem("RX_power")) || "-0.0"}
          disabled={true}
        />
      </div>
      <div className="inp-contanier">
        <Input
          id="login"
          type="text"
          placeholder="Введите логин"
          value={login}
          onBlur={handleLoginChange}
          onChange={(e) => setLogin(e.target.value)}
        />
        </div>
        <div className="inp-contanier">
        <Input
          id="password"
          type="text"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
      />
      </div>
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
        to={`/wifi?${regionId}&serial=${serial}`}
        disabled={result === null || result.success === false}
      />
    </div>
  );
}

export default Pppoe;
