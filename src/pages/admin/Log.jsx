import React, { useState, useEffect } from "react";
import { Table } from "../../components/Table";
import { Input } from "../../components/Input";
import { DropdownSelect } from "../../components/Select"; // Предполагаем, что это путь к нашему кастомному DropdownSelect
import { Button, FiltrButton } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { FormInfo } from "../../components/Form/Form";
import { Loader } from "../../components/Loader";

function Log() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isManualChecked, setIsManualChecked] = useState(false);
  const [isAutoChecked, setIsAutoChecked] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ponSerial, setPonSerial] = useState("");
  const [login, setLogin] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // Добавлено для DropdownSelect

  const getLogData = async () => {
    const logData = [
      {
        data: "2024-10-01 15:00:42",
        login: "John",
        id: "HWTCA641697C",
        info: "Запрос статуса",
        acc: "aks3222",
      },
      {
        data: "2024-10-02 15:00:42",
        login: "Doe",
        id: "HWTCA641697D",
        info: "Запрос статуса",
        acc: "aks3223",
      },
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(logData);
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getLogData();
        setData(result);
        setFilteredData(result); // Изначально показываем все данные
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const user = ["Иванов", "Краснов"];
  const columns = [
    "Дата",
    "Логин",
    "ID устройства",
    "Содержимое лога",
    "Учетная запись",
  ];

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleManualCheckboxChange = (e) => {
    setIsManualChecked(e.target.checked);
  };

  const handleAutoCheckboxChange = (e) => {
    setIsAutoChecked(e.target.checked);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handlePonSerialChange = (e) => {
    setPonSerial(e.target.value);
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handleSearch = () => {
    let filtered = [...data];

    // Фильтр по дате начала
    if (startDate) {
      filtered = filtered.filter(row => new Date(row.data) >= new Date(startDate));
    }

    // Фильтр по дате окончания
    if (endDate) {
      filtered = filtered.filter(row => new Date(row.data) <= new Date(endDate));
    }

    // Фильтр по PON-серийнику
    if (ponSerial) {
      filtered = filtered.filter(row => row.id.toLowerCase().includes(ponSerial.toLowerCase()));
    }

    // Фильтр по логину
    if (login) {
      filtered = filtered.filter(row => row.acc.toLowerCase().includes(login.toLowerCase()));
    }

    // Фильтр по выбранному пользователю
    if (selectedUser) {
      filtered = filtered.filter(row => row.login === selectedUser);
    }

    setFilteredData(filtered);
    console.log("Filtered data:", filtered);
  };

  return (
    <div id="log">
      <h2>Логи запросов</h2>
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={
          <div className="input-container">
            <div className="date-container">
              <Input
                id="start_data"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <Input
                id="stop_data"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            <DropdownSelect
              id="user-select"
              options={user}
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            />
            <Input
              id="id_Ntu"
              type="text"
              placeholder="Введите pon-serial"
              value={ponSerial}
              onChange={handlePonSerialChange}
            />
            <Input
              id="input_login"
              type="text"
              placeholder="Введите учетную запись (aks)"
              value={login}
              onChange={handleLoginChange}
            />
            <div className="wifiSearch">
              <h6>Выбор каналов WiFi</h6>
              <div className="checkbox-container">
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
            </div>
            <Button name="Поиск" onClick={handleSearch} />
          </div>
        }
      />
      <div id="tableButton">
        <FiltrButton onClick={openForm} />
      </div>
      {loading && (
        <div className="spinner-container">
          <Loader />
        </div>
      )}
      <Table columns={columns} className="log-table" id="logTable">
        {filteredData.map((row, index) => (
          <tr key={row.id + index}>
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