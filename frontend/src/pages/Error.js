import React from "react";
import { Link } from "react-router-dom";
import LogoNotFound from "../assets/images/logoNotFound.svg";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
const BoxWrraper = styled("div")({
  width: "100%",
  height: "100vh",
  textAlign: "center",
  display: "flex",
  color: "#2f2f2e",
  alignItems: "center",
  justifyContent: "center",
  background: "#bfdbfe",
});
const Error = () => {
  return (
    <BoxWrraper>
      <Box container spacing={2}>
        <img
          src={LogoNotFound}
          alt=""
          style={{
            width: "90vw",
            maxWidth: "600px",
            display: "block",
            marginBottom: "2rem",
          }}
        />
        <Typography variant="h3">Ohh dreamer! Page Not Found</Typography>
        <Typography variant="subtitle2">
          We can't seem to find the page you are looking for...
        </Typography>
        <Button>
          <Link to="/">Back Home</Link>
        </Button>
      </Box>
    </BoxWrraper>
  );
};

export default Error;
