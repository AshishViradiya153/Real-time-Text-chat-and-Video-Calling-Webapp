import {
  setActiveRoomDetails,
  setIsUserJoinedWithOnlyAudio,
  setLocalStream,
  setOpenRoom,
  setRemoteString,
  setRoomDetails,
  setScreenSharingStream,
} from "../features/room/roomSlice";
import { store } from "../store";
import { closeAllConnection, getLocalStreamValue } from "./webRTCHandler";
import { createNewRoom, joinInRoom, leaveARoom } from "./ioClientConnection";
// create new room
export const userCreateNewRoom = (
  isUserInRoom = false,
  isUserRoomCreator = false
) => {
  const successCallbackFunc = () => {
    store.dispatch(setOpenRoom({ isUserInRoom, isUserRoomCreator }));

    const onluAudio = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedWithOnlyAudio(onluAudio));
    //emit to server create new room
    createNewRoom();
  };
  let audioOnly = store.getState().room.audioOnly;
  // if get stream value then execute successCallbackFunc function
  getLocalStreamValue(audioOnly, successCallbackFunc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};
//update active room
export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
  const friends = store.getState().friend.friends;
  let rooms = [];
  var { _id, username } = store.getState().user.user;
  activeRooms.forEach((room) => {
    const isRoomCreateByUser = room.roomCreator.userId === _id;
    if (isRoomCreateByUser) {
      rooms.push({ ...room, roomCreatorUsername: username });
    } else {
      friends.forEach((f) => {
        if (f.id === room.roomCreator.userId) {
          rooms.push({ ...room, roomCreatorUsername: f.username });
        }
      });
    }
  });
  store.dispatch(setActiveRoomDetails(rooms));
};

export const joinRoom = (roomId) => {
  const successCallbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    const isUserInRoom = true;
    const isUserRoomCreator = false;
    store.dispatch(setOpenRoom({ isUserInRoom, isUserRoomCreator }));

    const onluAudio = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedWithOnlyAudio(onluAudio));
    joinInRoom({ roomId });
  };
  let audioOnly = store.getState().room.audioOnly;
  // if get stream value then execute successCallbackFunc function
  getLocalStreamValue(audioOnly, successCallbackFunc);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails?.roomId;

  let localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }
  const screenSharingStream = store.getState().room.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }
  store.dispatch(setRemoteString([]));

  closeAllConnection();

  leaveARoom({ roomId });
  store.dispatch(setRoomDetails(null));
  const isUserInRoom = false;
  const isUserRoomCreator = false;
  store.dispatch(setOpenRoom({ isUserInRoom, isUserRoomCreator }));
};
