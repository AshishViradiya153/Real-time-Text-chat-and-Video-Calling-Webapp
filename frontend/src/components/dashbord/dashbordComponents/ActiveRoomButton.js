import React from "react";
import { styled } from "@mui/system";
import { Tooltip } from "@mui/material";
import Avatar from "./Avatar";
import { joinRoom } from "../../../real-time_Communication/roomHandler";
const ButtonWrraper = styled("button")({
  marginLeft: "4px",
  width: "48px",
  cursor: "pointer",
  height: "48px",
  borderRadius: "14px",
  padding: "0",
  border: "none",
  margin: "0",
  minWidth: "0",
  marginTop: "10px",
  color: "white",
  backgroundColor: "#4892f6",
  fontSize: "medium",
  transitionDuration: "0.4s",
  "&:hover": {
    boxShadow: "0 12px 16px 0 rgba(0,0,0,0.30),0 17px 50px 0 rgba(0,0,0,0.19)",
    backgroundColor: "red",
  },
});

const ActiveRoomButton = ({
  roomId,
  roomCreatorUsername,
  amountOfParticipants,
  isUserInRoom,
}) => {
  const handleJoinActiveRoom = () => {
    if (amountOfParticipants < 4) {
      //do something,, join in room
      joinRoom(roomId);
    }
  };
  const disableButton = amountOfParticipants > 3;
  const roomTitle = `Creator : ${roomCreatorUsername}. Connected: ${amountOfParticipants} `;
  return (
    <>
      <Tooltip title={roomTitle}>
        <ButtonWrraper
          disabled={disableButton || isUserInRoom}
          onClick={handleJoinActiveRoom}
        >
          <Avatar userName={roomCreatorUsername} />
        </ButtonWrraper>
      </Tooltip>
    </>
  );
};

export default ActiveRoomButton;
