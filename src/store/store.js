import { configureStore } from "@reduxjs/toolkit";
import serialReducer from "./reducers/serialReducer";
import progressReducer from "./reducers/progressReducer"; // Импорт редьюсера для progress

const store = configureStore({
  reducer: {
    serial: serialReducer,
    progress: progressReducer, // Добавляем редьюсер для progress
  },
});

export default store;
