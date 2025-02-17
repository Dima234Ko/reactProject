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

  return (
    <div id="log">
      <h2>Логи запросов</h2>
      {/* Форма с информацией (например, загрузка фото) */}
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={
          <div className="input-container">
            <Input
              id="start_data"
              type="date"
            />
            <Input
              id="stop_data"
              type="date"
            />
            <Select id="user" options={user} />
            <Input
              id="id_Ntu"
              type="text"
              placeholder="Введите pon-serial"
            />
            <Input
              id="input_login"
              type="text"
              placeholder="Введите учетную запись (aks)"
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
