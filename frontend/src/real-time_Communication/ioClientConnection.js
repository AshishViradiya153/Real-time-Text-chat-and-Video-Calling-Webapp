import io from "socket.io-client";
import { newRoomCreated, updateActiveRooms } from "./roomHandler";
import {
  handleParticipantLeaveRoom,
  handleSignalingData,
  prepareNewPeerConnection,
} from "./webRTCHandler";
let socket = null;
export const connectionWithSocketServer = (userDetails) => {
  const jwtToken = userDetails?.token;

  socket = io(
    "http://localhost:8000",
    {
      auth: {
        token: jwtToken,
      },
    },
    {
      transports: ["websocket"],
      upgrade: false,
      // reconnection: true,
    }
  );
  socket.on("connect", () => {
    console.log("successfully connected with socket server...");
    console.log("socket", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("user is logout====?>>>> ");
    console.log(socket.id); // undefined

    window.location.reload();
  });

  socket.on("room-create-successful", (data) => {
    newRoomCreated(data);
  });
  socket.on("active-room", (data) => {
    // active rooms come from server
    updateActiveRooms(data);
  });
  socket.on("conn-prepare", (data) => {
    console.log("coming here conn-prepare");

    const { connUserSocketId } = data;
    prepareNewPeerConnection(connUserSocketId, false);
    socket.emit("conn-init", {
      connUserSocketId: connUserSocketId,
    });
  });

  socket.on("conn-init", (data) => {
    console.log("coming here conn - init");
    const { connUserSocketId } = data;
    prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("conn-signal", (data) => {
    handleSignalingData(data);
  });

  socket.on("room-participant-leave", (data) => {
    handleParticipantLeaveRoom(data);
  });
  return socket;
};

export const createNewRoom = (data) => {
  socket?.emit("create-room", data);
};

export const joinInRoom = (data) => {
  socket?.emit("room-join", data);
};

export const leaveARoom = (data) => {
  socket?.emit("room-leave", data);
};

export const signalPeerData = (data) => {
  socket?.emit("conn-signal", data);
};
