import { SET_PAGE } from "../actions/pageLogActions";
import { SET_ACTIVE_PAGE } from "../actions/pageLogActions";

const initialState = {
  page: null,
  activePage: 1
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    default:
      return state;
  }
};

export default pageReducer;
