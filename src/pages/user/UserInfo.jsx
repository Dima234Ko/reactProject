import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getNumberBrowserUrl, getParamBrowserUrl } from '../../functions/url';
import { searchIdUs } from '../../functions/settingPppoe';
import { setInfoToUs } from '../../functions/userInfo';
import { closeTask } from '../../functions/work';
import { setSerial } from '../../store/actions/serialActions';
import { setLogin } from '../../store/actions/loginActions';
import { getRegion } from '../../functions/region';
import { setWork } from '../../store/actions/workActions';
import { setRegion } from '../../store/actions/regionActions';
import { setId } from '../../store/actions/idActions';
import Button from '../../components/Button/Button';
import UploadButton from '../../components/Button/UploadButton';
import Input from '../../components/Input';
import FormInfo from '../../components/Form/Form';
import FormPhoto from '../../components/Form/FormPhoto';
import Loader from '../../components/Loader';
import Result from '../../components/Result';

function UserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const workFromRedux = useSelector((state) => state.work.work);
  const loginFromRedux = useSelector((state) => state.login.login);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const idFromRedux = useSelector((state) => state.id.id);
  const regionFromRedux = useSelector((state) => state.region.region);
  const page = useSelector((state) => state.task.page);
  const [regionId, setRegionId] = useState('');
  const [serial, setSerialState] = useState(serialFromRedux || '');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState(null);
  const [isUploadSuccessful, setUploadSuccess] = useState(false);
  const serialFromUrl = getParamBrowserUrl('serial');
  const loginFromUrl = getParamBrowserUrl('login') || '';
  const workFromUrl = getParamBrowserUrl('work');
  const regionFromUrl = getNumberBrowserUrl('region');

  useEffect(() => {
    if (serialFromUrl) {
      dispatch(setSerial(serialFromUrl));
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (workFromUrl) {
      dispatch(setWork(workFromUrl));
    }

    if (regionFromUrl) {
      setRegionId(regionFromUrl);
      dispatch(setRegion(regionFromUrl));
    }

    if (loginFromUrl) {
      dispatch(setLogin(loginFromUrl));
    }

    if (loginFromRedux !== '') {
      fetchDataUser();
    }
  }, [serialFromRedux]);

  const fetchDataUser = async () => {
    try {
      let data;
      if (loginFromRedux) {
        data = await searchIdUs({
          loginFromRedux,
          serialFromRedux,
          setResult,
          param: 'login',
        });
      } else if (serialFromRedux) {
        data = await searchIdUs({
          serialFromRedux,
          setResult,
          param: 'serial',
        });
      }
      if (data?.idUserSideCard) {
        dispatch(setId(data.idUserSideCard));
      }

      if (data?.userFullName && data.userFullName !== data.userLogin) {
        const [surname, name, patronymic] = data.userFullName
          .split(' ')
          .concat(['', ''])
          .slice(0, 3);
        setSurname(surname);
        setName(name);
        setPatronymic(patronymic);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      setResult({
        result: 'Ошибка при получении данных',
        success: false,
      });
    }
  };

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setResult(null);
      await setInfoToUs({
        loginFromRedux,
        surname,
        name,
        patronymic,
        phone,
        workFromRedux,
      });
      setResult({
        result: 'Данные успешно записаны',
        success: true,
      });
      setTimeout(() => {
        navigate(`/work?region=${regionFromRedux}`);
      }, 2000);
    } catch (error) {
      console.error('Ошибка при записи данных:', error);
      setResult({
        result: `Ошибка при записи данных: ${error.message}`,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="info">
      <h2>Данные верны?</h2>
      {regionId && <h5>{getRegion(regionId)}</h5>}

      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={
          <FormPhoto
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            setFile={setFile}
            login={loginFromRedux}
            idUserSideCard={idFromRedux}
            workFromRedux={workFromRedux}
            setUploadSuccess={setUploadSuccess}
            dispatch={dispatch}
          />
        }
      />

      <div className="input-container">
        <Input
          id="surname"
          type="text"
          placeholder="Введите фамилию"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <Input
          id="name"
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          id="patronymic"
          type="text"
          placeholder="Введите отчество"
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value)}
        />
        <Input
          id="phone"
          type="tel"
          placeholder="Введите телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <UploadButton onClick={openForm} />

      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader progress={progressFromRedux} />
          </div>
        </div>
      )}

      {result && <Result data={result} />}

      <Button
        name="Записать"
        onClick={handleSubmit}
        disabled={loading || !surname || !name || page !== 'end'}
      />
    </div>
  );
}

export default UserInfo;
