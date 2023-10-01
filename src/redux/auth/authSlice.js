import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './authOperations';

const handlePendingAuth = state => {
  state.error = null;
};

const handleRejectedAuth = (state, action) => {
  state.error = action.payload;
};

const handleRegisterFulfilled = (state, action) => {
  state.error = null;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const handleLogInFulfilled = (state, action) => {
  state.error = null;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const handleLogOutFulfilled = state => {
  state.error = null;
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const handlePendingRefreshUser = state => {
  state.error = null;
  state.isRefreshing = true;
};

const handleRefreshUserFulfilled = (state, action) => {
  state.error = null;
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

const handleRejectedRefreshUser = (state, action) => {
  state.error = action.payload;
  state.isRefreshing = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePendingAuth)
      .addCase(register.fulfilled, handleRegisterFulfilled)
      .addCase(register.rejected, handleRejectedAuth)
      .addCase(logIn.pending, handlePendingAuth)
      .addCase(logIn.fulfilled, handleLogInFulfilled)
      .addCase(logIn.rejected, handleRejectedAuth)
      .addCase(logOut.pending, handlePendingAuth)
      .addCase(logOut.fulfilled, handleLogOutFulfilled)
      .addCase(logOut.rejected, handleRejectedAuth)
      .addCase(refreshUser.pending, handlePendingRefreshUser)
      .addCase(refreshUser.fulfilled, handleRefreshUserFulfilled)
      .addCase(refreshUser.rejected, handleRejectedRefreshUser),
});

export const authReducer = authSlice.reducer;
