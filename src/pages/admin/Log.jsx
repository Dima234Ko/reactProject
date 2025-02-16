import React from 'react';
import { Table } from '../../components/Table';
import { Button, FiltrButton } from "../../components/Button";

const data = [
  { data: '2024-10-01 15:00:42	', login: 'John', id: 'HWTCA641697C', info: 'Запрос статуса', acc: 'aks3222'},
  { data: '2024-10-01 15:00:42	', login: 'Doe', id: 'HWTCA641697C', info: 'Запрос статуса', acc: 'aks3222'}
];

function Log() {
  // Заголовки для столбцов
  const columns = ['Дата', 'Логин', 'ID устройства', 'Содержимое лога', 'Учетная запись']; 

  return (
    <div id="log">
        <h2>Логи запросов</h2>
        <div id="tableButton">
        <FiltrButton onClick={console.log ('форма с фильтром')} />
        </div>
        <Table columns={columns} className="log-table" id="logTable">
        {data.map((row, index) => (
          <tr key={index}>
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