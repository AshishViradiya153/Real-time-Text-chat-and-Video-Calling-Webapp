const roomSignalingDataHandler = (data, socket) => {
  const { signal, connUserSocketId } = data;
  const signalingData = { signal, connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit("conn-signal", signalingData);
};

module.exports = roomSignalingDataHandler;
