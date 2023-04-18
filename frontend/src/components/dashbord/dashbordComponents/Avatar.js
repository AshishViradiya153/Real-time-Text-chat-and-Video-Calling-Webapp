import { styled } from "@mui/system";
import React from "react";
const AvatarPriview = styled("div")({
  width: "40px",
  height: "40px",
  borderRadius: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  border: "1.5px solid #ccc",
  fontWeight: "600",
  marginLeft: "4px",
  color: "#e8e8e8",
  backgroundColor: "#231b4c",
});

const Avatar = ({ userName, large }) => {
  return (
    <AvatarPriview
      style={large ? { height: "80px", width: "80px", fontSize: "50px" } : {}}
    >
      {userName.substring(0, 1)}
    </AvatarPriview>
  );
};

export default Avatar;
