import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSerial } from '../store/actions/serialActions'; // Импортируем action для записи в Redux
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import Result from '../components/Result';
import { getStatus } from '../functions/status';
import { LinkButton } from "../components/Link";

function Status() {
  const dispatch = useDispatch();
  const [serial, setSerialState] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (event) => {
    setSerialState(event.target.value);  
  };

  const handleGetStatus = async () => {
    dispatch(setSerial(serial));

    setLoading(true);
    setResult(null);
    setProgress(0); 

    try {
      await getStatus(serial, setLoading, setResult, setProgress); 
    } catch (error) {
      console.error('Ошибка при получении статуса:', error);
    }
  };

  return (
    <div id="status">
      <h2>Статус NTU</h2>
      <Input
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={serial} 
        onChange={handleInputChange} 
      />
      <Button name="Отправить запрос" onClick={handleGetStatus} />
      {loading && <Loader progress={progress} />}
      {result && <Result data={result} />}
      <LinkButton name="Перейти на PPPoE" to="/pppoe" />
    </div>
  );
}

export default Status;
