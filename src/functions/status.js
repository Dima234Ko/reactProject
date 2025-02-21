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
  setResult(false);
  dispatch(setProgress(0));

  if (serial.length < 5) {
    setLoading(false);
    throw new Error("Введен некорректный pon serial");
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
    setLoading(false);
    throw error;
  }
}
