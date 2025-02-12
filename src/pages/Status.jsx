import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setSerial } from "../store/actions/serialActions";
import { setProgress } from "../store/actions/progressActions";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import Result from "../components/Result";
import { getStatus } from "../functions/status";
import { checkTask } from "../functions/task";
import { NextButton } from "../components/Link";
import { FormInfo } from "../components/Form";
import { Checkbox } from "../components/Checkbox";

function Status() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const [serial, setSerialState] = useState(serialFromRedux || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Синхронизация serial с Redux
  useEffect(() => {
    setSerialState(serialFromRedux);
  }, [serialFromRedux]);

  // Проверка статуса задачи при изменении URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const taskIdFromUrl = queryParams.get("task");
    dispatch(setSerial(queryParams.get("serial")));

    if (taskIdFromUrl && !loading) {
      if (!result) {
        setLoading(true);
        setResult(null);
        checkTask(
          "setNTU/taskStatus",
          taskIdFromUrl,
          dispatch,
          setLoading,
          setResult,
          navigate,
          0,
          50,
        );
      }
    }
  }, [location.search, navigate, loading, dispatch, progressFromRedux, result]);

  const handleInputChange = (event) => {
    const newSerial = event.target.value;
    setSerialState(newSerial);
    dispatch(setSerial(newSerial));
  };

  // Обработчик для получения статуса
  const handleGetStatus = async () => {
    dispatch(setProgress(0));
    setLoading(true);
    setIsFormOpen(true);
    setResult(null);
    navigate(`?serial=${serial}`, { replace: true });

    try {
      // Передаем isChecked в getStatus
      await getStatus(
        serial,
        isChecked,
        setLoading,
        setResult,
        dispatch,
        navigate,
        progressFromRedux,
      );
    } catch (error) {
      console.error("Ошибка при получении статуса:", error);
    }

    setTimeout(() => {
      setIsFormOpen(false);
    }, 30000);
  };

  // Функция для изменения состояния чекбокса
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Обновляем состояние чекбокса
  };

  // Функция для закрытия формы
  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div id="status">
      <h2>Статус NTU</h2>
      <FormInfo isFormOpen={isFormOpen} closeForm={closeForm} />
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

      {result && <Result data={result} />}

      <NextButton
        to={`/pppoe?serial=${serial}`}
        disabled={result === null || result.success === false}
      />
    </div>
  );
}

export default Status;
