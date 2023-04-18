const { addNewActiveRoom } = require("../serverStore");
const { updateRooms } = require("./update/rooms");
const  roomCreateHandler = (socket) => {
  const socketId = socket.id;
  const userId = socket.user.userId;
  const roomDetails = addNewActiveRoom(userId, socketId);
  socket.emit("room-create-successful", {
    roomDetails,
  });
  // update all, room is created
  updateRooms();
};
module.exports = roomCreateHandler;
