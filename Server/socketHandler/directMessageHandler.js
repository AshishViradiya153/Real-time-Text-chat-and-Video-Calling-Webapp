const Conversation = require("../models/conversation");
const Message = require("../models/message");
const bcrypt = require("bcryptjs");
const updateChatHistory = require("./update/chat");
var CryptoJS = require("crypto-js");
const directMessageHandler = async (data, socket) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId, content } = data;
    const encryptedContent = CryptoJS.AES.encrypt(
      content,
      process.env.ENCRYPT_SECRET_KEY
    ).toString();

    const message = await Message.create({
      content: encryptedContent,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      updateChatHistory(conversation._id.toString());
    } else {
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });
      updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = directMessageHandler;
