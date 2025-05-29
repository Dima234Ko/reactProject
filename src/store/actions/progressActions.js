export const SET_PROGRESS = 'SET_PROGRESS';
export const SET_CANSEL_TOKEN_GET_TASK = 'SET_CANSEL_TOKEN_GET_TASK';
export const SET_CANSEL_TOKEN_SET_TASK = 'SET_CANSEL_TOKEN_SET_TASK';

export const setProgress = (progress) => ({
  type: SET_PROGRESS,
  payload: progress,
});

export const setCancelTokenGetTask = (token) => ({
  type: SET_CANSEL_TOKEN_GET_TASK,
  payload: token,
});

export const setCancelTokenSetTask = (token) => ({
  type: SET_CANSEL_TOKEN_SET_TASK,
  payload: token,
});