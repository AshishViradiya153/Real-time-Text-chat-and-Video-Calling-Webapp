import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingIsActive: false,
  isUserJoinedWithOnlyAudio: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setOpenRoom: (state, { payload }) => {
      const { isUserInRoom, isUserRoomCreator } = payload;
      state.isUserInRoom = isUserInRoom;
      state.isUserRoomCreator = isUserRoomCreator;
    },
    setLocalStream: (state, { payload }) => {
      return {
        ...state,
        localStream: payload,
      };
    },
    setRoomDetails: (state, { payload }) => {
      console.log("payload", payload);
      return {
        ...state,
        roomDetails: payload,
      };
    },
    setActiveRoomDetails: (state, { payload }) => {
      return {
        ...state,
        activeRooms: payload,
      };
    },
    setAudioOnly: (state, { payload }) => {
      return {
        ...state,
        audioOnly: payload,
      };
    },
    setRemoteString: (state, { payload }) => {
      return {
        ...state,
        remoteStreams: payload,
      };
    },
    setScreenSharingStream: (state, { payload }) => {
      return {
        ...state,
        screenSharingStream: payload,
        isScreenSharingIsActive: payload ? true : false,
      };
    },
    setIsUserJoinedWithOnlyAudio: (state, { payload }) => {
      return {
        ...state,
        isUserJoinedWithOnlyAudio: payload,
      };
    },
  },
});

export const {
  setOpenRoom,
  setLocalStream,
  setRoomDetails,
  setActiveRoomDetails,
  setAudioOnly,
  setRemoteString,
  setScreenSharingStream,
  setIsUserJoinedWithOnlyAudio,
} = roomSlice.actions;

export default roomSlice.reducer;
