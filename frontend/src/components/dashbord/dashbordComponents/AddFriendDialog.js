import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomPrimaryButton from "../../shared/CustomPrimaryButton";
import InputWithLable from "../../shared/InputWithLable";
import { validMail } from "../../shared/utils/validate";
import { useDispatch } from "react-redux";
import { sendFriendInvitation } from "../../../features/user/friendSlice";

const AddFriendDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const [requestMail, setRequestMail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    closeDialogHandler();
    setRequestMail("");
  };

  const sendFriendInvitationHandler = (e) => {
    e.preventDefault();
    dispatch(sendFriendInvitation({ requestMail, handleCloseDialog }));
    setRequestMail("");
  };

  useEffect(() => {
    setIsFormValid(validMail(requestMail));
  }, [requestMail, setIsFormValid]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <div style={{ backgroundColor: "#334e68" }}>
          <DialogTitle style={{ color: "rgb(239, 246, 255)" }}>
            <span style={{ fontSize: "30px" }}>i</span>nvite{" "}
            <span style={{ fontSize: "30px" }}>y</span>our{" "}
            <span style={{ fontSize: "30px" }}>f</span>riend
          </DialogTitle>
          <DialogContent style={{ paddingBottom: "10px" }}>
            <DialogContentText style={{ color: "#e5f0ff" }}>
              Enter a e-mail address of your friend which you would like to
              invite 🫶
            </DialogContentText>
            <InputWithLable
              lable="E-mail"
              value={requestMail}
              setValue={setRequestMail}
              type="text"
              placeholder="Enter here your friend mail address"
            />
          </DialogContent>
          <DialogActions style={{ marginBottom: "0.8rem" }}>
            {isFormValid ? (
              <CustomPrimaryButton
                onClick={sendFriendInvitationHandler}
                disabled={!isFormValid}
                lable={"SEND"}
              />
            ) : (
              ""
            )}
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default AddFriendDialog;
