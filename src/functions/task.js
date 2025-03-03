import { requestAPI } from "./api";
import { setProgress } from "../store/actions/progressActions";
import { updateUrlWithParam } from "./url";

// Функция для получения taskId
export async function getTaskId(
  action,
  body,
  dispatch,
  setLoading,
  navigate,
  serial,
) {
  try {
    // Запрашиваем номер задачи
    const data = await requestAPI("POST", action, body);
    const taskId = data.taskId;

    dispatch(setProgress(30)); // Устанавливаем начальный прогресс

    // Добавляем taskId в URL
    updateUrlWithParam("serial", serial, navigate);
    updateUrlWithParam("task", taskId, navigate);

    return taskId; // Возвращаем taskId
  } catch (error) {
    setLoading(false);
    throw error;
  }
}

// Функция для проверки статуса задачи из URL
export const checkTaskStatus = async (
  location,
  loading,
  result,
  dispatch,
  setSerial,
  setLoading,
  setResult,
  navigate,
) => {
  const queryParams = new URLSearchParams(location.search);
  const taskIdFromUrl = queryParams.get("task");
  dispatch(setSerial(queryParams.get("serial")));

  if (taskIdFromUrl && !loading) {
    if (!result) {
      setLoading(true);
      setResult(null);
      try {
        await checkTask(
          "setNTU/taskStatus",
          taskIdFromUrl,
          dispatch,
          setLoading,
          setResult,
          navigate,
          0,
          50,
        );
      } catch (error) {
        setLoading(false);
        throw error;
      }
    }
  }
};

// Функция для проверки статуса задачи
export async function checkTask(
  action,
  taskId,
  dispatch,
  setLoading,
  setResult,
  navigate,
  attempts = 0,
  progress = 30,
) {
  const statusAction = `${action}/${taskId}`;

  try {
    // Опрос статуса задачи
    const taskData = await requestAPI("GET", statusAction);

    // Если задача не завершена, повторяем через 10 секунд
    if (taskData.status !== "completed") {
      if (progress < 90) {
        progress = Math.min(progress + 5, 90); // Прогресс не должен превышать 90
        dispatch(setProgress(progress)); // Обновляем прогресс в Redux
      }

      // Используем задержку через Promise, чтобы использовать await
      await new Promise((resolve) => setTimeout(resolve, 10000));

      // Рекурсивный вызов checkTask
      await checkTask(
        action,
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        attempts + 1,
        progress,
      );
    } else {
      dispatch(setProgress(100)); // Устанавливаем прогресс в 100%
      setLoading(false); // Закрываем загрузку
      setResult(taskData.result); // Обновляем результат
      // Сохраняем результат
      if (taskData.result.RX_power) {
        localStorage.setItem(
          "RX_power",
          JSON.stringify(taskData.result.RX_power),
        );
      }
    }
  } catch (error) {
    setLoading(false);
    throw error; // Пробрасываем ошибку дальше
  }
}
