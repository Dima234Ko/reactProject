export const SET_TASK = 'SET_TASK';
export const SET_SUBTASK = 'SET_SUBTASK';
export const SET_ACTION = 'SET_ACTION';
export const SET_WORK = 'SET_WORK';
export const SET_REG_TASK = 'SET_REG_TASK';
export const SET_TRANSITION = 'SET_TRANSITION';

export const setTask = (task) => ({
  type: SET_TASK,
  payload: task,
});

export const setSubtask = (subtask) => ({
  type: SET_SUBTASK,
  payload: subtask,
});

export const setAction = (action) => ({
  type: SET_ACTION,
  payload: action,
});

export const setWork = (work) => ({
  type: SET_WORK,
  payload: work,
});

export const setRegTask = (reg) => ({
  type: SET_REG_TASK,
  payload: reg,
});

export const setTransition = (transition) => ({
  type: SET_TRANSITION,
  payload: transition,
});
