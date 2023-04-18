import { styled } from "@mui/system";
import React from "react";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
const ResizeButton = styled("button")({
  position: "absolute",
  bottom: "7px",
  right: "10px",
  border: "none",
  color: "white",
  cursor: "pointer",
  backgroundColor: "transparent",
  zIndex: 100,
});

const RoomResizeButton = ({ handleResize, roomIsMinimized }) => {
  return (
    <ResizeButton onClick={handleResize}>
      {roomIsMinimized ? <FullscreenIcon /> : <FullscreenExitIcon />}
    </ResizeButton>
  );
};

export default RoomResizeButton;
