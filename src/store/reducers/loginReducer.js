import { SET_LOGIN } from "../actions/loginActions";
import { CLEAR_LOGIN } from "../actions/loginActions";

const initialState = {
  login: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case CLEAR_LOGIN:
      return {
        ...state,
        login: null,
      };
    default:
      return state;
  }
};

export default loginReducer;