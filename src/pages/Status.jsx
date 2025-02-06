import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSerial } from "../store/actions/serialActions";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import Result from "../components/Result";
import { getStatus } from "../functions/status";
import { LinkButton } from "../components/Link";

function Status() {
  const dispatch = useDispatch();
  // Получаем значение serial из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial);

  const [serial, setSerialState] = useState(serialFromRedux || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setSerialState(serialFromRedux);
  }, [serialFromRedux]);

  const handleInputChange = (event) => {
    const newSerial = event.target.value;
    setSerialState(newSerial);
    dispatch(setSerial(newSerial));
  };

  const handleGetStatus = async () => {
    setLoading(true);
    setResult(null);
    setProgress(0);

    try {
      await getStatus(serial, setLoading, setResult, setProgress);
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
      {loading && <Loader progress={progress} />}
      <LinkButton name="Перейти на PPPoE" to="/pppoe" />
    </div>
  );
}

export default Status;
