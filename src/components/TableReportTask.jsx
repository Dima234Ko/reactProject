import React from "react";
import { Table } from "../components/Table";

export function TableReportTask({ taskData }) {
  console.log("Task data:", taskData);

  // Проверяем, что taskData существует
  if (!taskData) {
    return <div>Данные задачи отсутствуют</div>;
  }

  // Собираем данные для таблицы
  const tableRows = [];

  // ntuStatuses
  if (taskData.ntuStatuses !== null && taskData.ntuStatuses?.length > 0) {
    taskData.ntuStatuses.forEach((item, index) => {
      tableRows.push({
        key: `ntuStatuses-${index}`,
        name: `ntuStatuses[${index}]`,
        respResult: JSON.stringify(item.respResult.type, null, 2),
      });
    });
  }

  // ntuPppoeEntities
  if (taskData.ntuPppoeEntities !== null && taskData.ntuPppoeEntities?.length > 0) {
    taskData.ntuPppoeEntities.forEach((item, index) => {
      tableRows.push({
        key: `ntuPppoeEntities-${index}`,
        name: `ntuPppoeEntities[${index}]`,
        respResult: JSON.stringify(item.respResult.type, null, 2),
      });
    });
  }

  // ntuWifiEntities
  if (taskData.ntuWifiEntities !== null && taskData.ntuWifiEntities?.length > 0) {
    taskData.ntuWifiEntities.forEach((item, index) => {
      tableRows.push({
        key: `ntuWifiEntities-${index}`,
        name: `ntuWifiEntities[${index}]`,
        respResult: JSON.stringify(item.respResult.type, null, 2),
      });
    });
  }

  // photos
  if (taskData.photos !== null && taskData.photos?.length > 0) {
    taskData.photos.forEach((item, index) => {
      tableRows.push({
        key: `photos-${index}`,
        name: `photos[${index}]`,
        respResult: JSON.stringify(item.respResult.type || item, null, 2),
      });
    });
  }

  // Определяем столбцы таблицы
  const columns = ["Название", "respResult"];

  // Создаем тело таблицы
  const tableBody = tableRows.map((row) => (
    <tr key={row.key}>
      <td>{row.name}</td>
      <td>
        <pre>{row.respResult}</pre>
      </td>
    </tr>
  ));

  return (
    <div className="table-report-task">
      <h3>Детали задачи</h3>
      {tableRows.length > 0 ? (
        <Table columns={columns} className="task-table" id="taskTable">
          {tableBody}
        </Table>
      ) : (
        <p>Нет данных для отображения</p>
      )}
    </div>
  );
}