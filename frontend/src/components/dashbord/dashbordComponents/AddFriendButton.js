import React, { useState } from "react";
import CustomPrimaryButton from "../../shared/CustomPrimaryButton";
import AddFriendDialog from "./AddFriendDialog";
const AddFriendButton = ({ setIsOpen }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const additionalStyles = {
    marginTop: "10px",
    width: "100%",
    height: "27px",
    fontSize: "15px",
    color: "",
    backgroundColor: "#e74c3c",
  };

  const addFriendButtonHandler = () => {
    setIsDialogOpen(true);
  };
  const closeAddFriendDialogHandler = () => {
    setIsDialogOpen(false);
  };
  return (
    <div>
      <CustomPrimaryButton
        onClick={addFriendButtonHandler}
        additionalStyles={additionalStyles}
        lable={"Add Friend"}
      />
      <AddFriendDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={closeAddFriendDialogHandler}
      />
    </div>
  );
};

export default AddFriendButton;
