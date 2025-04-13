import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice/appSlice';
import userReducer from './slice/userSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

export default store;