import React from 'react';
import Table from './Table';
import { downloadPhotoToServer } from '../../functions/photo';

function TableReportTask({ taskData }) {
  if (!taskData) {
    return <div>Данные задачи отсутствуют</div>;
  }

  const tableRows = [];


  if (taskData.ntuStatuses !== null && taskData.ntuStatuses?.length > 0) {
    taskData.ntuStatuses.forEach((item, index) => {
      console.log(JSON.stringify(item.respResult).replace(/,/g, ',\n'));
      tableRows.push({
        key: `ntuStatuses-${index + 1}`,
        name: `Запрос статуса [${index + 1}]`,
        respResult: JSON.stringify(item.respResult)
        .replace(/,/g, ',\n')
        .replace(/^{/, '')
        .replace(/}$/, '')
        .replace(/"/g, '')
        .replace(/:/g, ': ')
      });
    });
  }

  

  if (
    taskData.ntuPppoeEntities !== null &&
    taskData.ntuPppoeEntities?.length > 0
  ) {
    taskData.ntuPppoeEntities.forEach((item, index) => {
      tableRows.push({
        key: `ntuPppoeEntities-${index + 1}`,
        name: `Настройка PPPoE [${index + 1}]`,
        respResult: item.respResult.success
          ? `PON: ${item.respResult.serialNewNtu},
${item.respResult.create_login_US === null ? 'Карточка существует в US' : item.respResult.create_login_US},
${item.respResult.write_PONserial}, 
${item.respResult.ont_config}`
          : `PON: ${item.respResult.serialNewNtu}
LOGIN: ${item.userLogin}
${item.respResult.info}`,
      });
    });
  }

  if (
    taskData.ntuWifiEntities !== null &&
    taskData.ntuWifiEntities?.length > 0
  ) {
    taskData.ntuWifiEntities.forEach((item, index) => {
      tableRows.push({
        key: `ntuWifiEntities-${index + 1}`,
        name: `Настройка WiFi [${index + 1}]`,
        respResult: item.respResult.success
          ? `PON: ${item.respResult.serialNewNtu},
${item.respResult.write_wifi_US},

Настройки WIFI 2.4Ггц
SSID: ${item.ssidWifi2},
PASS: ${item.passWifi2},
CHANNEL: ${item.channelWifi2} [${item.respResult.wifi2_channel}]

Настройки WIFI 5Ггц
SSID: ${item.ssidWifi5},
PASS: ${item.passWifi5},
CHANNEL: ${item.channelWifi5} [${item.respResult.wifi5_channel}]`
          : `PON: ${item.respResult.serialNewNtu}
${item.respResult.info}`,
      });
    });
  }

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

  if (taskData.equipmentShutdownDto !== null) {
    tableRows.push({
      key: `equipmentShutdownDto`,
      name: `Снятие оборудования`,
      respResult: `${taskData.equipmentShutdownDto.ponSerial},
${taskData.equipmentShutdownDto.work}
${taskData.equipmentShutdownDto.info}`,
    });
  }

  if (taskData.userInfo !== null) {
    tableRows.push({
      key: `userInfo`,
      name: `Уточнение данных`,
      respResult: `${taskData.userInfo.userFullName}`,
    });
  }

  if (taskData.cameraDto !== null) {
    tableRows.push({
      key: `cameraDto`,
      name: `Настройка камеры`,
      // respResult: `PON: ${taskData.cameraDto[0].serialNewNtu},
      respResult: `${taskData.cameraDto[0].respResult.info}`,
    });
  }

  if (taskData.staticIpDto !== null && taskData.staticIpDto?.length > 0) {
    taskData.staticIpDto.forEach((item, index) => {
      tableRows.push({
        key: `staticIpDto-${index + 1}`,
        name: `Настройка Static IP [${index + 1}]`,
        respResult: `NTU настроена
VLAN: ${taskData.staticIpDto[0].respResult.vlan}
IP: ${taskData.staticIpDto[0].respResult.ipAddress}
MASK: ${taskData.staticIpDto[0].respResult.subnetMask}
GATEWAY: ${taskData.staticIpDto[0].respResult.defaultGateway}`,
      });
    });
  }

  const columns = ['Действие', 'Результат'];

  const tableBody = tableRows.map((row) => (
    <tr key={row.key}>
      <td>
        <pre>{row.name}</pre>
      </td>
      <td>
        {row.name.includes('Загрузка фото') && row.id !== undefined ? (
          <pre onClick={() => downloadPhotoToServer(row.id)} className="link">
            {row.respResult}
          </pre>
        ) : (
          <pre>{row.respResult}</pre>
        )}
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

export default TableReportTask;
