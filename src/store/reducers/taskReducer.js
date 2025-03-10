import { SET_TASK, SET_SUBTASK, SET_ACTION, SET_WORK, SET_REGION } from "../actions/taskActions"; // Добавили SET_SUBTASK

const initialState = {
  task: null,
  subtask: null,
  action: null,
  work: null,
  reg: null 
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case SET_SUBTASK:
      return {
        ...state,
        subtask: action.payload,
      };
    case SET_ACTION:
      return {
        ...state,
        action: action.payload,
      };
    case SET_WORK:
      return {
        ...state,
        work: action.payload,
      };
    case SET_REGION:
      return {
        ...state,
        reg: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;