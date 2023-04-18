import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
// const jwt = require("jsonwebtoken");
import {
  addUserToLocalStorage,
  getUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

//Register User
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//Forget User password
export const ForgetUserPassword = createAsyncThunk(
  "user/forgetPassword",
  async (user, thunkAPI) => {
    try {
      console.log(">>>>>>", user);
      const resp = await customFetch.post("/auth/forgetPass", user);
      console.log("510", resp);
      return resp.data;
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const otpSendForRegister = createAsyncThunk(
  "user/registerOtp",
  async (user, thunkAPI) => {
    try {
      console.log(">>>>>>", user);
      const resp = await customFetch.post("/auth/verifyRegister-Otp", user);
      console.log("510", resp);
      return resp.data;
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//varify-otp

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (verifyOtpData, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/verify-Otp", verifyOtpData);
      return resp.data;
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//Login User
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const clearStoreThunk = createAsyncThunk(
  "user/clearStore",
  async (message, thunkAPI) => {
    try {
      thunkAPI.dispatch(logoutUser(message));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

const initialState = {
  user: getUserToLocalStorage(),
  isLoading: false,
  sendMailRespData: {},
  isPasswordChange: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state, { payload }) {
      state.user = null;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    setMailRespDataNull(state) {
      state.sendMailRespData = {};
    },
  },
  extraReducers: {
    //registerUserExtraReduser
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { userDetails } = payload;
      state.isLoading = false;
      // state.user = user
      // addUserToLocalStorage(user)
      toast.success(`Hello There ${userDetails.username} 😀`);
    },

    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    //loginUserExtraReduser
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      let { userDetails, token } = payload;
      console.log("🚀=====>>>>>~ userDetails", userDetails);
      state.isLoading = false;
      state.user = { ...userDetails, token };
      addUserToLocalStorage({ ...userDetails, token });
      toast.success(`Welcome back ${userDetails.username}!!`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [clearStoreThunk.rejected]: () => {
      toast.error("there was an error...");
    },
    [ForgetUserPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [ForgetUserPassword.fulfilled]: (state, { payload }) => {
      state.sendMailRespData = payload;
      state.isLoading = false;
    },
    [ForgetUserPassword.rejected]: (state, { payload }) => {
      console.log("12 payload:", payload);
      toast.error(payload);
      state.isLoading = false;
    },
    [verifyOtp.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyOtp.fulfilled]: (state, { payload }) => {
      if (payload) {
        toast.success(payload);
        // state.isPasswordChange = true;
      }
      state.isLoading = false;
    },
    [verifyOtp.rejected]: (state, { payload }) => {
      console.log("error 22", payload);
      toast.error(payload);
      state.isLoading = false;
    },
    [otpSendForRegister.pending]: (state) => {
      state.isLoading = true;
    },
    [otpSendForRegister.fulfilled]: (state, { payload }) => {
      console.log(payload);
      toast.success("OTP Successfully sent at your email");
      state.sendMailRespData = payload;
      state.isLoading = false;
    },
    [otpSendForRegister.rejected]: (state, { payload }) => {
      console.log("12 payload:", payload);
      toast.error(payload);
      state.isLoading = false;
    },
  },
});

export const { logoutUser, setMailRespDataNull } = userSlice.actions;
export default userSlice.reducer;
