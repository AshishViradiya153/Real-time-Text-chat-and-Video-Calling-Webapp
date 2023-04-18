require("dotenv").config();
const http = require("http");
const cors = require("cors");
const express = require("express");
const connectDB = require("./db/connect");
const auth = require("./middleware/auth");
const { registerSocketServer } = require("./socketIoServer");
const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/friend-invitaion", friendInvitationRoutes);

// app.use("/api/v1/auth/test", auth, friendInvitationRoutes);

const server = http.createServer(app);

registerSocketServer(server);

const start = async () => {
  try {
    await connectDB(process.env.MOBGO_URL);
    PORT = process.env.PORT || process.env.API_PORT;
    server.listen(PORT, () => console.log(`server running on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
