const jwt = require("jsonwebtoken");

const confige = process.env;

const varifyToken = (socket, next) => {
  const token = socket.handshake.auth?.token;
  try {
    const decoded = jwt.verify(token, confige.JWT_SECRET_KEY);
    socket.user = decoded;
    console.log(
      "🚀 ~ file: socketAuth.js:11 ~ varifyToken ~ socket.user",
      socket.user
    );
  } catch (error) {
    const socketError = new Error("NOT_AUTHORIZED");
    console.log("error", socketError);
    return next(socketError);
  }
  next();
};

module.exports = { varifyToken };
