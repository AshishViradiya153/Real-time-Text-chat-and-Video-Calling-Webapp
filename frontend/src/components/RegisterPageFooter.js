import React from "react";
import { useNavigate } from "react-router-dom";
import CustomPrimaryButton from "./shared/CustomPrimaryButton";
import RedirectInfo from "../components/shared/RedirectInfo";
import { Tooltip } from "@mui/material";

const formNotValidMessage = () => {
  return "Username should contains between 3 and 12 characters and password should contains between 6 and 12 characters. Also enter correct email address.  ";
};

const FormVslidMessage = () => {
  return "Press to register!";
};

const RegisterPageFooter = ({ onClick, isFormValid }) => {
  const navigate = useNavigate();
  const handaleNavigateToRegister = () => {
    navigate("/login");
  };
  return (
    <>
      <Tooltip
        arrow
        title={!isFormValid ? formNotValidMessage() : FormVslidMessage()}
      >
        <div>
          <CustomPrimaryButton
            lable="Send OTP"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={onClick}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="You have already account?"
        redirectText="Click here for login"
        additionalStyles={{ marginTop: "30px" }}
        redirectHandler={handaleNavigateToRegister}
      />
    </>
  );
};

export default RegisterPageFooter;
