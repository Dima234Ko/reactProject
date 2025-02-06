export const SET_PROGRESS = "SET_PROGRESS";
export const GET_SERIAL = "GET_PROGRESS";

// Экшен для обновления прогресса
export const setProgress = (progress) => ({
  type: SET_PROGRESS,
  payload: progress,
});

export const getProgress = () => ({
  type: GET_PROGRESS,
});
