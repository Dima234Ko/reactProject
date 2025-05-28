export const SET_PROGRESS = 'SET_PROGRESS';
export const SET_CANSEL_TOKEN = 'SET_CANSEL_TOKEN';

export const setProgress = (progress) => ({
  type: SET_PROGRESS,
  payload: progress,
});

export const setCancelToken = (token) => ({
  type: SET_CANSEL_TOKEN,
  payload: token,
});