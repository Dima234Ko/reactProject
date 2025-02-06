import { SET_SERIAL } from "../actions/serialActions";

const initialState = {
  serial: "",  
};

const serialReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERIAL:
      return {
        ...state,
        serial: action.payload,
      };
    default:
      return state;
  }
};

export default serialReducer;
