import { SET_WARNING } from '../actions/warningActions';

const initialState = {
  warning: false,
};

const warningReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WARNING:
      return {
        ...state,
        warning: action.payload,
      };
    default:
      return state;
  }
};

export default warningReducer;
