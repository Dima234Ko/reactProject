import React from 'react';

export function FilterDisplay({
  startDate,
  endDate,
  selectedUser,
  ponSerial,
  regionTask,
  loginTask,
}) {
  return (
    <div className="filter-display">
      {startDate && <div className="filter-item">Начало: {startDate}</div>}
      {endDate && <div className="filter-item">Конец: {endDate}</div>}
      {selectedUser && (
        <div className="filter-item">Пользователь: {selectedUser}</div>
      )}
      {ponSerial && <div className="filter-item">PON Serial: {ponSerial}</div>}
      {regionTask && <div className="filter-item">Регион: {regionTask}</div>}
      {loginTask && <div className="filter-item">Логин: {loginTask}</div>}
      {!startDate &&
        !endDate &&
        !selectedUser &&
        !ponSerial &&
        !regionTask &&
        !loginTask && (
          <div className="filter-item empty">Общие фильтры не выбраны</div>
        )}
    </div>
  );
}
