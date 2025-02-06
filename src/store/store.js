import { configureStore } from '@reduxjs/toolkit'; 
import serialReducer from './reducers/serialReducer';

const store = configureStore({
  reducer: {
    serial: serialReducer,
  },
});

export default store;
