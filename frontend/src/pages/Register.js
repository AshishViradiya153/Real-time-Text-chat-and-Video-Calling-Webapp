import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterPageFooter from "../components/RegisterPageFooter";
import RegisterPageInput from "../components/RegisterPageInput";
import AuthBox from "../components/shared/AuthBox";
import { validateRegisterForm } from "../components/shared/utils/validate";
import {
  otpSendForRegister,
  registerUser,
  setMailRespDataNull,
  verifyOtp,
} from "../features/user/userSlice";
import OtpHeader from "./OtpHeader";
import OtpInput from "./OtpInput";
import OtpPageFooter from "./OtpPageFooter";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [otp, setOtp] = useState("");
  const { sendMailRespData } = useSelector((store) => store.user);
  console.log(
    "🚀 ~ file: Register.js:18 ~ Register ~ sendMailRespData:",
    sendMailRespData
  );
  useEffect(() => {
    setIsFormValid(validateRegisterForm(username, mail, password));
  }, [username, mail, password, setIsFormValid]);

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   dispatch(registerUser({ username, mail, password }));
  // };

  const handleOtp = () => {
    console.log("1231", otp, emailId, password, mail);
    if (!otp && !emailId) {
      return;
    }
    if (otp && emailId && password && mail) {
      console.log(
        "🚀 ~ file: Register.js:47 ~ handleOtp ~ otp && emailId && password && mail:",
        otp && emailId && password && mail
      );
      dispatch(
        verifyOtp({
          code: otp,
          method_id: emailId,
          password: password,
          email: mail,
        })
      );
      setEmailId("");
      setOtp("");
      setMail("");
      setPassword("");
      dispatch(registerUser({ username, mail, password }));
      dispatch(setMailRespDataNull({}));
      navigate("/login");
    }
  };
  useEffect(() => {
    if (Object.keys(sendMailRespData).length !== 0) {
      setEmailId(sendMailRespData?.email_id);
    }
  }, [sendMailRespData]);
  const handleRegisterOTP = (e) => {
    e.preventDefault();
    dispatch(otpSendForRegister({ username, mail, password }));
  };
  return (
    <AuthBox>
      {emailId === "" ? (
        <>
          <Typography variant="h5" style={{ color: "#eff6ff" }}>
            Create an account
          </Typography>
          <RegisterPageInput
            username={username}
            setUsername={setUsername}
            mail={mail}
            setMail={setMail}
            password={password}
            setPassword={setPassword}
          />
          <RegisterPageFooter
            onClick={handleRegisterOTP}
            isFormValid={isFormValid}
          />
        </>
      ) : (
        <>
          <OtpHeader />
          <OtpInput otp={otp} setOtp={setOtp} />
          <OtpPageFooter onClick={handleOtp} />
        </>
      )}
    </AuthBox>
  );
};

export default Register;
