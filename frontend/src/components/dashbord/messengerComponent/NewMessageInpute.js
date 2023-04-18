import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import Picker from "emoji-picker-react";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const MainContainer = styled("div")({
  flexGrow: 1,
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const Input = styled("input")({
  backgroundColor: "#262e43",
  margin: "0px 10px",
  width: "100%",
  height: "45px",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "14px",
  padding: "0 10px",
});
const NewMessageInpute = ({ chosenChatDetails }) => {
  const { socket } = useSelector((store) => store.friend);
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setMessage((prevMesssage) => prevMesssage + event.emoji);
    const inputEl = document.getElementById("input");
    inputEl.focus();
    setShowPicker(false);
  };

  const handleMessageInputValueChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (message.length === 0) {
          toast.info("Plases enter message and press enter key");
          return;
        } else {
          socket.emit("direct-message", {
            receiverUserId: chosenChatDetails.id,
            content: message,
          });
        }
        setMessage("");
      }
    },
    [chosenChatDetails.id, message, socket]
  );

  useEffect(() => {
    const inputEl = document.getElementById("input");
    // inputEl.addEventListener("keydown", handleSendMessage);
    return () => {
      socket?.off("direct-message");
      inputEl.removeEventListener("keydown", handleSendMessage);
    };
  }, [handleSendMessage, socket]);

  return (
    <MainContainer>
      <Input
        id="input"
        type="text"
        placeholder={`Write a message to ${chosenChatDetails?.name}`}
        value={message}
        onChange={handleMessageInputValueChange}
        onKeyDown={handleSendMessage}
      />
      {showPicker && (
        <div
          style={{
            position: "absolute",
            right: "43px",
            bottom: "60px",
            zIndex: "100",
          }}
        >
          <Picker
            pickerStyle={{ width: "100%" }}
            onEmojiClick={onEmojiClick}
            autoFocusSearch={true}
            theme="dark"
            emojiStyle="google"
          />
        </div>
      )}
      <Button
        onClick={() => {
          handleSendMessage("hello");
          setShowPicker((val) => !val);
        }}
        style={{ marginRight: "10px", color: "aliceblue" }}
      >
        <EmojiEmotionsOutlinedIcon />
      </Button>
    </MainContainer>
  );
};

export default NewMessageInpute;
