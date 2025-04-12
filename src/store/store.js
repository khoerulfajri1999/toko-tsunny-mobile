import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice/appSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;