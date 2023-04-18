const { getActiveRoom, leaveAciveRoom } = require("../serverStore");
const { updateRooms } = require("./update/rooms");

const roomLeaveHandler = (data, socket) => {
  const { roomId } = data;
  const activeRoom = getActiveRoom(roomId);
  if (activeRoom) {
    leaveAciveRoom(roomId, socket.id);
    const updateActiveRoom = getActiveRoom(roomId);
    if (updateActiveRoom) {
      updateActiveRoom.participants?.forEach((participant) => {
        socket.to(participant.socketId).emit("room-participant-leave", {
          connUserSocketId: socket.id,
        });
      });
    }
    updateRooms();
  }
};
module.exports = roomLeaveHandler;
