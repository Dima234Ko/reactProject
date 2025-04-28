import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSerial } from '../../store/actions/serialActions';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import { getRegion } from '../../functions/region';

function Replcement() {
  const dispatch = useDispatch();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const regionFromRedux = useSelector((state) => state.region.region);
  const [serial, setSerialState] = useState(serialFromRedux || '');
  const [regionId, setRegionId] = useState(regionFromRedux || '');
  const [oldSerial, setOldSerial] = useState('');

  const handleInputChange = (event) => {
    const newSerial = event.target.value;
    setSerialState(newSerial);
    dispatch(setSerial(newSerial));
  };

  return (
    <div id="repalcement">
      <h2>Замена NTU</h2>
      <h5>{getRegion(regionId)}</h5>
      <div className="pon-container">
        <Input
          id="id_Ntu"
          type="text"
          placeholder="Введите pon-serial новой NTU"
          value={serial}
          onChange={handleInputChange}
        />
      </div>
      <div className="pon-container">
        <Input
          id="id_Ntu"
          type="text"
          placeholder="Введите pon-serial старой NTU"
          value={oldSerial}
          onChange={(e) => setOldSerial(e.target.value)}
        />
      </div>
      <Button name="Отправить запрос" onClick={console.log('Замена')} />
      {/* {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader/>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Replcement;
