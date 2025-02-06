import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { getStatus } from "../functions/status";
import { Loader } from "../components/Loader";

function Status() {
  const [serial, setSerial] = useState("");
  const [loading, setLoading] = useState(false);

  // Обработчик изменения значения в поле ввода
  const handleInputChange = (event) => {
    setSerial(event.target.value);  // Получаем значение из события и обновляем состояние
  };

  const handleGetStatus = async () => {
    setLoading(true);
    try {
      await getStatus(serial, setLoading);
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
      {loading && <Loader />}
    </div>
  );
}

export default Status;
