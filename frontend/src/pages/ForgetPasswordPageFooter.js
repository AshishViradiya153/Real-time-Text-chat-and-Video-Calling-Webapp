import { Tooltip } from "@mui/material";
import CustomPrimaryButton from "../components/shared/CustomPrimaryButton";
import RedirectInfo from "../components/shared/RedirectInfo";

const formNotValidMessage = () => {
  return "Enter correct email address and new password(Between 6 and 12 caracters)";
};

const FormVslidMessage = () => {
  return "Press to change password!";
};

const ForgetPasswordPageFooter = ({
  onClick,
  isFormValid,
  handaleNavigateToLogin,
}) => {
  return (
    <>
      <Tooltip
        arrow
        title={!isFormValid ? formNotValidMessage() : FormVslidMessage()}
      >
        <div>
          <CustomPrimaryButton
            lable="Change Password"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={onClick}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Back to login?"
        redirectText="Click here for login"
        additionalStyles={{ marginTop: "30px" }}
        redirectHandler={handaleNavigateToLogin}
      />
    </>
  );
};

export default ForgetPasswordPageFooter;
