import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { FormInfo } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Loader } from '../../components/Loader';
import { Checkbox } from '../../components/Checkbox';
import Result from '../../components/Result';
import { disableNTU } from '../../functions/disabling';
import { RadioButtonGroup } from '../../components/RadioButtonGroup';

function Disabling() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [serial, setSerial] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isAbonentChecked, setIsAbonentChecked] = useState(false);
  const [selectedRadioOption, setSelectedRadioOption] = useState('option1');
  const radioOptions = {
    option1: 'Проблемы с Wi-Fi соединением',
    option2: 'Проблемы с оптическим сигналом',
    option3: 'Отсутствие индикации',
    option4: 'Механическое повреждение',
  };

  const handleFirstCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setIsAbonentChecked(false);
      setSelectedRadioOption('option1');
    } else {
      setSelectedRadioOption('');
    }
  };

  const handleSecondCheckboxChange = (e) => {
    setIsAbonentChecked(e.target.checked);
    if (e.target.checked) {
      setIsChecked(false);
      setSelectedRadioOption('');
    }
  };

  const handleRadioChange = (optionKey) => {
    setSelectedRadioOption(optionKey);
  };

  const handleSubmit = () => {
    disableNTU(
      isChecked,
      selectedRadioOption,
      radioOptions,
      serial,
      navigate,
      dispatch,
      setResult,
      setLoading
    );
    setIsFormOpen(false);
  };

  const formContent = {
    formData: (
      <div className="textForm">
        <h2>Причина отключения {serial}</h2>
        <pre>Сделайте выбор</pre>

        <div className="input-container">
          <div className="container" id="disablingForm">
            <Checkbox
              label="Неисправность оборудования"
              checked={isChecked}
              onChange={handleFirstCheckboxChange}
            />
            <RadioButtonGroup
              options={radioOptions}
              isVisible={isChecked}
              onChange={handleRadioChange}
              selectedValue={selectedRadioOption}
            />
            <Checkbox
              label="Отключение абонентской линии"
              checked={isAbonentChecked}
              onChange={handleSecondCheckboxChange}
            />
          </div>
          <Button name="Ок" onClick={handleSubmit} />
        </div>
      </div>
    ),
  };

  const openForm = () => {
    if (serial !== '') {
      setIsFormOpen(true);
      setResult(null);
    } else {
      setResult({
        result: 'Введите pon-serial',
        success: false,
      });
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div id="disabling">
      <h2>Отключение NTU</h2>
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={formContent.formData}
      />
      <Input
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
        disabled={loading}
      />
      {result && <Result data={result} />}
      <Button name="Снять NTU" onClick={openForm} />
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
}

export default Disabling;
