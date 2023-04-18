import React from "react";
import { styled } from "@mui/system";
import Avatar from "../../dashbordComponents/Avatar";
import Typography from "@mui/material/Typography";
const MainContainer = styled("div")({
  width: "98%",
  marginTop: "12px",
});
const MessageHeader = ({ username }) => {
  return (
    <MainContainer className="oneMessage">
      <Avatar large userName={username} />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          color: "#e5f0ff",
          marginLeft: "5px",
        }}
      >
        {username}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "#e5f0ff",
          marginLeft: "5px",
        }}
      >
        This is beginning of your conversation with {username}
      </Typography>
    </MainContainer>
  );
};

export default MessageHeader;
