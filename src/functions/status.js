import { requestAPI } from "./api";

export async function getStatus(serial, setLoading) {
  if (!serial) {
    alert('Введите pon-serial');
    setLoading(false); 
    return;
  }

  let action = 'setNTU/statusNTU';
  let logPass = {
    "regionId": 1,
    "serialNewNtu": serial,
  };

  try {
    let data = await requestAPI('POST', action, logPass);
    let taskId = data.taskId;

    const checkTaskStatus = async () => {
      let action = `setNTU/taskStatus/${taskId}`;
      try {
        let taskData = await requestAPI('GET', action);
        if (taskData.status !== 'completed') {
          setTimeout(checkTaskStatus, 10000);
        } else {
          setLoading(false);  
          alert(taskData.result);
        }
      } catch (error) {
        alert('Ошибка при запросе статуса задачи:', error);
        setLoading(false);  
      }
    };
    checkTaskStatus();
  } catch (error) {
    alert('Ошибка при запросе статуса:', error);
    setLoading(false);
  }
}
