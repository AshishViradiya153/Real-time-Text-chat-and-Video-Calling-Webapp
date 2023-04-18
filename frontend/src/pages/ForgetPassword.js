import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AuthBox from "../components/shared/AuthBox";
import { validateLoginForm } from "../components/shared/utils/validate";
import ForgetPageHeader from "./ForgetPageHeader";
import ForgetPasswordInput from "./ForgetPasswordInpute";
import ForgetPasswordPageFooter from "./ForgetPasswordPageFooter";
import {
  ForgetUserPassword,
  setMailRespDataNull,
} from "../features/user/userSlice";
import { verifyOtp } from "../features/user/userSlice";
import OtpHeader from "./OtpHeader.js";
import OtpInput from "./OtpInput.js";
import OtpPageFooter from "./OtpPageFooter.js";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const { sendMailRespData } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [otp, setOtp] = useState("");
  const [isFormValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (Object.keys(sendMailRespData).length !== 0) {
      setEmailId(sendMailRespData?.email_id);
    }
  }, [sendMailRespData]);

  useEffect(() => {
    setFormIsValid(validateLoginForm(mail, password));
  }, [password, mail, setFormIsValid]);

  const handleForgetPassword = (e) => {
    e.preventDefault();
    dispatch(ForgetUserPassword({ password, mail }));
    toast.success("OTP Successfully sended on your email!");
    // setMail("");
    // setPassword("");
  };
  const handleOtp = () => {
    if (!otp && !emailId) {
      return;
    }
    if (otp && emailId && password && mail) {
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
      dispatch(setMailRespDataNull({}));
      navigate("/login");
    }
  };
  const handaleNavigateToLogin = () => {
    navigate("/login");
  };
  return (
    <AuthBox>
      {emailId === "" ? (
        <>
          <ForgetPageHeader />
          <ForgetPasswordInput
            mail={mail}
            setMail={setMail}
            password={password}
            setPassword={setPassword}
          />
          <ForgetPasswordPageFooter
            onClick={handleForgetPassword}
            isFormValid={isFormValid}
            handaleNavigateToLogin={handaleNavigateToLogin}
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

export default ForgetPassword;
