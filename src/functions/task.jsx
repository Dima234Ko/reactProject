import { requestAPI } from "./api";
import { setProgress } from "../store/actions/progressActions";
import { updateUrlWithParam } from "./url";

// Функция для получения taskId
export async function getTaskId(action, body, dispatch, setLoading, navigate) {
  try {
    // Запрашиваем номер задачи
    const data = await requestAPI("POST", action, body);
    const taskId = data.taskId;

    dispatch(setProgress(30)); // Устанавливаем начальный прогресс

    // Добавляем taskId в URL
    updateUrlWithParam("task", taskId, navigate);

    return taskId; // Возвращаем taskId
  } catch (error) {
    setLoading(false);
    throw new Error("Не удалось получить номер задачи");
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

      setTimeout(
        () =>
          checkTask(
            action,
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
            action,
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
      setLoading(false);
      throw new Error("Не удалось данные по номеру задачи");
    }
  }
}
