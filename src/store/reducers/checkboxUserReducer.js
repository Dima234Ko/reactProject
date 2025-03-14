import { SET_CHECKED_VALUE } from "../actions/checkboxUserActions";

const initialState = {
  checkedValue: null,
};

const checkboxUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECKED_VALUE:
      return {
        ...state,
        checkedValue: action.payload,
      };
    default:
      return state;
  }
};

export default checkboxUserReducer;
