import { configureStore } from "@reduxjs/toolkit";
import serialReducer from "./reducers/serialReducer";
import progressReducer from "./reducers/progressReducer";
import regionReducer from "./reducers/regionReducer"; 

const store = configureStore({
  reducer: {
    serial: serialReducer,
    progress: progressReducer,
    region: regionReducer, 
  },
});

export default store;