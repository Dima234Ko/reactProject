import React, { useState } from "react";
import { Input } from "../Input";
import { DropdownSelect } from "../Select";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";

export function FormFilterReport({ onClose }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [ponSerial, setPonSerial] = useState("");
  const [login, setLogin] = useState("");
  const [isManualChecked, setIsManualChecked] = useState(false);
  const [isAutoChecked, setIsAutoChecked] = useState(false);
   
  const users = ["Иванов", "Краснов"];


  const handleSearch = () => {
    const filters = {
      startDate,
      endDate,
      selectedUser,
      ponSerial,
      login,
      isManualChecked,
      isAutoChecked,
    };

    // Если нужно закрыть форму после поиска
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="input-container">
      <div className="date-container">
        <Input
          id="start_data"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          id="stop_data"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <DropdownSelect
        id="user-select"
        options={users}
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      />
      <Input
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={ponSerial}
        onChange={(e) => setPonSerial(e.target.value)}
      />
      <Input
        id="input_login"
        type="text"
        placeholder="Введите учетную запись (aks)"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <div className="wifiSearch">
        <h6>Выбор каналов WiFi</h6>
        <div className="checkbox-container">
          <Checkbox
            label="Ручной"
            id="manual"
            checked={isManualChecked}
            onChange={(e) => setIsManualChecked(e.target.checked)}
          />
          <Checkbox
            label="Авто"
            id="auto"
            checked={isAutoChecked}
            onChange={(e) => setIsAutoChecked(e.target.checked)}
          />
        </div>
      </div>
      <Button name="Поиск" onClick={handleSearch} />
    </div>
  );
}