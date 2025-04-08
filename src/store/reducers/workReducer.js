import { SET_WORK } from '../actions/workActions';

const initialState = {
  work: 0,
};

const workReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORK:
      return {
        ...state,
        work: action.payload,
      };
    default:
      return state;
  }
};

export default workReducer;
