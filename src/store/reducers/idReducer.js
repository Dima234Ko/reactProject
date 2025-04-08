import { SET_ID } from '../actions/idActions';

const initialState = {
  id: null,
};

const idReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

export default idReducer;
