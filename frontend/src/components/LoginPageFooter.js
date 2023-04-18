import React from "react";
import { useNavigate } from "react-router-dom";
import CustomPrimaryButton from "./shared/CustomPrimaryButton";
import RedirectInfo from "../components/shared/RedirectInfo";
import { Tooltip } from "@mui/material";

const formNotValidMessage = () => {
  return "Enter correct email address and password(Between 6 and 12 caracters)";
};

const FormVslidMessage = () => {
  return "Press to log in!";
};

const LoginPageFooter = ({ onClick, isFormValid }) => {
  const navigate = useNavigate();
  const handaleNavigateToRegister = () => {
    navigate("/register");
  };
  const handaleNavigateToForgetPassword = () => {
    navigate("/forgetPass");
  };
  return (
    <>
      <Tooltip
        arrow
        title={!isFormValid ? formNotValidMessage() : FormVslidMessage()}
      >
        <div>
          <CustomPrimaryButton
            lable="log in"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={onClick}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account?"
        redirectText="Creat a new account"
        additionalStyles={{ marginTop: "30px" }}
        redirectHandler={handaleNavigateToRegister}
      />
      <RedirectInfo
        text="Password not remember?"
        redirectText="Click here for change password"
        additionalStyles={{ marginTop: "15px" }}
        redirectHandler={handaleNavigateToForgetPassword}
      />
    </>
  );
};

export default LoginPageFooter;
