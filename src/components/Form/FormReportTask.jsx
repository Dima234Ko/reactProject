import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { requestAPI } from '../../functions/api';
import TableReportTask from '../Table/TableReportTask';

function FormReportTask({ onClose }) {
  const task = useSelector((state) => state.taskReport.task);
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskData = async () => {
      setLoading(true);
      try {
        const data = await requestAPI('GET', `logs/allInfo/${task}`);
        setTaskData(data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (task) {
      fetchTaskData();
    }
  }, [task]);

  return (
    <div className="input-container">
      <h2>Запросы пользователя</h2>
      {loading ? (
        <pre>Загрузка...</pre>
      ) : (
        <>
          <h6>Задача № {task || 'Не указано'}</h6>
          <pre>Исполнитель: {taskData.login || 'Не указано'}</pre>
          <TableReportTask taskData={taskData} />
        </>
      )}
    </div>
  );
}

export default FormReportTask;
