import React from "react"; 
import { ExpressButton } from "../Button";
import { useSelector } from "react-redux";

export function FormReportTask({ onClose }) {

  const task = useSelector((state) => state.taskReport.task);

  return (
    <div className="input-container">
      <h2>Выберите действие</h2>
      <pre>Задача № {task} </pre>
      <div className="input-container">
        <ExpressButton
          onClick={() => console.log("Запрос статуса")}
          text="Запрос статуса"
          closeButton={false}
        />
        <ExpressButton
          onClick={() => console.log("Настройка PPPoE")}
          text="Настройка PPPoE"
          closeButton={false}
        />
        <ExpressButton
          onClick={() => console.log("Настройка WiFi")}
          text="Настройка WiFi"
          closeButton={false}
        />
      </div>
    </div>
  );
}