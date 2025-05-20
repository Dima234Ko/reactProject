import { getTaskId, checkTask } from './task';
import { updateUrlWithParam } from './url';

export async function setStatic(data) {
    const {
        ip,
        mask,
        gateway,
        serial,
        vlan,
        regionId,
        dispatch, 
        setResult,
        setProgress,
        navigate,
        setLoading 
      } = data;
    
    setResult(null);
    dispatch(setProgress(0));

    let body = {
        regionId: regionId,
        ponSerialNtu: serial,
        vlan: vlan,
        ipAddress: ip,
        subnetMask: mask,
        defaultGateway: gateway
    };

    let taskId;
    updateUrlWithParam('ip', ip, navigate);

    try {
        taskId = await getTaskId({
          action: `newConnection/createNtuStaticIp`,
          body,
          dispatch,
          setLoading,
          navigate,
          serial,
        });
      } catch (error) {
        throw error;
    }

    try {
      if (taskId) {
        await checkTask({
          action: `task/taskStatus`,
          taskId,
          dispatch,
          setLoading,
          setResult,
          navigate,
          attempts: 0,
          progress: 80,
        });
      } else {
        throw new Error('taskId не был получен');
      }
    } catch (error) {
      throw new Error(`Не удалось получить taskId: ${error.message || error}`);
    }
    
}

export async function checkIP(ip) {
        if (!ip || typeof ip !== 'string') return false;
        const octets = ip.split('.');
        if (octets.length !== 4) return false;
        for (let octet of octets) {
            if (!/^\d+$/.test(octet)) return false;
            const num = parseInt(octet);
            if (num < 0 || num > 255 || octet.length > 1 && octet[0] === '0') {
                return false;
            }
        } 
        return true;
}

export async function checkMask(mask) {
        const validMasks = [
            '0.0.0.0',          // /0
            '128.0.0.0',        // /1
            '192.0.0.0',        // /2
            '224.0.0.0',        // /3
            '240.0.0.0',        // /4
            '248.0.0.0',        // /5
            '252.0.0.0',        // /6
            '254.0.0.0',        // /7
            '255.0.0.0',        // /8
            '255.128.0.0',      // /9
            '255.192.0.0',      // /10
            '255.224.0.0',      // /11
            '255.240.0.0',      // /12
            '255.248.0.0',      // /13
            '255.252.0.0',      // /14
            '255.254.0.0',      // /15
            '255.255.0.0',      // /16
            '255.255.128.0',    // /17
            '255.255.192.0',    // /18
            '255.255.224.0',    // /19
            '255.255.240.0',    // /20
            '255.255.248.0',    // /21
            '255.255.252.0',    // /22
            '255.255.254.0',    // /23
            '255.255.255.0',    // /24
            '255.255.255.128',  // /25
            '255.255.255.192',  // /26
            '255.255.255.224',  // /27
            '255.255.255.240',  // /28
            '255.255.255.248',  // /29
            '255.255.255.252',  // /30
            '255.255.255.254',  // /31
            '255.255.255.255'   // /32
        ];
    
        if (!mask || typeof mask !== 'string') return false;
        return validMasks.includes(mask);
}
    


export async function checkGateway(ip, mask, gateway) {
    const ipOctets = ip.split('.').map(Number);
    const maskOctets = mask.split('.').map(Number);
    const gatewayOctets = gateway.split('.').map(Number);
    // Вычисление адреса сети для IP
    const network = ipOctets.map((octet, i) => octet & maskOctets[i]);
    // Вычисление широковещательного адреса
    const broadcast = ipOctets.map((octet, i) => (octet & maskOctets[i]) | (~maskOctets[i] & 255));
    // Проверка, что шлюз находится в той же подсети
    const isInSubnet = gatewayOctets.every((octet, i) => (octet & maskOctets[i]) === network[i]);
    // Проверка, что шлюз не является адресом сети или широковещательным адресом
    const isNetworkAddress = gatewayOctets.every((octet, i) => octet === network[i]);
    const isBroadcastAddress = gatewayOctets.every((octet, i) => octet === broadcast[i]);
    return isInSubnet && !isNetworkAddress && !isBroadcastAddress;   
}

export async function checkVlan(vlan) {
    if (!vlan || typeof vlan !== 'string') return false;
    return /^\d{1,4}$/.test(vlan);
}