import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
const ChoosenOptionalLabel = () => {
  const { chosenChatDetails } = useSelector((store) => store.chat);
  return (
    <>
      <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
        {chosenChatDetails?.name
          ? `Chat conversation with : ${chosenChatDetails?.name} :`
          : "DASHBOARD"}
      </Typography>
    </>
  );
};

export default ChoosenOptionalLabel;
