import { styled } from "@mui/system";
import CreateRoomButton from "./dashbordComponents/CreateRoomButton";
const MainContainer = styled("div")({
  width: "72px",
  height: "calc(100vh - 48px)",
  marginTop: "48px",
  borderRight: "1.5px solid #4892f6",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#1c253b",
});
const Sidebar = () => {
  return (
    <MainContainer>
      <CreateRoomButton />
    </MainContainer>
  );
};

export default Sidebar;
