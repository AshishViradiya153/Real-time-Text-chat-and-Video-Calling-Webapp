import { Typography } from "@mui/material";
import React from "react";

const FriendsTitle = ({ title }) => {
  return (
    <Typography
      sx={{
        textTransform: "uppercase",
        color: "#a0a5ac",
        fontSize: "14px",
        marginTop: "8px",
      }}
    >
      {title}
    </Typography>
  );
};

export default FriendsTitle;
