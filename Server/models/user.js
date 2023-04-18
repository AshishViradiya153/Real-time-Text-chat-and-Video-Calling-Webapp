const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String },
  mail: { type: String, unique: true },
  password: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

  

module.exports = model("User", userSchema);
