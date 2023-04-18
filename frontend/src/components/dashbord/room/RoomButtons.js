import React from "react";
import { styled } from "@mui/system";
import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton";
import { useSelector } from "react-redux";

const ButtonContainer = styled("div")({
  width: "100%",
  gap: "3px",
  height: "15%",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#97a0ff8a",
});
const RoomButtons = () => {
  const { localStream, isUserJoinedWithOnlyAudio } = useSelector(
    (store) => store.room
  );
  return (
    <ButtonContainer>
      {!isUserJoinedWithOnlyAudio && <ScreenShareButton />}
      <MicButton localStream={localStream} />
      <CloseRoomButton />
      {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} />}
    </ButtonContainer>
  );
};

export default RoomButtons;
