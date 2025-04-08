import { useState, useEffect } from 'react';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { authorization } from '../functions/authorization';
import { Loader } from '../components/Loader';
import Result from '../components/Result';

function Authorization() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  // Удаление authResult из localStorage при входе на страницу
  useEffect(() => {
    localStorage.removeItem('authResult');
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === 'login') {
      setLogin(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  const handleAuthorization = async () => {
    setLoading(true);
    setResult(null);
    try {
      let root = await authorization(login, password);
      if (root.result) {
        // Сохраняем результат в localStorage, если он существует
        localStorage.setItem('authResult', JSON.stringify(root.root));
        if (root.root === '1') {
          navigate('/user');
        } else if (root.root === '2' || root.root === '3') {
          navigate('/status');
        }
      } else {
        // Обработка случая, если нет результата
        setResult({
          success: false,
          message: 'Не удалось получить результат авторизации.',
        });
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      setResult({
        success: false,
        message: 'Ошибка авторизации. Попробуйте еще раз',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAuthorization();
    }
  };

  return (
    <div id="authorization">
      <h2>Авторизация</h2>
      <Input
        id="login"
        type="text"
        placeholder="Введите логин"
        value={login}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Добавляем обработчик Enter
      />
      <Input
        id="password"
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Добавляем обработчик Enter
      />
      {result && <Result data={result} />}
      <Button name="Войти" onClick={handleAuthorization} />
      {loading && <Loader />} 
    </div>
  );
}

export default Authorization;
