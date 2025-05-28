import { SET_PROGRESS } from '../actions/progressActions';
import { SET_CANSEL_TOKEN } from '../actions/progressActions';

const initialState = {
  progress: 0,
  cancelToken: null,
};

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case SET_CANSEL_TOKEN:
        return {
          ...state,
          cancelToken: action.payload,
        };
    default:
      return state;
  }
};

export default progressReducer;
