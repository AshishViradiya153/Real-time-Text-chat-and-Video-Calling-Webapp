import React, { useRef, useEffect } from "react";
import { styled } from "@mui/system";
const MainContainer = styled("div")({
  border: "1px solid #4892f6",
  width: "50%",
  height: "50%",
  backgroundColor: "black",
  borderRadius: "8px",
});
const VideoEl = styled("video")({
  width: "100%",
  height: "100%",
});
const Video = ({ stream, isLocalStream }) => {
  // console.log("🚀 ~ file: Video.js:15 ~ Video ~ isLocalStream", isLocalStream);
  const videoRef = useRef();
  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);
  return (
    <>
      <MainContainer>
        <VideoEl
          ref={videoRef}
          autoPlay={true}
          muted={isLocalStream ? true : false}
        />
      </MainContainer>
    </>
  );
};

export default Video;
