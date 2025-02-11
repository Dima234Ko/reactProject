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

function Status() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем значения serial и progress из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
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
    dispatch(setSerial(queryParams.get("serial")));

    if (taskIdFromUrl && !loading) {
      // Если в URL есть taskId и запрос еще не выполняется
      if (!result) {
        // Проверка на то, что результат ещё не получен
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

  // Обработчик serial в Redux при изменении поля ввода
  const handleInputChange = (event) => {
    const newSerial = event.target.value;
    setSerialState(newSerial);
    dispatch(setSerial(newSerial));
  };

  // Обработчик для получения статуса
  const handleGetStatus = async () => {
    dispatch(setProgress(0));
    setLoading(true);
    setResult(null);
    navigate(`?serial=${serial}`, { replace: true });
    try {
      await getStatus(
        serial,
        setLoading,
        setResult,
        dispatch,
        navigate,
        progressFromRedux,
      );
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
      <Button name="Отправить запрос" onClick={handleGetStatus} />
      {loading && <Loader progress={progressFromRedux} />}
      {result && <Result data={result} />}
      <NextButton to={`/pppoe?serial=${serial}`} disabled={!result} />
    </div>
  );
}

export default Status;
