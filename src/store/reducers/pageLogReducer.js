import { SET_PAGE } from "../actions/pageLogActions";
import { SET_ACTIVE_PAGE } from "../actions/pageLogActions";
import { SET_USER_PAGE } from "../actions/pageLogActions";
import { SET_PONSERIAL_PAGE } from "../actions/pageLogActions";
import { SET_START_DATE } from "../actions/pageLogActions";
import { SET_END_DATE } from "../actions/pageLogActions";

const initialState = {
  page: null,
  activePage: 1,
  userPage: null,      
  ponSerialPage: null,  
  startDate: null,      
  endDate: null         
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
    case SET_USER_PAGE:
      return {
        ...state,
        userPage: action.payload,
      };
    case SET_PONSERIAL_PAGE:
      return {
        ...state,
        ponSerialPage: action.payload,
      };
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload,
      };
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.payload,
      };
    default:
      return state;
  }
};

export default pageReducer;