import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  theme: 'light',
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

const appReducer = appSlice.reducer;
export const { startLoading, stopLoading, changeTheme } = appSlice.actions;
export default appReducer;
