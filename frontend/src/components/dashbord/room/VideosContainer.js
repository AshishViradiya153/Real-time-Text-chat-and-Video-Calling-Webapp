import React from "react";
import { styled } from "@mui/system";
import Video from "./Video";
import { useSelector } from "react-redux";
const MainContainer = styled("div")({
  width: "100%",
  height: "85%",
  display: "flex",
  flexWrap: "wrap",
});

const VideosContainer = () => {
  const { localStream, remoteStreams, screenSharingStream } = useSelector(
    (store) => store.room
  );
  console.log(localStream, remoteStreams);
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams?.map((stream) => (
        <Video stream={stream} key={stream?.id} />
      ))}
    </MainContainer>
  );
};

export default VideosContainer;
