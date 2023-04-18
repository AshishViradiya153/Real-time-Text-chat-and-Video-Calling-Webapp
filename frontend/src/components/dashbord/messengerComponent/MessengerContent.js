import { styled } from "@mui/system";
import React, { useEffect } from "react";
import Messages from "./messages/Messages";
import NewMessageInpute from "./NewMessageInpute";
import { useSelector } from "react-redux";
import updateDirectChatHistoryIfActive from "../../../utils/updateDirectChatHistoryIfActive";

const Wrapper = styled("div")({
  position: "relative",
  flexGrow: 1,
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "space-between",
});

const MessengerContent = ({ chosenChatDetails }) => {
  const { socket } = useSelector((store) => store.friend);

  useEffect(() => {
    socket?.on("direct-chat-history", (data) => {
      updateDirectChatHistoryIfActive(data);
    });
    if (chosenChatDetails) {
      socket?.emit("direct-chat-history", {
        receiverUserId: chosenChatDetails.id,
      });
    }
  }, [chosenChatDetails, socket]);

  return (
    <Wrapper>
      <Messages chosenChatDetails={chosenChatDetails} />
      <NewMessageInpute chosenChatDetails={chosenChatDetails} />
    </Wrapper>
  );
};

export default MessengerContent;
