import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setSerial } from "../store/actions/serialActions";
import { setProgress } from "../store/actions/progressActions"; // Импортируем экшен для прогресса
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import Result from "../components/Result";
import { getStatus, checkTaskStatus } from "../functions/status";
import { LinkButton } from "../components/Link";

function Status() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем значения serial и progress из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress); // Получаем значение прогресса

  const [serial, setSerialState] = useState(serialFromRedux || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Синхронизация serial с Redux
  useEffect(() => {
    setSerialState(serialFromRedux);
  }, [serialFromRedux]);

  // Проверка статуса задачи при изменении URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const taskIdFromUrl = queryParams.get("task");

    if (taskIdFromUrl && !loading) {
      // Если в URL есть taskId и запрос еще не выполняется
      setLoading(true);
      setResult(null);
      dispatch(setProgress(50));
      checkTaskStatus(
        taskIdFromUrl,
        dispatch,
        setLoading,
        setResult,
        navigate,
        0,
        progressFromRedux,
      ); // Передаем прогресс
    }
  }, [location.search, navigate, loading, dispatch, progressFromRedux]);

  // Обработчик изменения поля ввода
  const handleInputChange = (event) => {
    const newSerial = event.target.value;
    setSerialState(newSerial);
    dispatch(setSerial(newSerial)); // Обновляем serial в Redux
  };

  // Обработчик для получения статуса
  const handleGetStatus = async () => {
    dispatch(setProgress(0)); // Обнуляем прогресс перед запросом
    setLoading(true);
    setResult(null);

    try {
      await getStatus(
        serial,
        setLoading,
        setResult,
        dispatch,
        navigate,
        progressFromRedux,
      ); // Передаем прогресс
    } catch (error) {
      console.error("Ошибка при получении статуса:", error);
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
      {result && <Result data={result} />}
      <Button name="Отправить запрос" onClick={handleGetStatus} />
      {loading && <Loader progress={progressFromRedux} />}
      <LinkButton name="Перейти на PPPoE" to="/pppoe" />
    </div>
  );
}

export default Status;
