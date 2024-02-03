import { styled } from "@mui/system";
import ChoosenOptionalLabel from "./appBarComponent/ChoosenOptionalLabel";
import LogOutDropdownMenu from "./appBarComponent/LogOutDropdownMenu";
const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "48px",
  borderBottom: "1.5px solid #4892f6",
  backgroundColor: "#374362",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // padding: "0 15px",
});
const Navbar = () => {
  return (
    <MainContainer>
      <ChoosenOptionalLabel />
      <LogOutDropdownMenu />
    </MainContainer>
  );
};

export default Navbar;
// #4e535c
// #2d4d4f  #355f58
