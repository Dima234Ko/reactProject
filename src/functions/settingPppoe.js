import { getTaskId, checkTask } from './task';
import { setProgress } from '../store/actions/progressActions';
import { requestAPI } from './api';
import { updateUrlWithParam } from './url';

/**
 * Получает информацию о пользователе из UserSide (US) по логину или серийному номеру через API.
 * @param {Object} data - Данные для запроса
 * @param {string} data.userLoginSerial - Логин пользователя или серийный номер NTU
 * @param {string} data.serialFromRedux - Серийный номер NTU из состояния (Redux)
 * @param {Function} data.setResult - Функция для установки результата операции
 * @param {string} data.param - Тип параметра для поиска ('login' или 'serial')
 * @param {string} data.page - Страница, для которой выполняется запрос ('pppoe' или 'wifi')
 * @returns {Promise<Object>} Данные от API (например, { idUserSideCard, idBySerial, idByLogin })
 * @throws {Error} Если запрос к API завершился ошибкой
 */

export async function searchIdUs(data) {
  const { userLoginSerial, serialFromRedux, setResult, param, page } = data;
  setResult(null);
  let body;
  let info;

  try {
    if (param === 'login') {
      body = {
        userLogin: userLoginSerial,
        serialNewNtu: serialFromRedux,
      };
      info = await requestAPI('POST', 'userSide/getUserId', body);

      if (page !== 'wifi') {
        if (info.idUserSideCard !== null) {
          setResult({
            result: 'Найдена учетная запись в US',
            success: false,
          });
        } else {
          setResult({
            result: 'Учетная запись в US отсутствует',
            success: true,
          });
        }
      }
    } else {
      body = {
        serialNewNtu: userLoginSerial,
      };
      info = await requestAPI('POST', 'userSide/getUserId', body);
    }

    return info;
  } catch (error) {
    throw error;
  }
}

/**
 * Настраивает PPPoE для NTU через API, отправляя запрос и отслеживая статус задачи.
 * @param {Object} data - Данные для настройки PPPoE
 * @param {string} data.serial - Серийный номер NTU
 * @param {string} data.login - Логин пользователя
 * @param {string} data.password - Пароль пользователя
 * @param {string} data.work - Тип работы (из Redux)
 * @param {string} data.regionId - Идентификатор региона
 * @param {Function} data.dispatch - Функция диспетчера (например, Redux)
 * @param {Function} data.setLoading - Устанавливает состояние загрузки
 * @param {Function} data.setResult - Устанавливает результат операции
 * @param {Function} data.navigate - Функция навигации (например, react-router)
 * @throws {Error} Если не удалось получить taskId или выполнить задачу
 */

export async function setPppoe(data) {
  const {
    serial,
    login,
    password,
    regionId,
    dispatch,
    setLoading,
    setResult,
    navigate,
  } = data;

  setResult(null);
  dispatch(setProgress(0));

  let body = {
    regionId: regionId,
    serialNewNtu: serial,
    userLogin: login,
    userPassword: password,
  };

  let taskId;
  updateUrlWithParam('login', login, navigate);

  try {
    taskId = await getTaskId(
      `newConnection/setNtuNewPppoe`,
      body,
      dispatch,
      setLoading,
      navigate,
      serial
    );
  } catch (error) {
    throw error;
  }

  try {
    if (taskId) {
      await checkTask(
        `task/taskStatus`,
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        0,
        80
      );
    } else {
      throw new Error('taskId не был получен');
    }
  } catch (error) {
    throw new Error(`Не удалось получить taskId: ${error.message || error}`);
  }
}
