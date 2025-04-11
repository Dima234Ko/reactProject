import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSerial } from '../../store/actions/serialActions';
import { setRegion } from '../../store/actions/regionActions';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/Button';
import { Loader } from '../../components/Loader';
import Result from '../../components/Result';
import { getNumberBrowserUrl } from '../../functions/url';
import { getRegion } from '../../functions/region';
import { RadioButtonGroup } from '../../components/RadioButtonGroup';
import { Checkbox } from '../../components/Checkbox';

function CamNtu() {
  const dispatch = useDispatch();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const regionFromRedux = useSelector((state) => state.region.region);
  const [serial, setSerialState] = useState(serialFromRedux || '');
  const [regionId, setRegionId] = useState(regionFromRedux || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [channelMode, setChannelMode] = useState('bd'); // Состояние для выбора БД/ФЛ
  const regionFromUrl = getNumberBrowserUrl('region');

  // Синхронизация regionId
  useEffect(() => {
    if (regionFromUrl) {
      setRegionId(regionFromUrl);
      dispatch(setRegion(regionFromUrl));
    } else if (regionFromRedux) {
      setRegionId(regionFromRedux);
    }
  }, [regionFromUrl, regionFromRedux, dispatch]);

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
          selectedValue={channelMode}
          onChange={setChannelMode}
          isVisible={true}
          layout="horizontal"
          style={{ marginTop: '10px' }}
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