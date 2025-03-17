import React from "react";
import { Table } from "../components/Table";

export function TableReportTask({ taskData }) {
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
        key: `ntuStatuses-${index + 1}`,
        name: `Запрос статуса [${index + 1}]`,
        respResult: JSON.stringify(item.respResult.type, null, 2),
      });
    });
  }

  // ntuPppoeEntities
  if (taskData.ntuPppoeEntities !== null && taskData.ntuPppoeEntities?.length > 0) {
    taskData.ntuPppoeEntities.forEach((item, index) => {
      tableRows.push({
        key: `ntuPppoeEntities-${index + 1}`,
        name: `Настройка PPPoE [${index + 1}]`,
        respResult: JSON.stringify(item.respResult.type, null, 2),
      });
    });
  }

  // ntuWifiEntities
  if (taskData.ntuWifiEntities !== null && taskData.ntuWifiEntities?.length > 0) {
    taskData.ntuWifiEntities.forEach((item, index) => {
      tableRows.push({
        key: `ntuWifiEntities-${index + 1}`,
        name: `Настройка WiFi [${index + 1}]`,
        respResult: JSON.stringify(item.respResult.type, null, 2),
      });
    });
  }

  // photos
  if (taskData.photos !== null && taskData.photos?.length > 0) {
    taskData.photos.forEach((item, index) => {
      tableRows.push({
        key: `photos-${index + 1}`,
        name: `Загрузка фото [${index + 1}]`,
        respResult: JSON.stringify(item.fileName || item, null, 2),
      });
    });
  }

  // equipmentShutdownDto
  if (taskData.equipmentShutdownDto !== null) {
    tableRows.push({
      key: `equipmentShutdownDto`,
      name: `Снятие оборудования`,
      respResult: JSON.stringify(taskData.equipmentShutdownDto.info, null, 2),
    });
  }

  // Определяем столбцы таблицы
  const columns = ["Название", "Действие"];

  // Создаем тело таблицы
  const tableBody = tableRows.map((row) => (
    <tr key={row.key}>
      <td>
        <pre>{row.name}</pre>
     </td>
      <td>
        <pre>{row.respResult}</pre>
      </td>
    </tr>
  ));

  return (
    <div className="table-report-task">
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