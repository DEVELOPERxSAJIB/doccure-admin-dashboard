import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// user registration
export const processRegister = createAsyncThunk(
  "auth/processRegister",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:4040/api/v1/auth/process-register`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// verify user
export const verifyUser = createAsyncThunk("auth/verifyUser", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:4040/api/v1/auth/verify-user`,
      data,
      {
        withCredentials: true,
      }
    );
    // console.log(response.data);

    return response.data;
  } catch (error) {
    // console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
});

// user login
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:4040/api/v1/auth/login`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// user logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(
      `http://localhost:4040/api/v1/auth/logout`,
      "",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// loggedIn user data
export const getLoggedInUserData = createAsyncThunk(
  "auth/loggedInUserData",
  async () => {
    try {
      const response = await axios.get(`http://localhost:4040/api/v1/auth/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// forget password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (input) => {
    try {
      const response = await axios.post(
        `http://localhost:4040/api/v1/auth/forget-password`,
        input,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

// reset passsword
export const resetUserPassword = createAsyncThunk(
  "auth/resetUserPassword",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:4040/api/v1/auth/reset-password`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// update user password
export const updateUserPasswrod = createAsyncThunk(
  "user/updateUserPasswrod",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:4040/api/v1/auth/update-password`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// update single user
export const updateSingleUser = createAsyncThunk("user/updateSingleUser", async (data) => {
  try {

    const response = await axios.put(`http://localhost:4040/api/v1/user/update-user`, data, {
      withCredentials : true
    })

    return response.data
    
  } catch (error) {
    throw new Error(error.response.data.message);
  }
})
