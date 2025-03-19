import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../Input";
import { DropdownSelect } from "../Select";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { 
  setStartDate,
  setEndDate,
  setUserPage, 
  setPonSerialPage,
  setCannal
} from "../../store/actions/pageLogTaskActions";
import { getLogins } from "../../functions/account";

export function FormFilterReport({ onClose, task }) {
  const dispatch = useDispatch();
  const pageLog = useSelector((state) => state.page);
  const [cannal, setLocalCannal] = useState(pageLog.cannal || "");
  const [startDate, setLocalStartDate] = useState(pageLog.startDate || "");
  const [endDate, setLocalEndDate] = useState(pageLog.endDate || "");
  const [selectedUser, setSelectedUser] = useState(pageLog.userPage || ""); 
  const [ponSerial, setLocalPonSerial] = useState(pageLog.ponSerialPage || "");
  const [login, setLocalLogin] = useState("");
  const [isManualChecked, setIsManualChecked] = useState(pageLog.cannal === "manual"); // Инициализация из Redux
  const [isAutoChecked, setIsAutoChecked] = useState(pageLog.cannal === "auto"); // Инициализация из Redux
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getLogins();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    fetchUsers();
  }, []);

  // Обработчик изменения чекбокса "Ручной"
  const handleManualChange = (checked) => {
    setIsManualChecked(checked);
    if (checked) {
      setLocalCannal("manual");
      setIsAutoChecked(false);
    } else if (!isAutoChecked) {
      setLocalCannal("");
    }
  };

  // Обработчик изменения чекбокса "Авто"
  const handleAutoChange = (checked) => {
    setIsAutoChecked(checked);
    if (checked) {
      setLocalCannal("auto");
      setIsManualChecked(false);
    } else if (!isManualChecked) {
      setLocalCannal("");
    }
  };

  const handleSearch = () => {
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
    dispatch(setUserPage(selectedUser));
    console.log(selectedUser)
    dispatch(setPonSerialPage(ponSerial));
    
    const cannalValue = isManualChecked ? "manual" : isAutoChecked ? "auto" : null;
    dispatch(setCannal(cannalValue));
  
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="input-container">
      <div className="form">
        <div className="date-container">
          <Input
            id="start_data"
            type="date"
            value={startDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
          />
          <Input
            id="stop_data"
            type="date"
            value={endDate}
            onChange={(e) => setLocalEndDate(e.target.value)}
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
          onChange={(e) => setLocalPonSerial(e.target.value)}
        />
        <Input
          id="input_login"
          type="text"
          placeholder="Введите учетную запись (aks)"
          value={login}
          onChange={(e) => setLocalLogin(e.target.value)}
        />
        {task !== true && ( 
          <div className="wifiSearch">
            <h6>Выбор каналов WiFi</h6>
            <div className="checkbox-container">
              <Checkbox
                label="Ручной"
                id="manual"
                checked={isManualChecked}
                onChange={(e) => handleManualChange(e.target.checked)}
              />
              <Checkbox
                label="Авто"
                id="auto"
                checked={isAutoChecked}
                onChange={(e) => handleAutoChange(e.target.checked)}
              />
            </div>
          </div>
        )}
        <Button name="Поиск" onClick={handleSearch} />
      </div>
    </div>
  );
}