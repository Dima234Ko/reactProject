import { SET_REPORT_TASK } from '../actions/taskReportActions';

const initialState = {
  task: null,
};

const taskReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORT_TASK:
      return {
        ...state,
        task: action.payload,
      };

    default:
      return state;
  }
};

export default taskReportReducer;
