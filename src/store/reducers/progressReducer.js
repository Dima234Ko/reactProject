import { SET_PROGRESS } from '../actions/progressActions';
import { SET_CANSEL_TOKEN_GET_TASK } from '../actions/progressActions';
import { SET_CANSEL_TOKEN_SET_TASK } from '../actions/progressActions';

const initialState = {
  progress: 0,
  cancelTokenGetTask: null,
  cancelTokenSetTask: null
};

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case SET_CANSEL_TOKEN_GET_TASK:
        return {
          ...state,
          cancelTokenGetTask: action.payload,
        };
    case SET_CANSEL_TOKEN_SET_TASK:
        return {
          ...state,
          cancelTokenSetTask: action.payload,
        };
    default:
      return state;
  }
};

export default progressReducer;
