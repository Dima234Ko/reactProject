import { requestAPI } from "./api";
import { setProgress } from "../store/actions/progressActions";
import { updateUrlWithParam } from "./url";

// Главная функция для получения статуса
export async function setPppoe(
  serial,
  login,
  password,
  setLoading,
  setResult,
  dispatch,
  navigate,
  progressFromRedux, // Добавляем прогресс
) {
  setLoading(true);
  setResult(null);
  dispatch(setProgress(0)); // Устанавливаем начальный прогресс

  try {
    // Получаем taskId
    const taskId = await getTaskId(
      serial,
      login,
      password,
      dispatch,
      setLoading,
      navigate,
    );
    alert(taskId); // Выводим taskId, если нужно
  } catch (error) {
    console.error("Ошибка при получении статуса:", error);
    setLoading(false);
  }
}

// Функция для получения taskId
export async function getTaskId(
  serial,
  login,
  password,
  dispatch,
  setLoading,
  navigate,
) {
  if (!serial) {
    alert("Введите pon-serial");
    setLoading(false);
    return null; // Если серийный номер не введен, возвращаем null
  }

  let action = "setNTU/setNtyNewPppoe";
  let logPass = {
    regionId: 1,
    serialNewNtu: serial,
    userLogin: login,
    userPassword: password,
  };

  try {
    dispatch(setProgress(30)); // Обновляем прогресс
    // Запрашиваем номер задачи
    const data = await requestAPI("POST", action, logPass);
    const taskId = data.taskId;

    dispatch(setProgress(30)); // Обновляем прогресс

    // Добавляем taskId в URL
    updateUrlWithParam("task", taskId, navigate);

    return taskId; // Возвращаем taskId
  } catch (error) {
    alert("Ошибка при запросе taskId:", error);
    setLoading(false);
    return null;
  }
}
