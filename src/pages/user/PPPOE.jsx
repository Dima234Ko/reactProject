import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setProgress } from '../../store/actions/progressActions';
import { setSerial } from '../../store/actions/serialActions';
import { setRegion } from '../../store/actions/regionActions';
import { setLogin } from '../../store/actions/loginActions';
import { setWork } from '../../store/actions/workActions';
import { setWarning } from '../../store/actions/warningActions';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import Result from '../../components/Result';
import { FormInfo } from '../../components/Form/Form';
import { setPppoe, searchIdUs } from '../../functions/pppoe';
import { checkTaskStatus } from '../../functions/task';
import { NextButton } from '../../components/Link';
import { getNumberBrowserUrl, getParamBrowserUrl } from '../../functions/url';
import { getRegion } from '../../functions/region';
import { ExpressButton } from '../../components/Button';

function Pppoe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const regionFromRedux = useSelector((state) => state.region.region);
  const loginFromRedux = useSelector((state) => state.login.login);
  const workFromRedux = useSelector((state) => state.work.work);
  const warningFromRedux = useSelector((state) => state.warning.warning);
  const [serial, setSerialState] = useState(serialFromRedux || '');
  const [regionId, setRegionId] = useState(regionFromRedux || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [login, setLoginInp] = useState(loginFromRedux || '');
  const [password, setPassword] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const regionFromUrl = getNumberBrowserUrl('region');
  const loginFromUrl = getParamBrowserUrl('login');
  const workFromUrl = getParamBrowserUrl('work');
  const [formContent, setFormContent] = useState({
    fromData: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setSerialState(serialFromRedux);

      if (serialFromRedux !== '') {
        const data = await searchIdUs(serialFromRedux, '', setResult, 'serial');
        dispatch(setLogin(data.userLogin));
      }

      if (workFromUrl) {
        dispatch(setWork(workFromUrl));
      }

      if (regionFromUrl) {
        setRegionId(regionFromUrl);
        dispatch(setRegion(regionFromUrl));
      }

      if (loginFromUrl) {
        setLoginInp(loginFromUrl);
        dispatch(setLogin(loginFromUrl));
      }

      const queryParams = new URLSearchParams(location.search);
      const taskIdFromUrl = queryParams.get('task');

      if (!taskIdFromUrl) {
        await handleLoginChange(true);
      }
    };

    fetchData();
  }, [serialFromRedux]);

  useEffect(() => {
    const initialize = async () => {
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
        setResult({
          result: error.message,
          success: false,
        });
      }
    };
    initialize();
  }, [location.search, navigate]);

  const handleSetPppoe = async () => {
    const showWarningForm = () => {
      return new Promise((resolve) => {
        setFormContent({
          fromData: (
            <div className="textForm">
              <h2>Внимание</h2>
              <pre>Данный PON Serial указан в другой карточке US</pre>
              <div className="input-container">
                <ExpressButton
                  onClick={() => {
                    dispatch(setWarning(false));
                    closeForm();
                    resolve(true);
                  }}
                  text="Продолжить"
                  closeButton={false}
                />
                <ExpressButton
                  onClick={() => {
                    dispatch(setWarning(true));
                    closeForm();
                    resolve(false);
                  }}
                  text="Завершить"
                  closeButton={true}
                />
              </div>
            </div>
          ),
        });
        setIsFormOpen(true);
      });
    };

    const settingPppoe = async () => {
      if (login !== '') {
        dispatch(setLogin(login));
        setLoading(true);
        setResult(false);
        dispatch(setProgress(0));

        try {
          await setPppoe(
            serial,
            login,
            password,
            workFromRedux,
            setLoading,
            setResult,
            dispatch,
            navigate,
            regionId
          );
        } catch (error) {
          setResult({
            result: error.message,
            success: false,
          });
        }
      } else {
        setResult({
          result: 'Введите логин',
          success: false,
        });
      }
    };

    if (warningFromRedux) {
      const shouldContinue = await showWarningForm();
      if (shouldContinue) {
        await settingPppoe();
      }
    } else {
      await settingPppoe();
    }
  };

  const handleLoginChange = async (primary) => {
    const currentLogin = primary ? loginFromUrl : login;

    if (currentLogin !== '' && serialFromRedux !== '') {
      try {
        const data = await searchIdUs(
          currentLogin,
          serialFromRedux,
          setResult,
          'login',
          'pppoe'
        );
        let hasWarning =
          data.idBySerial != null && data.idBySerial !== data.idByLogin;
        dispatch(setWarning(hasWarning));
      } catch (error) {
        console.error('Ошибка при проверке логина', error);
        setResult({
          result: 'Ошибка при проверке логина',
          success: false,
        });
      }
    } else {
      setResult({
        result: 'Введите логин',
        success: false,
      });
    }
  };

  const closeForm = () => setIsFormOpen(false);

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
          value={JSON.parse(localStorage.getItem('RX_power')) || '-0.0'}
          disabled={true}
        />
      </div>
      <div className="inp-contanier">
        <Input
          id="login"
          type="text"
          placeholder="Введите логин"
          value={login}
          onBlur={() => handleLoginChange(false)}
          onChange={(e) => setLoginInp(e.target.value)}
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
      {result && <Result data={result} />}
      <NextButton
        to={`/wifi?region=${regionId}&work=${workFromRedux}&serial=${serialFromRedux}&login=${loginFromRedux}`}
        disabled={result === null || result?.buttonVisible !== true}
      />
    </div>
  );
}

export default Pppoe;
