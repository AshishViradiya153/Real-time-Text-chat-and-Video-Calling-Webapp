import React from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/system";
const BoxWrraper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#e5f0ff",
});
const AuthBox = (props) => {
  return (
    <BoxWrraper>
      <Box
        sx={{
          width: 700,
          height: "auto",
          background: "#334e68",
          boxShadow: "0 4px 6px 1px rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          padding: "25px",
        }}
      >
        {props.children}
      </Box>
    </BoxWrraper>
  );
};

export default AuthBox;
