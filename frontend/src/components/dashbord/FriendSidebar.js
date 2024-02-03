import { styled } from "@mui/system";
import AddFriendButton from "./dashbordComponents/AddFriendButton";
import FriendList from "./dashbordComponents/FriendList";
import FriendsTitle from "./dashbordComponents/FriendsTitle";
import PandingInvitationsList from "./dashbordComponents/PandingInvitationsList";
const MainContainer = styled("div")({
  width: "224px",
  borderRight: "1.5px solid #4892f6",
  //   borderRight: "1.5px solid black",
  height: "calc(100vh - 48px)",
  marginTop: "48px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#303754",
});
const FriendSidebar = () => {
  return (
    <MainContainer>
      <AddFriendButton />
      <FriendsTitle title={"Private Message"} />
      <FriendList />
      <FriendsTitle title={"Invitation"} />
      <PandingInvitationsList />
    </MainContainer>
  );
};

export default FriendSidebar;
