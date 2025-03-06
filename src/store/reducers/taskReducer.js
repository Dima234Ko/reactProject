import { SET_TASK } from "../actions/taskActions";

const initialState = {
  id: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK:
      return {
        ...state,
        task: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
