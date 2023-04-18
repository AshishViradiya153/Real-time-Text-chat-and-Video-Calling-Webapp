import { Tooltip } from "@mui/material";
import CustomPrimaryButton from "../components/shared/CustomPrimaryButton";
const Message = () => {
  return "Enter OTP and click here";
};
const OtpPageFooter = ({ onClick }) => {
  return (
    <>
      <Tooltip arrow title={Message()}>
        <CustomPrimaryButton
          lable="VERIFY OTP"
          additionalStyles={{ marginTop: "30px" }}
          onClick={onClick}
        />
      </Tooltip>
    </>
  );
};

export default OtpPageFooter;
