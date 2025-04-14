import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.user = action.payload;
    },
  },
});

const productReducer = productSlice.reducer;
export const { setProduct } = productSlice.actions;
export default productReducer;
