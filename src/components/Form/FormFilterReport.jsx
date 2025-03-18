import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../Input";
import { DropdownSelect } from "../Select";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { 
  setStartDate,
  setEndDate,
  setLoginPage,
  setPonSerialPage
} from "../../store/actions/pageLogActions";
import { getLogins } from "../../functions/account";
import { getReport } from "../../functions/report";

export function FormFilterReport({ onClose }) {
  const dispatch = useDispatch();
  
  const [startDate, setLocalStartDate] = useState("");
  const [endDate, setLocalEndDate] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [ponSerial, setLocalPonSerial] = useState("");
  const [login, setLocalLogin] = useState("");
  const [isManualChecked, setIsManualChecked] = useState(false);
  const [isAutoChecked, setIsAutoChecked] = useState(false);
  const [users, setUsers] = useState([]);


  // Загрузка пользователей при монтировании компонента
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

  const handleSearch = () => {
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
    dispatch(setLoginPage(selectedUser)); 
    dispatch(setPonSerialPage(ponSerial));
  
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