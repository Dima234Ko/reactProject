import { configureStore } from "@reduxjs/toolkit";
import serialReducer from "./reducers/serialReducer";
import progressReducer from "./reducers/progressReducer"; 

const store = configureStore({
  reducer: {
    serial: serialReducer,
    progress: progressReducer,
  },
});

export default store;
