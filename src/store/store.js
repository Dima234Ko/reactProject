import { configureStore } from '@reduxjs/toolkit';
import serialReducer from './reducers/serialReducer';
import progressReducer from './reducers/progressReducer';
import regionReducer from './reducers/regionReducer';
import workReducer from './reducers/workReducer';
import loginReducer from './reducers/loginReducer';
import ipReducer from './reducers/ipReducer';
import idReducer from './reducers/idReducer';
import taskReducer from './reducers/taskReducer';
import checkboxUserReducer from './reducers/checkboxUserReducer';
import taskReportReducer from './reducers/taskReportReducer';
import pageReducer from './reducers/pageLogTaskReducer';
import warningReducer from './reducers/warningReducer';

const store = configureStore({
  reducer: {
    serial: serialReducer,
    progress: progressReducer,
    region: regionReducer,
    work: workReducer,
    login: loginReducer,
    ip:ipReducer,
    id: idReducer,
    task: taskReducer,
    checkboxUser: checkboxUserReducer,
    taskReport: taskReportReducer,
    page: pageReducer,
    warning: warningReducer,
  },
});

export default store;
