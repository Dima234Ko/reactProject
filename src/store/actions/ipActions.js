export const SET_IP = 'SET_IP';
export const CLEAR_IP = 'CLEAR_IP';

export const setIp = (ip) => ({
  type: SET_IP,
  payload: ip,
});

export const clearIp = () => ({
  type: CLEAR_IP,
});
