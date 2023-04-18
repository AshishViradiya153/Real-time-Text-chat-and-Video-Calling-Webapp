const { v4 } = require("uuid");
const connectedUser = new Map();
let activeRooms = [];
let io = null;
const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  if (!connectedUser.has(socketId)) {
    connectedUser.set(socketId, { userId });
  }
  // connectedUser.set(socketId, { userId });

  console.log("new user connected");
  console.log(
    "🚀 ~ file: serverStore.js:5 ~ addNewConnectedUser ~ connectedUser",
    connectedUser
  );
};

const removeConnectedUser = (socketId) => {
  console.log(
    "🚀 ~ file: serverStore.js:16 ~ removeConnectedUser ~ socketId",
    socketId
  );
  console.log(" removeConnectedUser ~ socketId", connectedUser.has(socketId));
  if (connectedUser.has(socketId)) {
    connectedUser.delete(socketId);
    console.log(" connectedUser", connectedUser);
  }
};

const getActiveConnections = (userID) => {
  const activeConnection = [];
  connectedUser.forEach((value, key) => {
    console.log(
      "true and false",
      value.userId.toString() === userID.toString()
    );
    if (value.userId.toString() === userID.toString()) {
      activeConnection.push(key);
    }
  });
  return activeConnection;
};

const getOnlineUsers = () => {
  let onlineUsers = [];
  connectedUser.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });
  return onlineUsers;
};

const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: v4(),
  };
  activeRooms = [...activeRooms, newActiveRoom];
  console.log("...=====>>>>>>>", activeRooms);
  return newActiveRoom;
};

const getActiveRooms = () => {
  return [...activeRooms];
};

const getActiveRoom = (roomId) => {
  const activeRoom = activeRooms.find(
    (activeRoom) => activeRoom.roomId === roomId
  );
  if (activeRoom) {
    return { ...activeRoom };
  } else {
    return null;
  }
};

const joinActiveRoom = (roomId, newParticipant) => {
  const room = activeRooms.find((room) => room.roomId === roomId);
  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipant],
  };
  activeRooms.push(updatedRoom);
};

const leaveAciveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);
  if (activeRoom) {
    const cpOfActiveRoom = { ...activeRoom };
    cpOfActiveRoom.participants = cpOfActiveRoom.participants.filter(
      (participant) => participant.socketId !== participantSocketId
    );
    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

    if (cpOfActiveRoom.participants?.length > 0) {
      activeRooms.push(cpOfActiveRoom);
    }
  }
};
module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getSocketServerInstance,
  setSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms,
  getActiveRoom,
  joinActiveRoom,
  leaveAciveRoom,
};
