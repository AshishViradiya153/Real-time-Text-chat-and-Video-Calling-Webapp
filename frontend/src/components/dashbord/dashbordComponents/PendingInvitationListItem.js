import { Tooltip, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import Avatar from "./Avatar";
import InvitationDesitionButtons from "./InvitationDesitionButtons";
import { useDispatch } from "react-redux";
import {
  acceptFriendInvitation,
  rejectFriendInvitation,
} from "../../../features/user/friendSlice";

const PendingInvitationListItem = ({ id, userName, mail }) => {
  const dispach = useDispatch();
  const [buttonsDisabled] = useState(false);

  const handleAcceptInvitation = () => {
    dispach(acceptFriendInvitation(id));
    // setButtonDisabled(true);
  };
  const handleRejectInvitation = () => {
    dispach(rejectFriendInvitation(id));
    // setButtonDisabled(true);
  };

  return (
    !buttonsDisabled && (
      <Tooltip title={mail} arrow>
        <div style={{ width: "100%" }}>
          <Box
            style={{
              width: "100%",
              height: "40px",
              // border: "1px solid black",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              textTransform: "none",
              color: "black",
              position: "relative",
            }}
          >
            <Avatar userName={userName} />
            <Typography
              style={{
                marginLeft: "10px",
                color: "#a0a5ac",
                fontWeight: "600",
              }}
              variant="subtitle1"
            >
              {userName}
            </Typography>
            {
              <InvitationDesitionButtons
                disabled={buttonsDisabled}
                acceptHandleInvitation={handleAcceptInvitation}
                rejectHandleInvitation={handleRejectInvitation}
              />
            }
          </Box>
        </div>
      </Tooltip>
    )
  );
};

export default PendingInvitationListItem;
