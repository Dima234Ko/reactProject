import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setSerial } from '../../store/actions/serialActions';
import { setRegion } from '../../store/actions/regionActions';
import { setProgress } from '../../store/actions/progressActions';
import { setWork } from '../../store/actions/workActions';
import { clearLogin } from '../../store/actions/loginActions';
import { getStatus } from '../../functions/status';
import { checkTaskStatus } from '../../functions/task';
import { getParamBrowserUrl } from '../../functions/url';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader';
import Result from '../../components/Result';
import FormSelectNewConnection from '../../components/Form/FormSelectNewConnection';
import FormInfo from '../../components/Form/Form';
import Checkbox from '../../components/Checkbox';
import { getRegion } from '../../functions/region';

function Status() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const regionFromRedux = useSelector((state) => state.region.region);
  const workFromRedux = useSelector((state) => state.work.work);
  const [serial, setSerialState] = useState(serialFromRedux || '');
  const [regionId, setRegionId] = useState(regionFromRedux || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [formContent, setFormContent] = useState({
    fromData: '',
  });
  const regionFromUrl = getParamBrowserUrl('region');
  const workFromUrl = getParamBrowserUrl('work');

  useEffect(() => {
    dispatch(clearLogin());
    setSerialState(serialFromRedux);
    setRegionId(regionFromUrl);
    dispatch(setRegion(regionFromUrl));
    dispatch(setWork(workFromUrl));
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

  const handleInputChange = (event) => {
    const newSerial = event.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');
    setSerialState(newSerial);
    dispatch(setSerial(newSerial));
  };

  // Обработчик для получения статуса
  const handleGetStatus = async () => {
    dispatch(setProgress(0));
    setLoading(true);
    setResult(null);
    setError('');

    try {
      await getStatus({
        serial,
        isChecked,
        setLoading,
        setResult,
        dispatch,
        navigate,
        regionId,
      });
      setIsChecked(false);
    } catch (error) {
      setResult({
        result: error.message,
        success: false,
      });
    }
  };

  // Обработчик для кнопки далее
  const moveOn = async () => {
    setFormContent({
      fromData: (
        <FormSelectNewConnection
          regionId={regionId}
          serial={serial}
          work={workFromRedux}
          dispatch={dispatch}
          navigate={navigate}
          closeForm={() => {
            setIsFormOpen(false);
            setLoading(false);
          }}
        />
      ),
    });
    setIsFormOpen(true);
  };

  // Функция для изменения состояния чекбокса
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const closeForm = () => setIsFormOpen(false);

  return (
    <div id="status">
      <h2>Статус NTU</h2>
      <h5>{getRegion(regionId)}</h5>
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
        onChange={handleInputChange}
      />
      <Checkbox
        label="Сброс устройства"
        id="reset"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {result && <Result data={result} />}
      <Button
        name="Отправить запрос"
        onClick={handleGetStatus}
        disabled={false}
      />
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader progress={progressFromRedux} />
          </div>
        </div>
      )}

      <Button
        name="Далее"
        onClick={moveOn}
        className="button green"
        disabled={result === null || result?.buttonVisible !== true}
      />
    </div>
  );
}

export default Status;
