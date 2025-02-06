import { requestAPI } from "./api";

export async function getStatus(serial, setLoading) {
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

    // Функция для опроса статуса задачи
    const checkTaskStatus = async (attempts = 0) => {
      let action = `setNTU/taskStatus/${taskId}`;
      try {
        // Опрос статуса задачи
        let taskData = await requestAPI("GET", action);

        // Если задача не завершена, повторяем через 10 секунд
        if (taskData.status !== "completed") {
          setTimeout(() => checkTaskStatus(attempts + 1), 10000);
        } else {
          setLoading(false);
          alert(taskData.result); // Выводим результат
        }
      } catch (error) {
        if (attempts < 5) {
          console.log(
            `Попытка ${attempts + 1} не удалась, повтор через 10 секунд`,
          );
          setTimeout(() => checkTaskStatus(attempts + 1), 10000);
        } else {
          alert("Ошибка при запросе статуса после 3 попыток:", error);
          setLoading(false);
        }
      }
    };

    // Запускаем первый опрос статуса
    checkTaskStatus();
  } catch (error) {
    alert("Ошибка при запросе статуса:", error);
    setLoading(false);
  }
}
