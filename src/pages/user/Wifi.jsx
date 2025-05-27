import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setProgress } from '../../store/actions/progressActions';
import { setSerial } from '../../store/actions/serialActions';
import { setRegion } from '../../store/actions/regionActions';
import { setWork } from '../../store/actions/workActions';
import { setWiFi } from '../../functions/settingWifi';
import { checkTaskStatus } from '../../functions/task';
import { searchIdUs } from '../../functions/settingPppoe';
import { getNumberBrowserUrl, getParamBrowserUrl } from '../../functions/url';
import { getRegion } from '../../functions/region';
import { setLogin } from '../../store/actions/loginActions';
import { closeTask } from '../../functions/work';
import SelectSSID from '../../components/Select/SelectSSID';
import SelectSSID5 from '../../components/Select/SelectSSID5';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import NextButton from '../../components/Button/NextButton';
import Loader from '../../components/Loader';
import Result from '../../components/Result';

function Wifi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loginFromRedux = useSelector((state) => state.login.login);
  const workFromRedux = useSelector((state) => state.work.work);
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const regionFromRedux = useSelector((state) => state.region.region);
  const page = useSelector((state) => state.task.page);
  const [serial, setSerialState] = useState(serialFromRedux || '');
  const [regionId, setRegionId] = useState(regionFromRedux || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [ssid2_4, setSsid2_4] = useState('');
  const [password2_4, setPassword2_4] = useState('');
  const [selectSSID2_4, setSelectSSID2_4] = useState('auto');
  const [ssid5, setSsid5] = useState('');
  const [password5, setPassword5] = useState('');
  const [selectSSID5, setSelectSSID5] = useState('auto');
  const regionFromUrl = getNumberBrowserUrl('region');
  const loginFromUrl = getParamBrowserUrl('login' || '');
  const workFromUrl = getParamBrowserUrl('work');
  

  // Обработка параметров из URL
  useEffect(() => {
    setSerialState(serialFromRedux);

    if (workFromUrl) {
      dispatch(setWork(workFromUrl));
    }

    if (regionFromUrl) {
      setRegionId(regionFromUrl);
      dispatch(setRegion(regionFromUrl));
    }

    if (loginFromUrl !== '') {
      dispatch(setLogin(loginFromUrl));
    }

    const queryParams = new URLSearchParams(location.search);
    const taskIdFromUrl = queryParams.get('task');

    if (!taskIdFromUrl) {
      fetchDataWiFi();
    }
  }, [serialFromRedux]);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      dispatch(setSerial(queryParams.get('serial')));
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

  // Асинхронная функция для получения данных WiFi
  const fetchDataWiFi = async () => {
    if (serialFromRedux !== '') {
      try {
        let data;
        if (loginFromRedux !== null) {
          data = await searchIdUs({
            loginFromRedux,
            serialFromRedux,
            setResult,
            param: 'login',
            page: 'wifi',
          });
        } else if (loginFromUrl === '') {
          data = await searchIdUs({
            serialFromRedux,
            setResult,
            param: 'serial',
            page: 'wifi',
          });
          dispatch(setLogin(data.userLogin));
        }
        if (data) {
          setSsid2_4(data.ssidWifi2 || '');
          setSsid5(data.ssidWifi5 || '');
          setPassword2_4(data.passWifi2 || '');
          setPassword5(data.passWifi5 || '');
          setSelectSSID2_4(data.channelWifi2 || 'auto');
          setSelectSSID5(data.channelWifi5 || 'auto');
          setResult({
            result: `Вы работаете с карточкой ${data.userLogin}`,
            success: false,
          });
        }
      } catch (error) {
        console.error('Ошибка при получении данных WiFi:', error);
        setResult({
          result: 'Ошибка при получении данных WiFi',
          success: false,
        });
      }
    }
  };

  // Обработчик для настройки WiFi
  const handleSetWiFi = async () => {
    if (!ssid2_4 || !password2_4 || !ssid5 || !password5) {
      setResult({
        result: 'Заполните все поля',
        success: false,
      });
      return;
    }

    setLoading(true);
    setResult(false);
    dispatch(setProgress(0));

    try {
      await setWiFi({
        serial,
        ssid2_4,
        password2_4,
        selectSSID2_4,
        ssid5,
        password5,
        selectSSID5,
        workFromRedux,
        setLoading,
        setResult,
        dispatch,
        navigate,
        regionId,
      });
      if (page === 'wifi2' && result?.success){
        closeTask({navigate, regionFromRedux, dispatch}); 
      }


    } catch (error) {
      setResult({
        result: error.message,
        success: false,
      });
    }
  };

  return (
    <div id="wifi">
      <h2>Настройка WiFi</h2>
      <h5>{getRegion(regionId)}</h5>
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

      <div className="ssid-container">
        <Input
          id="SSID2_4"
          type="text"
          placeholder="Введите SSID 2.4Ггц"
          value={ssid2_4}
          onChange={(e) => {
            const newSsid = e.target.value;
            setSsid2_4(newSsid);
            setSsid5(newSsid + '_5G');
          }}
        />
        <SelectSSID
          value={selectSSID2_4}
          onChange={(e) => setSelectSSID2_4(e.target.value)}
        />
      </div>

      <div className="ssid-container">
        <Input
          id="password2_4"
          type="text"
          placeholder="Введите пароль"
          value={password2_4}
          onChange={(e) => {
            setPassword2_4(e.target.value);
            setPassword5(e.target.value);
          }}
        />
      </div>

      <div className="ssid-container">
        <Input
          id="SSID5"
          type="text"
          placeholder="Введите SSID 5Ггц"
          value={ssid5}
          onChange={(e) => setSsid5(e.target.value)}
        />
        <SelectSSID5
          value={selectSSID5}
          onChange={(e) => setSelectSSID5(e.target.value)}
        />
      </div>

      <div className="ssid-container">
        <Input
          id="password5"
          type="text"
          placeholder="Введите пароль"
          value={password5}
          onChange={(e) => setPassword5(e.target.value)}
        />
      </div>

      {result && <Result data={result} />}

      <Button name="Отправить запрос" onClick={handleSetWiFi} />
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader progress={progressFromRedux} />
          </div>
        </div>
      )}

      {workFromRedux === 'newConnection' && page !== 'wifi2' && (
        <NextButton
          to={`/info?region=${regionId}&work=${workFromRedux}&serial=${serialFromRedux}${
            loginFromRedux !== null ? `&login=${loginFromRedux}` : ''
          }`}
          disabled={result === null || result?.buttonVisible !== true}
        />
      )}
    </div>
  );
}

export default Wifi;
