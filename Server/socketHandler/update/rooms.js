const {
  getActiveRooms,
  getSocketServerInstance,
} = require("../../serverStore");

const updateRooms = (toSpecifiedSocketId = null) => {
  const io = getSocketServerInstance();
  const activeRooms = getActiveRooms();
  if (toSpecifiedSocketId) {
    io.to(toSpecifiedSocketId).emit("active-room", {
      activeRooms,
    });
  } else {
    io.emit("active-room", {
      activeRooms,
    });
  }
};

module.exports = {
  updateRooms,
};
