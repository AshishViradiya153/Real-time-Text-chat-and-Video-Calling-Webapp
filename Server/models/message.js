const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const messageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
content: { type: String },
  date: { type: Date },
  type: { type: String },
});

module.exports = model("Message", messageSchema);
