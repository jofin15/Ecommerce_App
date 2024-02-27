import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';
import { createOrder } from './orderAPI';


export const createOrderAsync = createAsyncThunk(
  'counter/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
  );
  
  const initialState = {
    orders: [],
    status: 'idle',
  };

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
      });
  },
});

// export const { increment } = counterSlice.actions;

export const selectOrders = (state) => state.counter.orders;

export default orderSlice.reducer;