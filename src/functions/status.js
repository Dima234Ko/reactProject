import { getTaskId, checkTask } from './task';
import { setProgress } from '../store/actions/progressActions';
import { setCancelTokenSetTask } from '../store/actions/progressActions';

/**
 * Функция получения статуса
 * @param {Object} data - Данные для запроса статуса
 * @param {string} data.serial - Серийный номер NTU
 * @param {string} data.isChecked - Чекбокс сброса устройства
 * @param {string} data.regionId - Идентификатор региона
 * @param {Function} data.dispatch - Функция диспетчера (из Redux)
 * @param {Function} data.setLoading - Устанавливает состояние загрузки
 * @param {Function} data.setResult - Устанавливает результат операции
 * @param {Function} data.navigate - Функция навигации (react-router)
 * @throws {Error} Если не удалось получить taskId или выполнить задачу
 */

export async function getStatus(data) {
  const {
    serial,
    isChecked,
    setLoading,
    setResult,
    dispatch,
    navigate,
    cancelTokenFromRedux,
    regionId
  } = data;

  setLoading(true);
  setResult(false);
  dispatch(setCancelTokenSetTask(false));
  dispatch(setProgress(0));

  if (serial == null || serial.length < 5) {
    setLoading(false);
    throw new Error('Введен некорректный pon serial');
  }

  let body = {
    regionId: regionId,
    serialNewNtu: serial,
  };

  try {
    let action = `newConnection/statusNTUTest`;
    if (isChecked) {
      action = `newConnection/resetNTU`;
    }

    // Получаем taskId
    const taskId = await getTaskId({
      action,
      body,
      dispatch,
      setLoading,
      navigate,
      serial,
      cancelTokenFromRedux
    });

    if (taskId) {
      // Если taskId получен, начинаем отслеживание статуса
      await checkTask({
        action: `task/taskStatus`,
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        progress: 50
      });
    }
  } catch (error) {
    throw new Error(`Не удалось получить taskId: ${error.message || error}`);
  }
}
