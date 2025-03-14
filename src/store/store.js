import { configureStore } from "@reduxjs/toolkit";
import serialReducer from "./reducers/serialReducer";
import progressReducer from "./reducers/progressReducer";
import regionReducer from "./reducers/regionReducer";
import workReducer from "./reducers/workReducer";
import loginReducer from "./reducers/loginReducer";
import idReducer from "./reducers/idReducer";
import taskReducer from "./reducers/taskReducer";
import checkboxUserReducer from "./reducers/checkboxUserReducer";

const store = configureStore({
  reducer: {
    serial: serialReducer,
    progress: progressReducer,
    region: regionReducer,
    work: workReducer,
    login: loginReducer,
    id: idReducer,
    task: taskReducer,
    checkboxUser: checkboxUserReducer,
  },
});

export default store;
