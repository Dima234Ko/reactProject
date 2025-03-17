import React, { useState, useEffect } from "react";
import { Table } from "../../components/Table";
import { FiltrButton } from "../../components/Button";
import { FormInfo } from "../../components/Form/Form";
import { FormFilterReport } from "../../components/Form/FormFilterReport";
import { FormReportTask } from "../../components/Form/FormReportTask";
import { Loader } from "../../components/Loader";
import { getReport } from "../../functions/report";

function Report() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [formContent, setFormContent] = useState(null); 

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
        setFilteredData(result);
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
    "US",
  ];

  // Функция, которая открывает форму FormReportTask и устанавливает её контент
  const handleHeaderWorkNameClick = (row) => {
    setFormContent(
      <FormReportTask
        onClose={() => setIsFormOpen(false)}
        rowData={row}
      />
    );
    setIsFormOpen(true);
  };

  // Функция для открытия формы фильтра
  const openFilterForm = () => {
    setFormContent(
      <FormFilterReport
        onClose={() => setIsFormOpen(false)}
      />
    );
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormContent(null); 
  };

  const tableBody = filteredData.map((row) => (
    <tr key={row.id}>
      <td>{row.data}</td>
      <td data-value={row.taskName}>{row.login}</td>
      <td>{row.ponSerial}</td>
      <td>
        <span
          onClick={() => handleHeaderWorkNameClick(row)}
          style={{ cursor: "pointer", color: "blue" }}
        >
          {row.headerWorkName}
        </span>
      </td>
      <td>{row.idUserSideCard}</td>
    </tr>
  ));

  return (
    <div id="log">
      <h2>Отчет</h2>
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={formContent}
      />
      <div id="tableButton">
        <FiltrButton onClick={openFilterForm} />
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