import { requestAPI } from './api';
import { setProgress } from '../store/actions/progressActions';
import { updateUrlWithParam } from './url';

/**
 * Функция получения taskId, создавая задачу на сервере, обновляет прогресс и URL.
 * @param {Object} data - Данные для запроса статуса
 * @param {string} data.action - Заголовок запроса
 * @param {Object} data.body - Тело запроса.
 * @param {Function} data.dispatch - Функция диспетчера (из Redux)
 * @param {Function} data.setLoading - Устанавливает состояние загрузки
 * @param {Function} data.navigate - Функция навигации (react-router)
 * @param {string} data.serial - Pon-serial, который будет добавлен в URL.
 * @throws {Error} Если не удалось получить taskId или выполнить задачу
 */

export async function getTaskId(data) {
  const { action, body, dispatch, setLoading, navigate, serial } = data;

  try {
    const data = await requestAPI('POST', action, body);
    const taskId = data.taskId;

    dispatch(setProgress(30));
    updateUrlWithParam('serial', serial, navigate);
    updateUrlWithParam('task', taskId, navigate);
    return taskId;
  } catch (error) {
    setLoading(false);
    throw error;
  }
}

/**
 * Проверяет статус задачи, если taskId есть в URL и результат ещё не получен
 * @param {Object} data - Данные для запроса статуса
 * @param {Object} data.location - Объект с текущим URL (иreact-router)
 * @param {boolean} data.loading - Состояние загрузки
 * @param {any} data.result - Текущий результат задачи
 * @param {Function} data.setLoading - Устанавливает состояние загрузки
 * @param {Function} data.setResult - Устанавливает результат операции
 * @param {Function} data.navigate - Функция навигации (react-router)
 * @param {Function} data.dispatch - Функция диспетчера (Redux)
 * @throws {Error} Если не удалось получить taskId или выполнить задачу
 */

export async function checkTaskStatus(data) {
  const {
    location,
    loading,
    result,
    dispatch,
    setLoading,
    setResult,
    navigate,
  } = data;

  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('task');

  if (taskId && !loading) {
    if (!result) {
      setLoading(true);
      setResult(null);
      try {
        await checkTask({
          action: `task/taskStatus`,
          taskId,
          dispatch,
          setLoading,
          setResult,
          navigate,
          progress: 50,
        });
      } catch (error) {
        setLoading(false);
        throw error;
      }
    }
  }
}

/**
 * Рекурсивно проверяет статус задачи до её завершения, обновляя прогресс.
 *
 * @async
 * @function
 * @param {Object} data - Данные для проверки задачи.
 * @param {string} data.action - Заголовок запроса
 * @param {string} data.taskId - Идентификатор задачи
 * @param {Function} data.setLoading - Устанавливает состояние загрузки
 * @param {Function} data.setResult - Устанавливает результат операции
 * @param {Function} data.navigate - Функция навигации (react-router)
 * @param {Function} data.dispatch - Функция диспетчера (Redux)
 * @param {number} [data.attempts] - Количество попыток запроса (по умолчанию 0).
 * @param {number} [data.progress] - Текущий прогресс выполнения (по умолчанию 30).
 * @throws {Error} При ошибке запроса к API.
 */

export async function checkTask(data) {
  const {
    action,
    taskId,
    dispatch,
    setLoading,
    setResult,
    navigate,
    attempts,
    progress,
  } = data;

  const currentAttempts = attempts ?? 0;
  let currentProgress = progress ?? 30;
  const statusAction = `${action}/${taskId}`;

  try {
    const taskData = await requestAPI('GET', statusAction);

    if (taskData.status !== 'completed') {
      if (currentProgress < 90) {
        currentProgress = Math.min(currentProgress + 5, 90);
        dispatch(setProgress(currentProgress));
      }

      await new Promise((resolve) => setTimeout(resolve, 10000));

      await checkTask({
        action,
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        attempts: currentAttempts + 1,
        progress: currentProgress,
      });
    } else {
      dispatch(setProgress(100));
      setLoading(false);
      setResult(taskData.result.respResult);

      if (taskData.result.rxPower) {
        localStorage.setItem(
          'RX_power',
          JSON.stringify(taskData.result.rxPower)
        );
      }
    }
  } catch (error) {
    setLoading(false);
    throw error;
  }
}
