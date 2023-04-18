import { Box, IconButton } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
const InvitationDesitionButtons = ({
  disabled,
  acceptHandleInvitation,
  rejectHandleInvitation,
}) => {
  return (
    <Box style={{ display: "flex", marginLeft: "20px" }}>
      <IconButton
        style={{ color: "white" }}
        disabled={disabled}
        onClick={acceptHandleInvitation}
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        style={{ color: "white" }}
        disabled={disabled}
        onClick={rejectHandleInvitation}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

export default InvitationDesitionButtons;
