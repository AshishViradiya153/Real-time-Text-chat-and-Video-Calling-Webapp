const serverStore = require("../serverStore");
const roomLeaveHandler = require("./roomLeaveHandler");

const disconnectHandler = (socket) => {
  const activeRooms = serverStore.getActiveRooms();
  activeRooms.forEach((activeRoom) => {
    const userInRoom = activeRoom.participants.some(
      (participant) => participant.socketId === socket.id
    );
    if (userInRoom) {
      roomLeaveHandler({ roomId: activeRoom.roomId }, socket);
    }
  });
  console.log("🚀 disconnectHandler ~ socket", socket.id);
  const socketId = socket.id.toString();
  console.log(
    "🚀 ~ file: disconnectHandler.js:6 ~ disconnectHandler ~ socketId",
    socketId
  );
  serverStore.removeConnectedUser(socketId);
};
module.exports = { disconnectHandler };
