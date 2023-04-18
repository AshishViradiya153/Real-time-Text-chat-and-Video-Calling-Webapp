import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import DisplayMessage from "./messengerComponent/DisplayMessage";
import MessengerContent from "./messengerComponent/MessengerContent";

const MainContainer = styled("div")({
  flexGrow: 1,
  height: "calc(100% - 48px)",
  backgroundColor: "#374362",
  marginTop: "48px",
  display: "flex",
});
const Messenger = () => {
  const { chosenChatDetails } = useSelector((store) => store.chat);

  return (
    <MainContainer>
      {!chosenChatDetails ? (
        <DisplayMessage />
      ) : (
        <MessengerContent chosenChatDetails={chosenChatDetails} />
      )}
    </MainContainer>
  );
};

export default Messenger;
