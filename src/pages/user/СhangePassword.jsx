import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePasswordProcessing } from '../../functions/changePassword';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader';
import Result from '../../components/Result';

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePassword = () => {
    changePasswordProcessing({
      password,
      setLoading,
      setResult,
      navigate,
    });
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
      <Button name="Сменить" onClick={handleChangePassword} />
      {loading && <Loader />}
    </div>
  );
}

export default ChangePassword;
