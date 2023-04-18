const { getActiveRoom, joinActiveRoom } = require("../serverStore");
const { updateRooms } = require("../socketHandler/update/rooms");
const roomJoinHandler = (data, socket) => {
  const { userId } = socket.user;

  const { roomId } = data;
  const participantDetails = {
    userId: userId,
    socketId: socket.id,
  };
  const roomDetails = getActiveRoom(roomId);
  joinActiveRoom(roomId, participantDetails);

  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      socket.to(participant.socketId).emit("conn-prepare", {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });
  updateRooms();
};

module.exports = roomJoinHandler;
