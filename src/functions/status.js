import { requestAPI } from "./api";
import { setProgress } from "../store/actions/progressActions";
import { updateUrlWithParam } from "./url";

// Главная функция для получения статуса
export async function getStatus(
  serial,
  setLoading,
  setResult,
  dispatch,
  navigate,
) {
  setLoading(true);
  setResult(null);
  dispatch(setProgress(0)); // Устанавливаем прогресс в 0

  try {
    // Получаем taskId
    const taskId = await getTaskId(serial, dispatch, setLoading, navigate);

    if (taskId) {
      // Если taskId получен, начинаем отслеживание статуса
      await checkTask(
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        0,
        30,
      );
    }
  } catch (error) {
    console.error("Ошибка при получении статуса:", error);
    setLoading(false);
  }
}

// Функция для получения taskId
export async function getTaskId(serial, dispatch, setLoading, navigate) {
  if (!serial) {
    alert("Введите pon-serial");
    setLoading(false);
    return null; // Если серийный номер не введен, возвращаем null
  }

  let action = "setNTU/statusNTU";
  let logPass = {
    regionId: 1,
    serialNewNtu: serial,
  };

  try {
    // Запрашиваем номер задачи
    const data = await requestAPI("POST", action, logPass);
    const taskId = data.taskId;

    dispatch(setProgress(30)); // Устанавливаем начальный прогресс

    // Добавляем taskId в URL
    updateUrlWithParam("task", taskId, navigate);

    return taskId; // Возвращаем taskId
  } catch (error) {
    alert("Ошибка при запросе taskId:", error);
    setLoading(false);
    return null;
  }
}

// Функция для проверки статуса задачи
export async function checkTask(
  taskId,
  dispatch,
  setLoading,
  setResult,
  navigate,
  attempts,
  progress,
) {
  const action = `setNTU/taskStatus/${taskId}`;

  try {
    // Опрос статуса задачи
    const taskData = await requestAPI("GET", action);

    // Если задача не завершена, повторяем через 10 секунд
    if (taskData.status !== "completed") {
      if (progress < 90) {
        progress = progress + 5;
        dispatch(setProgress(progress)); // Обновляем прогресс в Redux
      }

      setTimeout(
        () =>
          checkTask(
            taskId,
            dispatch,
            setLoading,
            setResult,
            navigate,
            attempts + 1,
            progress,
          ),
        10000,
      ); // Повторяем через 10 секунд
    } else {
      dispatch(setProgress(100)); // Устанавливаем прогресс в 100%
      setLoading(false); // Закрываем загрузку
      setResult(taskData.result); // Обновляем результат
    }
  } catch (error) {
    if (attempts < 5) {
      dispatch(setProgress("NaN")); // Отображаем неопределенное значение прогресса
      setTimeout(
        () =>
          checkTask(
            taskId,
            dispatch,
            setLoading,
            setResult,
            navigate,
            attempts + 1,
            progress,
          ),
        10000,
      ); // Повторяем запрос через 10 секунд
    } else {
      alert("Ошибка при запросе статуса после 5 попыток: " + error);
      setLoading(false); // Закрываем загрузку
    }
  }
}
