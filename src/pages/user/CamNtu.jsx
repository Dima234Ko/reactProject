import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setProgress } from '../../store/actions/progressActions';
import { setSerial } from '../../store/actions/serialActions';
import { setRegion } from '../../store/actions/regionActions';
import { setWork } from '../../store/actions/workActions';
import { checkTaskStatus } from '../../functions/task';
import { getNumberBrowserUrl, getParamBrowserUrl } from '../../functions/url';
import { getRegion } from '../../functions/region';
import { settingCCTVforNtu } from '../../functions/settingCamNtu';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader';
import Result from '../../components/Result';
import FormInfo from '../../components/Form/Form';
import FormAddVlan from '../../components/Form/FormAddVlan';
import RadioButtonGroup from '../../components/RadioButtonGroup';

function CamNtu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const cancelTokenFromRedux = useSelector((state) => state.progress.cancelToken);
  const regionFromRedux = useSelector((state) => state.region.region);
  const [serial, setSerialState] = useState(serialFromRedux || '');
  const [regionId, setRegionId] = useState(regionFromRedux || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [serviceType, setServiceType] = useState('bd');
  const [portNumber, setPortNumber] = useState('one');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formContent, setFormContent] = useState(null);
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

  // Функция для открытия формы VLAN
  const showVlanForm = () => {
    return new Promise((resolve) => {
      setFormContent(
        <FormAddVlan
          setCreateSuccess={(vlan) => resolve(vlan)}
          onClose={() => {
            setIsFormOpen(false);
            resolve(null);
          }}
        />
      );
      setIsFormOpen(true);
    });
  };

  // Обработчик отправки запроса
  const handleSubmit = async () => {
    setResult(null);
    dispatch(setProgress(0));

    try {
      await settingCCTVforNtu({
        serial,
        serviceType,
        portNumber,
        regionId,
        dispatch,
        setLoading,
        navigate,
        setResult,
        showVlanForm,
        cancelTokenFromRedux
      });
    } catch (error) {
      setResult({
        result: error.message,
        success: false,
      });
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormContent(null);
  };

  return (
    <div id="camNtu">
      <h2>Настройка CCTV</h2>
      <h5>{getRegion(regionId) || 'Регион не выбран'}</h5>
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={formContent}
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
      <div className="camService">
        <h6>Выберите количество портов</h6>
        <RadioButtonGroup
          options={{
            one: '1',
            two: '2',
            three: '3',
            four: '4',
          }}
          isVisible={true}
          onChange={setPortNumber}
          selectedValue={portNumber}
          layout="horizontal"
          style={{ marginTop: '10px' }}
          nameGroup="radioGroupPort"
        />
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
          text="h4"
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
