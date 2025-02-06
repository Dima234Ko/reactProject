export const SET_SERIAL = "SET_SERIAL";
export const GET_SERIAL = "GET_SERIAL";

export const setSerial = (serial) => ({
  type: SET_SERIAL,
  payload: serial,
});

export const getSerial = () => ({
  type: GET_SERIAL,
});
