import React, { useState } from "react";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setScreenSharingStream } from "../../../features/room/roomSlice";
import { switchOutgoingTracks } from "../../../real-time_Communication/webRTCHandler";
const ScreenShareButton = () => {
  const dispatch = useDispatch();
  const { localStream, isScreenSharingIsActive, screenSharingStream } =
    useSelector((store) => store.room);
  // console.log(screenSharingStream);
  // const constraints = {
  //   audio: false,
  //   video: {
  //     width: { min: 640, ideal: 1920 },
  //     height: { min: 400, ideal: 1080 },
  //     aspectRatio: { ideal: 1.7777777778 },
  //   },
  // };
  const constraints1 = {
    audio: false,
    video: true,
  };
  // const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const handleScreenShareToggle = async (event) => {
    event.preventDefault();
    if (!isScreenSharingIsActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints1);
      } catch (error) {
        console.log("screen sharing error", error);
      }
      if (stream) {
        dispatch(setScreenSharingStream(stream));
        switchOutgoingTracks(stream);
      }
    } else {
      switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((t) => t.stop());
      dispatch(setScreenSharingStream(null));
    }
  };

  return (
    <IconButton onClick={handleScreenShareToggle} style={{ color: "black" }}>
      {!isScreenSharingIsActive ? (
        <>
          <Tooltip arrow title="Click here for screen share">
            <StopScreenShareIcon />
          </Tooltip>
        </>
      ) : (
        <Tooltip arrow title="Click here for stop screen share">
          <ScreenShareIcon />
        </Tooltip>
      )}
    </IconButton>
  );
};

export default ScreenShareButton;
