import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './userAPI';

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'counter/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    console.log("response from userSlice",response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    console.log("updated user info in profile",response.data);
    return response.data;
  }
)

export const fetchLoggedInUserAsync=createAsyncThunk(
  'user/fetchLoggedInUser',
  async (user) => {
    const userId=user[0]
    console.log("my fetchLogginUser user id :- ",userId.id);
    const response = await fetchLoggedInUser(userId.id);
    // The value we return becomes the `fulfilled` action payload
    console.log("my fetchLogginUser Response",response.data);
    return response.data;
  }
)


const initialState = {
  userOrders: [],
  userInfo:null, //this user info will be used in case of detailed user info, while auth will only be used for loggedInUser id 
  status: 'idle',
};



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })

      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })

      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });

  },
});

// export const { increment } = counterSlice.actions;


export const selectUserOrders=(state)=>state.user.userOrders
export const selectUserInfo=(state)=>state.user.userInfo
export default userSlice.reducer;