import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import FriendListItem from "./FriendListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setFriendsList,
  setOnlineUsers,
} from "../../../features/user/friendSlice";
import { Typography } from "@mui/material";
const MainContainer = styled("div")({
  flexGrow: "1",
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  scroll: "none",
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

const FriendList = () => {
  const [friend, setFriend] = useState([]);
  const dispatch = useDispatch();
  const { friends, onlineUser, socket } = useSelector((store) => store.friend);
  useEffect(() => {
    socket?.on("user-friends-list", (data) => {
      const { friends } = data;
      // console.log("====>>>>>> friends", friends);
      dispatch(setFriendsList(friends));
    });

    socket?.on("online-users", (data) => {
      const { onlineUsers } = data;
      // console.log("=====>>>>>>onlineUsers", onlineUsers);
      dispatch(setOnlineUsers(onlineUsers));
    });

    return () => {
      socket?.off("user-friends-list");
      socket?.off("online-users");
    };
  }, [dispatch, socket]);

  useEffect(() => {
    let friendArray = [];
    // console.log("friends", friends);
    friends.forEach((fri) => {
      const isUserOnline = onlineUser.find((user) => user.userId === fri.id);
      friendArray.push({ ...fri, isOnline: isUserOnline ? true : false });
    });
    setFriend(friendArray);
  }, [friends, onlineUser]);

  return (
    <MainContainer>
      {friend?.length === 0 ? (
        <Typography
          variant="subtitle"
          style={{ color: "#eff6ff", marginTop: "14px" }}
        >
          You have no friends.😔
        </Typography>
      ) : (
        friend.map((item, index) => (
          <FriendListItem
            userName={item.username}
            id={item.id}
            isOnline={item?.isOnline}
            key={index}
          />
        ))
      )}
    </MainContainer>
  );
};

export default FriendList;
