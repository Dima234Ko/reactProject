import {
  SET_TASK,
  SET_SUBTASK,
  SET_ACTION,
  SET_WORK,
  SET_REG_TASK,
  SET_TRANSITION,
} from "../actions/taskActions"; // Добавили SET_SUBTASK

const initialState = {
  task: null,
  subtask: null,
  action: null,
  work: null,
  reg: null,
  transition: false,
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
      if (action.payload === "reset") {
        return {
          ...state,
          action: "status",
        };
      }
      if (action.payload === "photo") {
        return {
          ...state,
          action: "wifi",
        };
      }
      return {
        ...state,
        action: action.payload,
      };
    case SET_WORK:
      return {
        ...state,
        work: action.payload,
      };
    case SET_REG_TASK:
      return {
        ...state,
        reg: action.payload,
      };
    case SET_TRANSITION:
      return {
        ...state,
        transition: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
