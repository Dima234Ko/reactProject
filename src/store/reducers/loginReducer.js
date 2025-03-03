import { SET_LOGIN } from "../actions/loginActions";

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
    default:
      return state;
  }
};

export default loginReducer;
