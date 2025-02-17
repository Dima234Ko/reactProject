import React, { useState } from "react";
import { Table } from '../../components/Table';
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button, FiltrButton } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { FormInfo } from "../../components/Form";

const data = [
  { data: '2024-10-01 15:00:42', login: 'John', id: 'HWTCA641697C', info: 'Запрос статуса', acc: 'aks3222' },
  { data: '2024-10-01 15:00:42', login: 'Doe', id: 'HWTCA641697C', info: 'Запрос статуса', acc: 'aks3222' }
];

const user = ["Иванов", "Краснов"];

function Log() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isManualChecked, setIsManualChecked] = useState(false);
  const [isAutoChecked, setIsAutoChecked] = useState(false);
  const [startDate, setStartDate] = useState(""); // Состояние для начальной даты
  const [endDate, setEndDate] = useState(""); // Состояние для конечной даты
  const [ponSerial, setPonSerial] = useState(""); // Состояние для pon-serial
  const [login, setLogin] = useState(""); // Состояние для учетной записи
  const columns = ['Дата', 'Логин', 'ID устройства', 'Содержимое лога', 'Учетная запись'];

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Функции для изменения состояния чекбоксов
  const handleManualCheckboxChange = (e) => {
    setIsManualChecked(e.target.checked);
  };

  const handleAutoCheckboxChange = (e) => {
    setIsAutoChecked(e.target.checked);
  };

  // Функции для изменения дат
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value); // Обновляем значение начальной даты
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value); // Обновляем значение конечной даты
  };

  // Функции для изменения значений полей ввода
  const handlePonSerialChange = (e) => {
    setPonSerial(e.target.value); // Обновляем значение поля pon-serial
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value); // Обновляем значение поля учетной записи
  };

  return (
    <div id="log">
      <h2>Логи запросов</h2>
      {/* Форма с информацией (например, загрузка фото) */}
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={
          <div className="input-container">
            <div className="date-container">
              {/* Инпут для начальной даты */}
              <Input
                id="start_data"
                type="date"
                value={startDate} // Значение для начальной даты
                onChange={handleStartDateChange} // Обработчик изменения даты
              />
              {/* Инпут для конечной даты */}
              <Input
                id="stop_data"
                type="date"
                value={endDate} // Значение для конечной даты
                onChange={handleEndDateChange} // Обработчик изменения даты
              />
            </div>
            <Select id="user" options={user} />
            {/* Инпут для pon-serial */}
            <Input
              id="id_Ntu"
              type="text"
              placeholder="Введите pon-serial"
              value={ponSerial} // Значение для pon-serial
              onChange={handlePonSerialChange} // Обработчик изменения pon-serial
            />
            {/* Инпут для учетной записи */}
            <Input
              id="input_login"
              type="text"
              placeholder="Введите учетную запись (aks)"
              value={login} // Значение для учетной записи
              onChange={handleLoginChange} // Обработчик изменения учетной записи
            />
            <div className="wifiSearch">
              <h6>Выбор каналов WiFi</h6>
              <Checkbox
                label="Ручной"
                id="manual"
                checked={isManualChecked}
                onChange={handleManualCheckboxChange}
              />
              <Checkbox
                label="Авто"
                id="auto"
                checked={isAutoChecked}
                onChange={handleAutoCheckboxChange}
              />
            </div>
            <Button
              name="Поиск"
              onClick={console.log('button')}
            />
          </div>
        }
      />
      <div id="tableButton">
        <FiltrButton onClick={openForm} />
      </div>
      <Table columns={columns} className="log-table" id="logTable">
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.data}</td>
            <td>{row.login}</td>
            <td>{row.id}</td>
            <td>{row.info}</td>
            <td>{row.acc}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default Log;
