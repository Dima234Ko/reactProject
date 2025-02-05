import { useState } from 'react'; 
import { InputNTU } from './components/Input';
import { Button } from './components/Button';
import { getStatus } from './functions/status';
import { authorization } from './functions/authorization';
import { Loader } from './components/Loader'; 

function App() {
  const [serial, setSerial] = useState(''); 
  const [loading, setLoading] = useState(false);  

  const handleInputChange = (value) => {
    setSerial(value);  
  };

  const handleGetStatus = async () => {
    setLoading(true); 
    try {
      await getStatus(serial, setLoading); 
    } catch (error) {
      console.error('Ошибка при получении статуса:', error);
    }
  };

  return (
    <div id="app">
      <h2>Статус NTU</h2>
      <InputNTU onChange={handleInputChange} /> 
      <Button name="Авторизация" id="click1" onClick={authorization} />
      <Button name="Отправить запрос" id="click2" onClick={handleGetStatus} />
      {loading && <Loader />}
    </div>
  );
}

export default App;
