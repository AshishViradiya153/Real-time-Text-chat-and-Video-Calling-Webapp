import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import Avatar from "./Avatar";
import OnlineIndicator from "./OnlineIndicator";
import { setChoosenChatDetails } from "../../../features/chat/chatSlice";
import chatTypes from "../../../utils/types";
const FriendListItem = ({ userName, id, isOnline }) => {
  const dispatch = useDispatch();
  const handleChooseActiveConversation = () => {
    dispatch(
      setChoosenChatDetails({ detail: { id: id, name: userName }, chatTypes })
    );
  };
  return (
    <Button
      onClick={handleChooseActiveConversation}
      style={{
        width: "100%",
        height: "40px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Avatar userName={userName} large={false} />
      <Typography
        style={{ marginLeft: "10px", color: "#e5f0ff", fontWeight: "600" }}
        variant="subtitle1"
      >
        {userName}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

export default FriendListItem;
