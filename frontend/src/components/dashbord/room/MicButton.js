import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicOffIcon from "@mui/icons-material/MicOff";

const MicButton = ({ localStream }) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const handleMicToggle = (event) => {
    event.preventDefault();
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicEnabled((micEnabled) => !micEnabled);
  };
  return (
    <IconButton onClick={handleMicToggle} style={{ color: "black" }}>
      {!micEnabled ? (
        <Tooltip arrow title="click here for start mic">
          <MicOffIcon />
        </Tooltip>
      ) : (
        <>
          <Tooltip arrow title="click here for stop mic">
            <MicNoneIcon />
          </Tooltip>
        </>
      )}
    </IconButton>
  );
};

export default MicButton;
