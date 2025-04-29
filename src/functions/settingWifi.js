import { getTaskId, checkTask } from './task';
import { setProgress } from '../store/actions/progressActions';

/**
 * Настраивает WiFi на NTU через API, отправляя запрос и отслеживая статус задачи.
 * @param {Object} data - Данные для настройки WiFi
 * @param {string} data.serial - Серийный номер NTU
 * @param {string} data.ssid2_4 - Имя сети 2Ггц
 * @param {string} data.password2_4 - Пароль сети 2Ггц
 * @param {string} data.selectSSID2_4 - Канал сети 2Ггц
 * @param {string} data.ssid5 - Имя сети 5Ггц
 * @param {Function} data.password5 - Пароль 5Ггц
 * @param {Function} data.selectSSID5 - Канал сети 5Ггц
 * @param {Function} data.setLoading - Устанавливает состояние загрузки
 * @param {Function} data.setResult - Устанавливает результат операции
 * @param {Function} data.navigate - Функция навигации (react-router)
 * @param {string} data.regionId - Идентификатор региона
 * @param {Function} data.dispatch - Функция диспетчера (Redux)
 * @throws {Error} Если не удалось получить taskId или выполнить задачу
 */

export async function setWiFi(data) {
  const {
    serial,
    ssid2_4,
    password2_4,
    selectSSID2_4,
    ssid5,
    password5,
    selectSSID5,
    setLoading,
    setResult,
    dispatch,
    navigate,
    regionId,
  } = data;

  {
    setLoading(true);
    setResult(null);
    dispatch(setProgress(0));
    let body = {
      regionId: regionId,
      serialNewNtu: serial,
      ssidWifi2: ssid2_4,
      passWifi2: password2_4,
      channelWifi2: selectSSID2_4,
      ssidWifi5: ssid5,
      passWifi5: password5,
      channelWifi5: selectSSID5,
    };

    try {
      const taskId = await getTaskId(
        `newConnection/setNtuWifi`,
        body,
        dispatch,
        setLoading,
        navigate,
        serial
      );
      if (taskId) {
        await checkTask(
          'task/taskStatus',
          taskId,
          dispatch,
          setLoading,
          setResult,
          navigate,
          0,
          80
        );
      }
    } catch (error) {
      throw new Error(`Не удалось получить taskId: ${error.message || error}`);
    }
  }
}
