import { getTaskId, checkTask } from "./task";
import { setProgress } from "../store/actions/progressActions";

// Главная функция для получения статуса
export async function setPppoe(
  serial,
  login,
  password,
  setLoading,
  setResult,
  dispatch,
  navigate,
) {
  setLoading(true);
  setResult(null);
  dispatch(setProgress(0)); // Устанавливаем начальный прогресс
  let body = {
    regionId: 1,
    serialNewNtu: serial,
    userLogin: login,
    userPassword: password,
  };

  try {
    // Получаем taskId
    const taskId = await getTaskId(
      "setNTU/setNtuNewPppoe",
      body,
      dispatch,
      setLoading,
      navigate,
    );
    if (taskId) {
      // Если taskId получен, начинаем отслеживание статуса
      await checkTask(
        "setNTU/taskStatus",
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        0,
        80,
      );
    }
  } catch (error) {
    setLoading(false);
    throw new Error (error);;
  }
}
