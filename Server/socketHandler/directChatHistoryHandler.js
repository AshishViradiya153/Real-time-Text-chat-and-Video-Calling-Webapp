const Conversation = require("../models/conversation");
const updateChatHistory = require("./update/chat");
const directChatHistoryHandler = async (data, socket) => {
  try {
    const { userId } = socket.user;

    const { receiverUserId } = data;
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });
    if (conversation) {
      updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = directChatHistoryHandler;
