import React, { useState } from "react";
import { styled } from "@mui/system";
import RoomResizeButton from "./RoomResizeButton";
import VideosContainer from "./VideosContainer.js";
import RoomButtons from "./RoomButtons";
const MainContainer = styled("div")({
  position: "absolute",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#202225",
});

const roomFullScreenStyle = {
  width: "100%",
  height: "100vh",
};

const minimizedRoomStyle = {
  bottom: "65px",
  right: "0px",
  width: "35%",
  height: "45vh",
};

const Room = () => {
  const [roomIsMinimized, setRoomIsMinimized] = useState(true);
  const roomResizeHandler = (event) => {
    event.preventDefault();
    setRoomIsMinimized((roomIsMinimized) => !roomIsMinimized);
  };
  return (
    <MainContainer
      style={roomIsMinimized ? minimizedRoomStyle : roomFullScreenStyle}
    >
      <VideosContainer />
      <RoomButtons />
      <RoomResizeButton
        handleResize={roomResizeHandler}
        roomIsMinimized={roomIsMinimized}
      />
    </MainContainer>
  );
};

export default Room;
