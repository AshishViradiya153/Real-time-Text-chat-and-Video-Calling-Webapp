import React from "react";
import { useSelector } from "react-redux";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { styled } from "@mui/system";

import { userCreateNewRoom } from "../../../real-time_Communication/roomHandler";
import ActiveRoomButton from "./ActiveRoomButton";
// const ButtonWrraper = styled("button")({
//   width: "48px",
//   cursor: "pointer",
//   height: "48px",
//   borderRadius: "14px",
//   padding: "0",
//   border: "none",
//   margin: "0",
//   minWidth: "0",
//   marginTop: "10px",
//   color: "white",
//   backgroundColor: "#4892f6",
//   fontSize: "medium",
//   transitionDuration: "0.4s",
//   "&:hover": {
//     boxShadow: "0 12px 16px 0 rgba(0,0,0,0.30),0 17px 50px 0 rgba(0,0,0,0.19)",
//     // backgroundColor: "red",
//     // backgroundColor:notHover ? "#3e7049" : "red",
//   },
// });
const ButtonWrraper = styled("button", {
  shouldForwardProp: (prop) => prop !== "notHover",
})(({ notHover }) => ({
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
    backgroundColor: notHover ? "" : "red",
  },
}));

const CreateRoomButton = () => {
  const { activeRooms, isUserInRoom } = useSelector((store) => store.room);
  // console.log(
  //   "🚀 ~ file: CreateRoomButton.js:30 ~ CreateRoomButton ~ activeRooms",
  //   activeRooms,
  //   isUserInRoom
  // );
  const createNewRoomHandler = () => {
    //create new room
    const isUserInRoom = true;
    const isUserRoomCreator = true;
    userCreateNewRoom(isUserInRoom, isUserRoomCreator);
  };

  return (
    <>
      <ButtonWrraper notHover="notHover">
        <Groups3OutlinedIcon />
      </ButtonWrraper>
      <ButtonWrraper disabled={isUserInRoom} onClick={createNewRoomHandler}>
        <AddOutlinedIcon />
      </ButtonWrraper>
      {activeRooms.map((room) => (
        <ActiveRoomButton
          roomId={room.roomId}
          roomCreatorUsername={room.roomCreatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
    </>
  );
};

export default CreateRoomButton;
