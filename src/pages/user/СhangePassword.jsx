import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../../functions/api';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader';
import Result from '../../components/Result';

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  // Исправлена функция обработки ввода
  const handleInputChange = (event) => {
    setPassword(event.target.value); // Используем event.target.value
  };

  const handleAuthorization = async () => {
    setLoading(true);
    setResult(null);

    const body = {
      password: password,
    };

    try {
      if (password.length > 4) {
        const response = await requestAPI(
          'POST',
          'settings/updateUserPass',
          body
        );
        navigate(`/`);
      } else {
        setResult({
          success: false,
          message: 'Длина пароля слишком мала',
        });
      }
    } catch (error) {
      console.error('Ошибка при смене пароля:', error);
      setResult({
        success: false,
        message: 'Ошибка. Попробуйте ещё раз',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="authorization">
      <h2>Смена пароля</h2>
      <Input
        id="password"
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={handleInputChange}
      />
      {result && <Result data={result} />}
      <Button name="Сменить" onClick={handleAuthorization} />
      {loading && <Loader />}
    </div>
  );
}

export default ChangePassword;
