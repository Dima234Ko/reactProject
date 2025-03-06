export const SET_LOGIN = "SET_LOGIN";
export const CLEAR_LOGIN = "CLEAR_LOGIN";

export const setLogin = (login) => ({
  type: SET_LOGIN,
  payload: login,
});

export const clearLogin = () => ({
  type: CLEAR_LOGIN,
});
