import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const CameraButton = ({ localStream }) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const handleCameraToggle = (event) => {
    event.preventDefault();
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled((cameraEnabled) => !cameraEnabled);
  };
  return (
    <IconButton onClick={handleCameraToggle} style={{ color: "black" }}>
      {!cameraEnabled ? (
        <>
          <Tooltip arrow title="click here for start camera ">
            <VideocamOffIcon />
          </Tooltip>
        </>
      ) : (
        <Tooltip arrow title="click here for stop camera">
          <VideocamIcon />
        </Tooltip>
      )}
    </IconButton>
  );
};

export default CameraButton;
