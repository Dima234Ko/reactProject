import { getTaskId, checkTask } from "./task";
import { setProgress } from "../store/actions/progressActions";

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

  if (!serial) {
    alert("Введите pon-serial");
    setLoading(false);
    return null; // Если серийный номер не введен, возвращаем null
  }
  
  let body = {
    regionId: 1,
    serialNewNtu: serial,
  };

  try {
    // Получаем taskId
    const taskId = await getTaskId(
      'setNTU/statusNTU', 
      body, 
      dispatch, 
      setLoading, 
      navigate
    );

    if (taskId) {
      // Если taskId получен, начинаем отслеживание статуса
      await checkTask(
        'setNTU/taskStatus',
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