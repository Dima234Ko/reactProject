import React, { useState, useEffect } from "react";
import { Table } from "../../components/Table";
import { Input } from "../../components/Input";
import { DropdownSelect } from "../../components/Select";
import { Button, FiltrButton } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { FormInfo } from "../../components/Form/Form";
import { FormFilterLog } from "../../components/Form/FormFilterLog";
import { Loader } from "../../components/Loader";

function Report() {
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
  const [selectedUser, setSelectedUser] = useState("");

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
      setTimeout(() => resolve(logData), 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getLogData();
        setData(result);
        setFilteredData(result); // Устанавливаем начальные данные
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const users = ["Иванов", "Краснов"];
  const columns = [
    "Дата",
    "Логин",
    "ID устройства",
    "Содержимое лога",
    "Учетная запись",
  ];

  const handleSearch = () => {
    let filtered = [...data];

    if (startDate) {
      filtered = filtered.filter(
        (row) => new Date(row.data) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (row) => new Date(row.data) <= new Date(endDate)
      );
    }

    if (ponSerial) {
      filtered = filtered.filter((row) =>
        row.id.toLowerCase().includes(ponSerial.toLowerCase())
      );
    }

    if (login) {
      filtered = filtered.filter((row) =>
        row.acc.toLowerCase().includes(login.toLowerCase())
      );
    }

    if (selectedUser) {
      filtered = filtered.filter((row) => row.login === selectedUser);
    }

    setFilteredData(filtered);
  };

  const tableBody = filteredData.map((row, index) => (
    <tr key={row.id + index}>
      <td>{row.data}</td>
      <td>{row.login}</td>
      <td>{row.id}</td>
      <td>{row.info}</td>
      <td>{row.acc}</td>
    </tr>
  ));

  return (
    <div id="log">
      <h2>Логи запросов</h2>
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={() => setIsFormOpen(false)}
        formData={
          <FormFilterLog
            onClose={() => setIsFormOpen(false)}
          />
        }
      />
      <div id="tableButton">
        <FiltrButton onClick={() => setIsFormOpen(true)} />
      </div>
      {loading ? (
        <div className="spinner-container">
          <Loader />
        </div>
      ) : (
        <Table columns={columns} className="log-table" id="logTable">
          {tableBody}
        </Table>
      )}
    </div>
  );
}

export default Report;