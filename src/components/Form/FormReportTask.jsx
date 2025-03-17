import React, { useState, useEffect } from "react";
import { ExpressButton } from "../Button";

export function FormReportTask(onClose, rowData) {
  return (
    <div className="input-container">
      <h2>Выберите действие</h2>
      <pre>Задача № {}</pre>
      <div className="input-container">
        <ExpressButton onClick={console.log('1')} text="Запрос статуса" closeButton={false} />
        <ExpressButton onClick={console.log('1')} text="Настройка PPPoE" closeButton={false} />
        <ExpressButton onClick={console.log('1')} text="Настройка WiFi" closeButton={false} />
      </div>
    </div>
  );
}
