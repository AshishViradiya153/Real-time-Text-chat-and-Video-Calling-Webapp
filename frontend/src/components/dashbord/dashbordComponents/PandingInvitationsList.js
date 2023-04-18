import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import PendingInvitationListItem from "./PendingInvitationListItem";
import { useDispatch, useSelector } from "react-redux";
import { setPandingFriendsInvitations } from "../../../features/user/friendSlice";
import { Typography } from "@mui/material";

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#1c253b",
    borderRadius: "5px",
    outline: "0.5px solid #4892f6",
  },
});

// const DUMMY_INVITATION = [
//   {
//     id: 1,
//     senderId: {
//       userName: "Ashish",
//       mail: "Ashish@gmail.com",
//     },
//   },
//   {
//     id: 1,
//     senderId: {
//       userName: "Chirag",
//       mail: "Chirag@gmail.com",
//     },
//   },
// ];
const PandingInvitationsList = () => {
  const dispatch = useDispatch();
  const { socket, pendingFriendsInvitation } = useSelector(
    (store) => store.friend
  );
  const [friendInvitation, setFriendInvitation] = useState([]);

  useEffect(() => {
    setFriendInvitation(pendingFriendsInvitation);
  }, [pendingFriendsInvitation]);

  useEffect(() => {
    socket?.on("friend-invitations", (data) => {
      const { pendingInvitation } = data;
      // console.log(
      //   "🚀 ~ file: PandingInvitationsList.js:53 ~ socket?.on ~ pendingInvitation",
      //   pendingInvitation
      // );
      dispatch(setPandingFriendsInvitations(pendingInvitation));
    });

    return () => {
      socket?.off("friend-invitations");
    };
  }, [dispatch, socket]);

  return (
    <MainContainer>
      {friendInvitation?.length === 0 ? (
        <Typography
          variant="subtitle"
          style={{ color: "#eff6ff", marginTop: "14px" }}
        >
          no any friend Invitation
        </Typography>
      ) : (
        friendInvitation?.map((invitation, index) => (
          <PendingInvitationListItem
            key={index}
            id={invitation._id}
            userName={invitation.senderId.username}
            mail={invitation.senderId.mail}
          />
        ))
      )}
      {/* {[1].map((invitation, index) => (
        <PendingInvitationListItem
          key={index}
          id={invitation.id}
          userName={invitation.senderId.userName}
          mail={invitation.senderId.mail}
        />
      ))} */}
    </MainContainer>
  );
};

export default PandingInvitationsList;
