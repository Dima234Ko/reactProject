import { requestAPI } from './api';

export const settingCCTVforNtu = (data) => {
  const vlan = getVlan(data);
  const ports = getPorts(data);

  let body = {
    ponSerialNtu: data.serial,
    ports: ports,
    vlan: vlan,
    regionId: data.regionId,
  };
  
  switch (data.serviceType) {
    case 'fl':
      requestAPI('POST', 'newConnection/createPppoeAndCamera', body);
    case 'bd':
      requestAPI('POST', 'newConnection/createCameraToSafetyCity', body);    
    default:
        console.log ('Не верно заполнены значения')
  }
}

function getVlan (data) {
  switch (data.serviceType) {
    case 'fl':
      if (data.regionId === '1' || regionId === '3') {
        return 132;
      } else if (data.regionId === '2') {
        return 1725;
      } else if (data.regionId === '4') {
        return 106;
      }
      break;

    case 'bd':
      if (data.regionId === '1' || data.regionId === '2' || data.regionId === '3') {
        return prompt('Укажите VLAN');
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

  const ports = portMap[data.portNumber] || ""
}
