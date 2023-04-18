import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";
const initialState = {
  socket: null,
  friends: [],
  pendingFriendsInvitation: [],
  onlineUser: [],
  isLoading: false,
};

export const sendFriendInvitation = createAsyncThunk(
  "friend/sendFriendInvitation",
  async ({ requestMail, handleCloseDialog }, thunkAPI) => {
    try {
      const { data } = await customFetch.post("/friend-invitaion/invite", {
        requestMail,
      });
      return {
        data,
        handleCloseDialog,
      };
    } catch (error) {
      if (error.response.status === "401" || error.response.status === "403") {
        return thunkAPI.dispatch(logoutUser(""));
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const acceptFriendInvitation = createAsyncThunk(
  "friend/acceptFriendInvitation",
  async (id, thunkAPI) => {
    try {
      const { data } = await customFetch.post("/friend-invitaion/accept", {
        id,
      });
      return data;
    } catch (error) {
      if (error.response.status === "401" || error.response.status === "403") {
        return thunkAPI.dispatch(logoutUser(""));
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const rejectFriendInvitation = createAsyncThunk(
  "friend/acceptFriendInvitation",
  async (id, thunkAPI) => {
    try {
      const { data } = await customFetch.post("/friend-invitaion/reject", {
        id,
      });
      return data;
    } catch (error) {
      if (error.response.status === "401" || error.response.status === "403") {
        return thunkAPI.dispatch(logoutUser(""));
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setSocketGlobal: (state, { payload }) => {
      state.socket = payload;
    },
    setPandingFriendsInvitations: (state, { payload }) => {
      state.pendingFriendsInvitation = payload;
    },
    setFriendsList: (state, { payload }) => {
      state.friends = payload;
    },
    setOnlineUsers: (state, { payload }) => {
      state.onlineUser = payload;
    },
  },
  extraReducers: {
    [sendFriendInvitation.pending]: (state) => {
      state.isLoading = true;
    },
    [sendFriendInvitation.fulfilled]: (state, { payload }) => {
      const { data, handleCloseDialog } = payload;
      state.isLoading = false;
      if (data) {
        toast.success(data);
      }
      handleCloseDialog();
    },
    [sendFriendInvitation.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [acceptFriendInvitation.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload) {
        toast.success(payload);
      }
    },
    [acceptFriendInvitation.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [rejectFriendInvitation.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload) {
        toast.success(payload);
      }
    },
    [rejectFriendInvitation.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  setSocketGlobal,
  setPandingFriendsInvitations,
  setFriendsList,
  setOnlineUsers,
} = friendSlice.actions;
export default friendSlice.reducer;
