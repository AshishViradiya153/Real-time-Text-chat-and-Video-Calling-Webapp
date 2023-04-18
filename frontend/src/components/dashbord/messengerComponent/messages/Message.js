import React from "react";
import { styled } from "@mui/system";
import Avatar from "../../dashbordComponents/Avatar";
import { Typography } from "@mui/material";
import CryptoJS from "crypto-js";
import { EXTRA_SUPER_KEY } from "../../../../utils/types";
const MainContainer = styled("div")({
  display: "flex",
  marginTop: "5px",
});
const AvatarContainer = styled("div")({
  width: "70px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const MessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});
const MessageContent = styled("div")({
  color: "#c5c6c6",
});
const SameAuthorMessageContent = styled("div")({
  color: "#c5c6c6",
  // width: "98%",
  marginLeft: "69px",
});
const SameAuthorMessageText = styled("span")({
  // marginLeft: "70px",
});

var decryptText = (content) => {
  var bytes = CryptoJS.AES.decrypt(content, EXTRA_SUPER_KEY);
  var originalContebt = bytes.toString(CryptoJS.enc.Utf8);
  return originalContebt;
};

const Message = ({ name, content, sameAuthor, date, sameDay, time }) => {
  const ContentText = decryptText(content);

  if (sameAuthor && sameDay) {
    return (
      <SameAuthorMessageContent>
        <SameAuthorMessageText>{ContentText}</SameAuthorMessageText>
        <span style={{ fontSize: "10px", color: "#72767d", marginLeft: "5px" }}>
          {time}
        </span>
      </SameAuthorMessageContent>
    );
  }
  return (
    <MainContainer>
      <AvatarContainer>
        <Avatar userName={name} />
      </AvatarContainer>
      <MessageContainer>
        <Typography style={{ fontSize: "16px", color: "white" }}>
          {`${name} `}
          <span style={{ fontSize: "10px", color: "#72767d" }}>{date}</span>
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <MessageContent>{ContentText} </MessageContent>{" "}
          <span
            style={{ fontSize: "10px", color: "#72767d", marginLeft: "5px" }}
          >
            {time}
          </span>
        </div>
      </MessageContainer>
    </MainContainer>
  );
};

export default Message;
