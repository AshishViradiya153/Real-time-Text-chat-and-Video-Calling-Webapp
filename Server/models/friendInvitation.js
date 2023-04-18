const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const friendInvitationSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("FriendInvitation", friendInvitationSchema);
