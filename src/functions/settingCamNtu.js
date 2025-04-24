import { getTaskId, checkTask } from './task';

export async function settingCCTVforNtu(data) {
  try {
    const vlan = await getVlan(data);
    console.log(vlan);
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
    await new Promise(resolve => setTimeout(resolve, 3000));
    data.navigate(`/region`);
  } catch (error) {
    data.setLoading(false);
    throw new Error(`Ошибка: ${error.message || error}`);
  }
}

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
      if (data.regionId === '1' || data.regionId === '2' || data.regionId === '3') {
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
    one: "4",
    two: "3, 4",
    three: "2, 3, 4",
    four: "1, 2, 3, 4",
  };

  return portMap[data.portNumber] || "";
}