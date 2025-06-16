import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setProgress } from '../../store/actions/progressActions';
import { setSerial } from '../../store/actions/serialActions';
import { setRegion } from '../../store/actions/regionActions';
import { setLogin } from '../../store/actions/loginActions';
import { setWork } from '../../store/actions/workActions';
import { setWarning } from '../../store/actions/warningActions';
import { setPppoe, searchIdUs } from '../../functions/settingPppoe';
import { checkTaskStatus } from '../../functions/task';
import { getNumberBrowserUrl, getParamBrowserUrl } from '../../functions/url';
import { getRegion } from '../../functions/region';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader';
import Result from '../../components/Result';
import FormInfo from '../../components/Form/Form';
import NextButton from '../../components/Button/NextButton';
import WarningForm from '../../components/Form/FromWarning';
import StatusIndicator from '../../components/StatusIndicator';

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
  const cancelTokenFromRedux = useSelector((state) => state.progress.cancelToken);
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
    const queryParams = new URLSearchParams(location.search);
    dispatch(setSerial(queryParams.get('serial')));
    const fetchData = async () => {
      try {
        await checkTaskStatus({
          location,
          loading,
          result,
          dispatch,
          setLoading,
          setResult,
          navigate,
        });
      } catch (error) {
        setResult({
          result: error.message,
          success: false,
        });
      }
    };
    fetchData();
  }, [location.search, navigate]);

  useEffect(() => {
    if (cancelTokenFromRedux){ 
      
      const handleKeyDown = (event) => {
        event.preventDefault();
        event.stopPropagation(); 
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [cancelTokenFromRedux]);

  const handleSetPppoe = async () => {
    const showWarningForm = () => {
      return new Promise((resolve) => {
        setFormContent({
          fromData: (
            <WarningForm
              onContinue={() => {
                dispatch(setWarning(false));
                closeForm();
                resolve(true);
              }}
              onCancel={() => {
                dispatch(setWarning(true));
                closeForm();
                resolve(false);
              }}
            />
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
          await setPppoe({
            serial,
            login,
            password,
            workFromRedux,
            setLoading,
            setResult,
            dispatch,
            navigate,
            regionId,
            cancelTokenFromRedux
          });
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
        const data = await searchIdUs({
          currentLogin,
          serialFromRedux,
          setResult,
          param: 'login',
          page: 'pppoe',
        });
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
        <StatusIndicator />
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
      {result && <Result data={result} />}
      <Button name="Отправить запрос" onClick={handleSetPppoe} />
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader progress={progressFromRedux} />
          </div>
        </div>
      )}
      <NextButton
        to={`/wifi?region=${regionId}&work=${workFromRedux}&serial=${serialFromRedux}&login=${loginFromRedux}`}
        disabled={result === null || result?.buttonVisible !== true}
      />
    </div>
  );
}

export default Pppoe;
