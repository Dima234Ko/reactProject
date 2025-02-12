import { getTaskId, checkTask } from "./task";
import { setProgress } from "../store/actions/progressActions";

// Главная функция для получения статуса
export async function getStatus(
  serial,
  isChecked,
  setLoading,
  setResult,
  dispatch,
  navigate,
) {
  setLoading(true);
  setResult(null);
  dispatch(setProgress(0));

  if (!serial) {
    alert("Введите pon-serial");
    setLoading(false);
    return null;
  }

  let body = {
    regionId: 1,
    serialNewNtu: serial,
  };

  try {
    let action = "setNTU/statusNTU";
    if (isChecked) {
      action = "setNTU/resetNTU";
    }

    // Получаем taskId
    const taskId = await getTaskId(
      action,
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
        30,
      );
    }
  } catch (error) {
    console.error("Ошибка при получении статуса:", error);
    setLoading(false);
  }
}
