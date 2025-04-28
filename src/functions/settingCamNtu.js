import { getTaskId, checkTask } from './task';

/**
 * Настраивает CCTV (видеонаблюдение) для NTU через API, определяя VLAN и порты, отправляя запрос и отслеживая статус задачи.
 * @param {Object} data - Данные для настройки CCTV
 * @param {string} data.serial - Серийный номер оборудования NTU
 * @param {string} data.serviceType - Тип сервиса ('fl' для физических лиц, 'bd' для безопасности города)
 * @param {string} data.regionId - Идентификатор региона ('1', '2', '3', '4')
 * @param {string} data.portNumber - Количество портов ('one', 'two', 'three', 'four')
 * @param {Function} data.showVlanForm - Асинхронная функция для отображения формы ввода VLAN (для serviceType='bd' и определенных регионов)
 * @param {Function} data.dispatch - Функция диспетчера для управления состоянием (например, Redux)
 * @param {Function} data.setLoading - Устанавливает состояние загрузки (true/false)
 * @param {Function} data.setResult - Устанавливает результат операции (например, успех или ошибка)
 * @param {Function} data.navigate - Функция навигации для перенаправления (например, react-router)
 * @returns {Promise<void>} Промис, который разрешается при успешном выполнении или выбрасывает ошибку
 * @throws {Error} Если VLAN не получен, taskId не получен, неверный тип сервиса или произошла другая ошибка
 */

export async function settingCCTVforNtu(data) {
  try {
    const vlan = await getVlan(data);
    const ports = getPorts(data);

    if (!vlan) {
      data.setLoading(false);
      throw new Error('VLAN не получен');
    }

    data.setLoading(true);
    const body = {
      ponSerialNtu: data.serial,
      ports: ports,
      vlan: vlan,
      regionId: data.regionId,
    };

    let taskId;

    switch (data.serviceType) {
      case 'fl':
        taskId = await getTaskId(
          `newConnection/createPppoeAndCamera`,
          body,
          data.dispatch,
          data.setLoading,
          data.navigate,
          data.serial
        );
        break;
      case 'bd':
        taskId = await getTaskId(
          `newConnection/createCameraToSafetyCity`,
          body,
          data.dispatch,
          data.setLoading,
          data.navigate,
          data.serial
        );
        break;
      default:
        throw new Error('Неверный тип сервиса');
    }

    if (!taskId) {
      throw new Error('taskId не был получен');
    }

    await checkTask(
      `task/taskStatus`,
      taskId,
      data.dispatch,
      data.setLoading,
      data.setResult,
      data.navigate,
      0,
      80
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
    data.navigate(`/region`);
  } catch (error) {
    data.setLoading(false);
    throw new Error(`Ошибка: ${error.message || error}`);
  }
}

/**
 * Определяет VLAN на основе типа сервиса и региона.
 * @param {Object} data - Данные для определения VLAN
 * @param {string} data.serviceType - Тип сервиса ('fl' или 'bd')
 * @param {string} data.regionId - Идентификатор региона ('1', '2', '3', '4')
 * @param {Function} data.showVlanForm - Асинхронная функция для отображения формы ввода VLAN
 * @returns {Promise<number|null>} VLAN (число) или null, если VLAN не определен
 */

async function getVlan(data) {
  switch (data.serviceType) {
    case 'fl':
      if (data.regionId === '1' || data.regionId === '3') {
        return 132;
      } else if (data.regionId === '2') {
        return 1725;
      } else if (data.regionId === '4') {
        return 106;
      }
      return null;

    case 'bd':
      if (
        data.regionId === '1' ||
        data.regionId === '2' ||
        data.regionId === '3'
      ) {
        const vlan = await data.showVlanForm();
        return vlan;
      } else if (data.regionId === '4') {
        return 100;
      }
      return null;

    default:
      return null;
  }
}

function getPorts(data) {
  const portMap = {
    one: '4',
    two: '3, 4',
    three: '2, 3, 4',
    four: '1, 2, 3, 4',
  };

  return portMap[data.portNumber] || '';
}
