import { SET_PAGE } from "../actions/pageLogTaskActions";
import { SET_ACTIVE_PAGE } from "../actions/pageLogTaskActions";
import { SET_USER_PAGE } from "../actions/pageLogTaskActions";
import { SET_PONSERIAL_PAGE } from "../actions/pageLogTaskActions";
import { SET_START_DATE } from "../actions/pageLogTaskActions";
import { SET_END_DATE } from "../actions/pageLogTaskActions";
import { SET_BULLEAN_TASK } from "../actions/pageLogTaskActions";
import { SET_CANNAL } from "../actions/pageLogTaskActions";
import { SET_REGION_TASK } from "../actions/pageLogTaskActions";
import { SET_WORK_TASK } from "../actions/pageLogTaskActions";
import { SET_LOGIN_TASK } from "../actions/pageLogTaskActions";

const initialState = {
  regionTask: null,
  work: null,
  task: true,
  page: null,
  activePage: 1,
  userPage: null,
  ponSerialPage: null,
  startDate: null,
  endDate: null,
  cannal: null,
  login: null
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGION_TASK:
      return {
        ...state,
        regionTask: action.payload,
      };
    case SET_LOGIN_TASK:
      return {
        ...state,
        loginTask: action.payload,
      };
    case SET_WORK_TASK:
      return {
        ...state,
        workTask: action.payload,
      };
    case SET_BULLEAN_TASK:
      return {
        ...state,
        task: action.payload,
      };
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
    case SET_CANNAL:
      return {
        ...state,
        cannal: action.payload,
      };
    default:
      return state;
  }
};

export default pageReducer;
