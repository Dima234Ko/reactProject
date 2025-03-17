import React, { useState, useEffect } from "react";
import { Table } from "../../components/Table";
import {FiltrButton } from "../../components/Button";
import { FormInfo } from "../../components/Form/Form";
import { FormFilterLog } from "../../components/Form/FormFilterLog";
import { Loader } from "../../components/Loader";
import { getReport } from "../../functions/report";

function Report() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getLogData = async () => {
    let reportData = await getReport();
    return reportData;
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
    "Вид работ",
    "US"
  ];

  const tableBody = filteredData.map((row, index) => (
    <tr key={row.id}>
      <td>{row.data}</td>
      <td>{row.login}</td>
      <td>{row.ponSerial}</td>
      <td>{row.headerWorkName}</td>
      <td>{row.idUserSideCard}</td>
    </tr>
  ));

  return (
    <div id="log">
      <h2>Отчет</h2>
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