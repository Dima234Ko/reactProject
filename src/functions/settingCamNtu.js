import { getTaskId, checkTask } from './task';
import { setCancelTokenSetTask } from '../store/actions/progressActions';

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
  const {
    serial,
    regionId,
    serviceType,
    dispatch,
    setLoading,
    navigate,
    setResult,
    showVlanForm,
    portNumber,
    cancelTokenFromRedux
  } = data;
  try {
    const vlan = await getVlan(regionId, serviceType, showVlanForm);
    const ports = getPorts(portNumber);

    if (!vlan) {
      setLoading(false);
      throw new Error('VLAN не получен');
    }

    setLoading(true);
    dispatch(setCancelTokenSetTask(false));

    const body = {
      ponSerialNtu: serial,
      ports: ports,
      vlan: vlan,
      regionId: regionId,
    };

    let taskId;

    switch (serviceType) {
      case 'fl':
        taskId = await getTaskId({
          action: `newConnection/createPppoeAndCamera`,
          body,
          dispatch,
          setLoading,
          navigate,
          serial,
          cancelTokenFromRedux
        });
        break;
      case 'bd':
        taskId = await getTaskId({
          action: `newConnection/createCameraToSafetyCity`,
          body,
          dispatch,
          setLoading,
          navigate,
          serial,
        });
        break;
      default:
        throw new Error('Неверный тип сервиса');
    }

    if (!taskId) {
      throw new Error('taskId не был получен');
    }

    await checkTask({
      action: `task/taskStatus`,
      taskId,
      dispatch,
      setLoading,
      setResult,
      navigate,
      progress: 80,
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    navigate(`/region`);
  } catch (error) {
    setLoading(false);
    throw new Error(`Ошибка: ${error.message || error}`);
  }
}

/**
 * Определяет VLAN на основе типа сервиса и региона.
 * @param {string} serviceType - Тип сервиса ('fl' или 'bd')
 * @param {string} regionId - Идентификатор региона ('1', '2', '3', '4')
 * @param {Function} showVlanForm - Асинхронная функция для отображения формы ввода VLAN
 */

async function getVlan(regionId, serviceType, showVlanForm) {
  switch (serviceType) {
    case 'fl':
      if (regionId === '1' || regionId === '3') {
        return 132;
      } else if (regionId === '2') {
        return 1725;
      } else if (regionId === '4') {
        return 106;
      }
      return null;

    case 'bd':
      if (regionId === '1' || regionId === '2' || regionId === '3') {
        const vlan = await showVlanForm();
        return vlan;
      } else if (regionId === '4') {
        return 100;
      }
      return null;

    default:
      return null;
  }
}

function getPorts(portNumber) {
  const portMap = {
    one: '4',
    two: '3, 4',
    three: '2, 3, 4',
    four: '1, 2, 3, 4',
  };

  return portMap[portNumber] || '';
}
