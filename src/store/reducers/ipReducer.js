import { SET_IP } from '../actions/ipActions';
import { CLEAR_IP } from '../actions/ipActions';

const initialState = {
  ip: null,
};

const ipReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IP:
      return {
        ...state,
        ip: action.payload,
      };
    case CLEAR_IP:
      return {
        ...state,
        ip: null,
      };
    default:
      return state;
  }
};

export default ipReducer;
