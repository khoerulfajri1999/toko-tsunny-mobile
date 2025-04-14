import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice/appSlice';
import userReducer from './slice/userSlice';
import productReducer from './slice/productSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    product: productReducer
  },
});

export default store;