import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import friendSlice from "./features/user/friendSlice";
import chatSlice from "./features/chat/chatSlice";
import roomSlice from "./features/room/roomSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    friend: friendSlice,
    chat: chatSlice,
    room: roomSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
