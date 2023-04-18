import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
const Message = styled("div")({
  //   width: "100%",
  flexGrow: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
const DisplayMessage = () => {
  return (
    <Message>
      <Typography variant="subtitle" sx={{ fontSize: "20px" }}>
        Click on friend and start conversation
      </Typography>
    </Message>
  );
};

export default DisplayMessage;
