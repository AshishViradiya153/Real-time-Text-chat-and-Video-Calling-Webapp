import { setMessages } from "../features/chat/chatSlice";
import { store } from "../store";

const updateDirectChatHistoryIfActive = (data) => {
  const { messages, participants } = data;
  console.log("🚀 ==>>>>>>> participants", participants);

  const { chat, user } = store.getState();

  const receiverId = chat.chosenChatDetails?.id;
  const userId = user.user?._id;
  if (receiverId && userId) {
    const userInConversation = [receiverId, userId];
    updateChatHistoryIfSameConversationActive({
      participants,
      messages,
      userInConversation,
    });
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  messages,
  userInConversation,
}) => {
  const result = participants.every((participantsId) => {
    return userInConversation.includes(participantsId);
  });
  console.log(result);
  if (result) {
    store.dispatch(setMessages(messages));
  }
};

export default updateDirectChatHistoryIfActive;
