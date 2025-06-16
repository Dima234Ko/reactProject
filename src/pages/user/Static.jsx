import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setProgress } from '../../store/actions/progressActions';
import { setSerial } from '../../store/actions/serialActions';
import { setRegion } from '../../store/actions/regionActions';
import { setIp } from '../../store/actions/ipActions';
import { setWork } from '../../store/actions/workActions';
import { checkIP, checkMask, checkGateway, checkVlan, setStatic } from '../../functions/settingStatic';
import { checkTaskStatus } from '../../functions/task';
import { getNumberBrowserUrl, getParamBrowserUrl } from '../../functions/url';
import { getRegion } from '../../functions/region';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader';
import Result from '../../components/Result';
import FormInfo from '../../components/Form/Form';
import NextButton from '../../components/Button/NextButton';
import StatusIndicator from '../../components/StatusIndicator';

function Static() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const regionFromRedux = useSelector((state) => state.region.region);
  const workFromRedux = useSelector((state) => state.work.work);
  const cancelTokenFromRedux = useSelector((state) => state.progress.cancelToken);
  const [serial, setSerialState] = useState(serialFromRedux || '');
  const [regionId, setRegionId] = useState(regionFromRedux || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [ip, setIpInput] = useState('');
  const [mask, setMask] = useState('');
  const [gateway, setGetway] = useState('');
  const [vlan, setVlan] = useState('');


  const [isFormOpen, setIsFormOpen] = useState(false);
  const regionFromUrl = getNumberBrowserUrl('region');
  const ipFromUrl = getParamBrowserUrl('ip');
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

      if (ipFromUrl) {
        setIpInput(ipFromUrl);
          dispatch(setIp(ipFromUrl));
      }

      const queryParams = new URLSearchParams(location.search);
      const taskIdFromUrl = queryParams.get('task');

    };

    fetchData();
  }, [serialFromRedux]);

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

  const handleSetStatic = async () => {
    
    if (!await checkIP(ip)){
      setResult({
        result: 'Не верный IP',
        success: false,
      });
    } else if (!await checkMask(mask)){
      setResult({
        result: 'Не верная Mask',
        success: false,
      });
    } else if (!await checkGateway(ip, mask, gateway)){
      setResult({
        result: 'Не верный Gateway',
        success: false,
      });
    } else if (!await checkVlan(vlan)){
      setResult({
        result: 'Не верный Vlan',
        success: false,
      });
    } else {
      setLoading(true);
      setResult(false);
      dispatch(setIp(ip));
      dispatch(setProgress(0));
      setStatic({
        ip, 
        mask, 
        gateway, 
        vlan, 
        serial, 
        regionId, 
        dispatch, 
        setResult, 
        setProgress, 
        navigate, 
        setLoading,
        cancelTokenFromRedux 
      });
    }
  };

  const closeForm = () => setIsFormOpen(false);

  return (
    <div id="static">
      <h2>Настройка IP адреса</h2>
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
          id="ip"
          type="text"
          placeholder="Введите IP"
          value={ip}
          onChange={(e) => setIpInput(e.target.value)}
        />
      </div>
      <div className="inp-contanier">
        <Input
          id="mask"
          type="text"
          placeholder="Введите Mask"
          value={mask}
          onChange={(e) => setMask(e.target.value)}
        />
      </div>
      <div className="inp-contanier">
        <Input
          id="gateway"
          type="text"
          placeholder="Введите Default Gateway"
          value={gateway}
          onChange={(e) => setGetway(e.target.value)}
        />
      </div>
      <div className="inp-contanier">
        <Input
          id="vlan"
          type="text"
          placeholder="Введите Vlan"
          value={vlan}
          onChange={(e) => setVlan(e.target.value)}
        />
      </div>
      {result && <Result data={result} />}
      <Button name="Отправить запрос" onClick={handleSetStatic} />
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader progress={progressFromRedux} />
          </div>
        </div>
      )}
      <NextButton
        to={`/wifi?region=${regionId}&work=${workFromRedux}&serial=${serialFromRedux}&ip=${ip}`}
        disabled={result === null || result?.buttonVisible !== true}
      />
    </div>
  );
}

export default Static;
