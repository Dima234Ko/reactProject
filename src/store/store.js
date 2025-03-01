import { configureStore } from "@reduxjs/toolkit";
import serialReducer from "./reducers/serialReducer";
import progressReducer from "./reducers/progressReducer";
import regionReducer from "./reducers/regionReducer";
import workReducer from "./reducers/workReducer";

const store = configureStore({
  reducer: {
    serial: serialReducer,
    progress: progressReducer,
    region: regionReducer,
    work: workReducer
  },
});

export default store;
