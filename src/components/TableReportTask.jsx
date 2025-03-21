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
        respResult: item.respResult.success
          ? `PON ${item.respResult.serialNewNtu},
  ONT ${item.respResult.ont_status}, ${item.respResult.RX_power}, 
  OLT ${item.respResult.ip_olt} ${item.respResult.PON_port}/${item.respResult.PON_id}`
          : `PON ${item.respResult.serialNewNtu}
${typeof item.respResult.ont_status === "undefined" ? item.respResult.info : item.respResult.ont_status && !item.respResult.ont_status.includes("не найден на ACS") ? item.respResult.info : item.respResult.ont_status}`,
      });
    });
  }

  // ntuPppoeEntities
  if (
    taskData.ntuPppoeEntities !== null &&
    taskData.ntuPppoeEntities?.length > 0
  ) {
    taskData.ntuPppoeEntities.forEach((item, index) => {
      tableRows.push({
        key: `ntuPppoeEntities-${index + 1}`,
        name: `Настройка PPPoE [${index + 1}]`,
        respResult: item.respResult.success
          ? `PON ${item.respResult.serialNewNtu},
${item.respResult.create_login_US === null ? "Карточка существует в US" : item.respResult.create_login_US},
${item.respResult.write_PONserial}, 
${item.respResult.ont_config}`
          : `PON ${item.respResult.serialNewNtu}
${item.respResult.info}`,
      });
    });
  }

  // ntuWifiEntities
  if (
    taskData.ntuWifiEntities !== null &&
    taskData.ntuWifiEntities?.length > 0
  ) {
    taskData.ntuWifiEntities.forEach((item, index) => {
      tableRows.push({
        key: `ntuWifiEntities-${index + 1}`,
        name: `Настройка WiFi [${index + 1}]`,
        respResult: item.respResult.success
          ? `PON ${item.respResult.serialNewNtu},
${item.respResult.write_wifi_US},

Настройки WIFI 2.4Ггц
SSID ${item.ssidWifi2},
PASS ${item.passWifi2},
CHANNEL ${item.channelWifi2} [${item.respResult.wifi2_channel}]

Настройки WIFI 5Ггц
SSID ${item.ssidWifi5},
PASS ${item.passWifi5},
CHANNEL ${item.channelWifi5} [${item.respResult.wifi5_channel}]`
          : `PON ${item.respResult.serialNewNtu}
${item.respResult.info}`,
      });
    });
  }

  // photos
  if (taskData.photos !== null && taskData.photos?.length > 0) {
    taskData.photos.forEach((item, index) => {
      tableRows.push({
        id: item.id,
        key: `photos-${index + 1}`,
        name: `Загрузка фото [${index + 1}]`,
        respResult: item.fileName,
      });
    });
  }

  // equipmentShutdownDto
  if (taskData.equipmentShutdownDto !== null) {
    tableRows.push({
      key: `equipmentShutdownDto`,
      name: `Снятие оборудования`,
      respResult: `${taskData.equipmentShutdownDto.ponSerial},
${taskData.equipmentShutdownDto.work}
${taskData.equipmentShutdownDto.info}`,
    });
  }

  // Определяем столбцы таблицы
  const columns = ["Действие", "Результат"];

  // Создаем тело таблицы
  const tableBody = tableRows.map((row) => (
    <tr key={row.key}>
      <td>
        <pre>{row.name}</pre>
      </td>
      <td value = {row.id !== undefined ? row.id: null}>
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
