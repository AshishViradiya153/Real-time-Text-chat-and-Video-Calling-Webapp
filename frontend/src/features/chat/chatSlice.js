import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChoosenChatDetails: (state, { payload }) => {
      const { detail, chatTypes } = payload;
      return {
        ...state,
        chosenChatDetails: detail,
        chatType: chatTypes.DIRECT,
        messages: [],
      };
    },
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
  },
  extraReducers: {},
});

export const { setChoosenChatDetails, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
