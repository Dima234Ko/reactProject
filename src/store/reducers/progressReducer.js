import { SET_PROGRESS } from '../actions/progressActions';

const initialState = {
  progress: 0, // начальное значение прогресса
};

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};

export default progressReducer;
