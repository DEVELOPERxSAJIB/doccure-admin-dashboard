import { createSlice } from "@reduxjs/toolkit";
import {
  forgetPassword,
  getLoggedInUserData,
  loginUser,
  logoutUser,
  processRegister,
  resetUserPassword,
  updateSingleUser,
  updateUserPasswrod,
  verifyUser,
} from "./authApiSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    error: null,
    message: null,
    loader : false
  },
  reducers: {
    makeMessageEmpty: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processRegister.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(processRegister.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(action.payload.message);
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(getLoggedInUserData.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(getLoggedInUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(updateUserPasswrod.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUserPasswrod.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user")
      })
      .addCase(updateSingleUser.pending, (state) => {
        state.loader = true
      })
      .addCase(updateSingleUser.fulfilled, (state, action) => {
        state.loader = false
        state.message = action.payload.message;
        state.user = action.payload.updatedUser
      })
      .addCase(updateSingleUser.rejected, (state, action) => {
        state.loader = false
        state.error = action.error.message;
      })
  },
});

// selector
export const getAuthData = (state) => state.auth;

// action
export const { makeMessageEmpty } = authSlice.actions;

// export slice
export default authSlice.reducer;
