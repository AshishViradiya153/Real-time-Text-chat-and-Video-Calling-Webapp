import React from "react";
import { styled } from "@mui/system";
import Sidebar from "../components/dashbord/Sidebar";
import FriendSidebar from "../components/dashbord/FriendSidebar";
import Messenger from "../components/dashbord/Messenger";
import Navbar from "../components/dashbord/Navbar";
import Room from "../components/dashbord/room/Room";
import { useSelector } from "react-redux";
const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  position: "fixed",
});
const Dashbord = () => {
  const { isUserInRoom } = useSelector((store) => store.room);
  return (
    <Wrapper>
      <Sidebar />
      <FriendSidebar />
      <Messenger />
      <Navbar />
      {isUserInRoom && <Room />}
    </Wrapper>
  );
};

export default Dashbord;
