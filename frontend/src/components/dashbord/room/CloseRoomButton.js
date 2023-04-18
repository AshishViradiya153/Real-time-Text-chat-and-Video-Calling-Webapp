import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { leaveRoom } from "../../../real-time_Communication/roomHandler";
const CloseRoomButton = () => {
  const handleleaveRoom = (event) => {
    event.preventDefault();
    leaveRoom();
  };
  return (
    <IconButton onClick={handleleaveRoom} style={{ color: "black" }}>
      <Tooltip arrow title="leave video call room">
        <CancelPresentationIcon />
      </Tooltip>
    </IconButton>
  );
};

export default CloseRoomButton;
