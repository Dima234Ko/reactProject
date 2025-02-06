import { requestAPI } from "./api";

export async function getStatus(serial, setLoading, setResult, setProgress) {
  let progress = 0;
  if (!serial) {
    alert("Введите pon-serial");
    setLoading(false);
    return;
  }

  let action = "setNTU/statusNTU";
  let logPass = {
    regionId: 1,
    serialNewNtu: serial,
  };

  try {
    // Запрашиваем номер задачи
    let data = await requestAPI("POST", action, logPass);
    let taskId = data.taskId;
    progress = progress + 30;
    setProgress(progress);

    // Функция для опроса статуса задачи
    const checkTaskStatus = async (attempts = 0) => {
      let action = `setNTU/taskStatus/${taskId}`;
      try {
        // Опрос статуса задачи
        let taskData = await requestAPI("GET", action);

        // Если задача не завершена, повторяем через 10 секунд
        if (taskData.status !== "completed") {
          if (progress < 90) {
            progress = progress + 5;
            setProgress(progress);
          }
          setTimeout(() => checkTaskStatus(attempts + 1), 10000);
        } else {
          setProgress(100);
          setLoading(false);
          setResult(taskData.result);
        }
      } catch (error) {
        if (attempts < 5) {
          setProgress("NaN");
          setTimeout(() => checkTaskStatus(attempts + 1), 10000);
        } else {
          alert("Ошибка при запросе статуса после 3 попыток:", error);
          setLoading(false);
        }
      }
    };

    checkTaskStatus();
  } catch (error) {
    alert("Ошибка при запросе статуса:", error);
    setLoading(false);
  }
}
