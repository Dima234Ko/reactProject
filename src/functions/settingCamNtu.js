import { getTaskId, checkTask } from './task';

export async function  settingCCTVforNtu(data) {
  const vlan = getVlan(data);
  const ports = getPorts(data);

  let body = {
    ponSerialNtu: data.serial,
    ports: ports,
    vlan: vlan,
    regionId: data.regionId,
  };

  let taskId;
  
  switch (data.serviceType) {
    case 'fl':
        try {
          taskId = await getTaskId(
            `newConnection/createPppoeAndCamera`,
            body,
            data.dispatch,
            data.setLoading,
            data.navigate,
            data.serial
          );
        } catch (error) {
          throw error;
        }
    case 'bd':
      try {
        taskId = await getTaskId(
          `newConnection/createCameraToSafetyCity`,
          body,
          data.dispatch,
          data.setLoading,
          data.navigate,
          data.serial
        );
      } catch (error) {
        throw error;
      }  
    default:
        console.log ('Не верно заполнены значения')
  }

  try {
    if (taskId) {
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
      await new Promise(resolve => setTimeout(resolve, 3000));
      data.navigate(`/region`);
    } else {
      throw new Error('taskId не был получен');
    }
  } catch (error) {
    throw new Error(`Не удалось получить taskId: ${error.message || error}`);
  }
}

function getVlan(data) {
  function isValidVlan(vlan) {
    return /^\d{2,4}$/.test(vlan);
  }

  function promptValidVlan() {
    let vlan = prompt('Укажите VLAN');
    while (vlan !== null && !isValidVlan(vlan)) {
      vlan = prompt('Ошибка: VLAN должен быть числом от 2 до 4 цифр. Укажите VLAN');
    }
    return vlan ? parseInt(vlan, 10) : null;
  }

  switch (data.serviceType) {
    case 'fl':
      if (data.regionId === '1' || data.regionId === '3') {
        return 132;
      } else if (data.regionId === '2') {
        return 1725;
      } else if (data.regionId === '4') {
        return 106;
      }
      break;

    case 'bd':
      if (data.regionId === '1' || data.regionId === '2' || data.regionId === '3') {
        return promptValidVlan();
      } else if (data.regionId === '4') {
        return 100;
      }
      break;

    default:
      return null;
  }
}

function getPorts (data) {
  const portMap = {
    one: "4",
    two: "3, 4",
    three: "2, 3, 4",
    four: "1, 2, 3, 4",
  };

  const ports = portMap[data.portNumber] || "";
  return ports;
}
