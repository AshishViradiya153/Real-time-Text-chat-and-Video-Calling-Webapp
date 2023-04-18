const { varifyToken } = require("./middleware/socketAuth");
const { disconnectHandler } = require("./socketHandler/disconnectHandler");
const newConnectionHandler = require("./socketHandler/newConnectionHandler");
const { setSocketServerInstance, getOnlineUsers } = require("./serverStore");
const directMessageHandler = require("./socketHandler/directMessageHandler");

const { Server } = require("socket.io");
const directChatHistoryHandler = require("./socketHandler/directChatHistoryHandler");
const roomCreateHandler = require("./socketHandler/roomCreateHandler");
const roomJoinHandler = require("./socketHandler/roomJoinHandler");
const roomLeaveHandler = require("./socketHandler/roomLeaveHandler");
const roomInitializedConnectionHandler = require("./socketHandler/roomInitializedConnectionHandler");
const roomSignalingDataHandler = require("./socketHandler/roomSignalingDataHandler");
const registerSocketServer = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      transports: ["websocket", "polling"],
      reconnection: false,
      // credentials: true,
    },
    allowEIO3: true,
  });
  setSocketServerInstance(io);
  io.use((socket, next) => {
    varifyToken(socket, next);
  });

  const emitOnlineUser = () => {
    const onlineUsers = getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("coneceted");
    newConnectionHandler(socket, io);

    emitOnlineUser();

    socket.on("disconnect", (reason) => {
      socket.removeAllListeners("direct-message");
      socket.removeAllListeners("disconnect");
      socket.removeAllListeners("connection");
      console.log("in disconnect event", socket.id);
      disconnectHandler(socket);
    });
    // direct - message;

    socket.on("direct-message", (data) => {
      directMessageHandler(data, socket);
    });

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(data, socket);
    });

    socket.on("create-room", () => {
      roomCreateHandler(socket);
    });
    socket.on("room-join", (data) => {
      roomJoinHandler(data, socket);
    });
    socket.on("room-leave", (data) => {
      roomLeaveHandler(data, socket);
    });

    socket.on("conn-init", (data) => {
      roomInitializedConnectionHandler(data, socket);
    });

    socket.on("conn-signal", (data) => {
      roomSignalingDataHandler(data, socket);
    });
  });

  setInterval(() => {
    emitOnlineUser();
  }, [5000]);
};

module.exports = { registerSocketServer };
