import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setSerial } from '../../store/actions/serialActions';
import { setRegion } from '../../store/actions/regionActions';
import { setWork } from '../../store/actions/workActions';
import { checkTaskStatus } from '../../functions/task';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/Button';
import { Loader } from '../../components/Loader';
import Result from '../../components/Result';
import { getNumberBrowserUrl, getParamBrowserUrl } from '../../functions/url';
import { getRegion } from '../../functions/region';
import { RadioButtonGroup } from '../../components/RadioButtonGroup';

function CamNtu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const regionFromRedux = useSelector((state) => state.region.region);
  const workFromRedux = useSelector((state) => state.work.work);
  const [serial, setSerialState] = useState(serialFromRedux || '');
  const [regionId, setRegionId] = useState(regionFromRedux || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [serviceType, setServiceType] = useState('bd'); 
  const [portNumber, setPortNumber] = useState('one'); 
  const regionFromUrl = getNumberBrowserUrl('region');
  const workFromUrl = getParamBrowserUrl('work');

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

    };

    fetchData();
  }, [serialFromRedux]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    dispatch(setSerial(queryParams.get('serial')));
    const fetchData = async () => {
      try {
        await checkTaskStatus(
          location,
          loading,
          result,
          dispatch,
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

    fetchData();
  }, [location.search, navigate]);

  // Обработчик отправки запроса
  const handleSubmit = () => {
    console.log('Настройка:', { serial, channelMode });
  };

  return (
    <div id="camNtu">
      <h2>Настройка CCTV</h2>
      <h5>{getRegion(regionId) || 'Регион не выбран'}</h5>
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
      <div className="camService">
        <h6>Выберите верную услугу</h6>
        <RadioButtonGroup
          options={{
            bd: 'БД',
            fl: 'ФЛ',
          }}
          isVisible={true}
          onChange={setServiceType}
          selectedValue={serviceType}
          layout="horizontal"
          style={{ marginTop: '10px' }}
        />
        <h6>Выберите количество портов</h6>
        <RadioButtonGroup
          options={{
            one: '1',
            two: '2',
            three: '3',
            four: '4'
          }}
          isVisible={true}
          onChange={setPortNumber}
          selectedValue={portNumber}
          layout="horizontal"
          style={{ marginTop: '10px' }}
          nameGroup= 'radioGroupPort'
        />
      </div>
      {result && <Result data={result} />}
      <Button name="Отправить запрос" onClick={handleSubmit} />
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader progress={progressFromRedux} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CamNtu;