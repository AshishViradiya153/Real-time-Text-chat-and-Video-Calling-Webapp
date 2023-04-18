const serverStore = require("../serverStore");
const {
  updateFriendsPendingInvitations,
  updateFriendsList,
} = require("./update/friend");
const { updateRooms } = require("./update/rooms");

const newConnectionHandler = (socket, io) => {
  const userDetails = socket.user;
  serverStore.addNewConnectedUser({
    socketId: socket?.id,
    userId: userDetails?.userId,
  });

  let userId = {
    _id: userDetails?.userId,
  };

  updateFriendsPendingInvitations(userId);
  updateFriendsList(userDetails?.userId);

  setTimeout(() => {
    updateRooms(socket.id);
  }, [500]);
};
module.exports = newConnectionHandler;
