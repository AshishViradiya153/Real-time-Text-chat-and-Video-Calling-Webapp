import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import LoginPageFooter from "../components/LoginPageFooter";
import LoginPageHeader from "../components/LoginPageHeader";
import LoginPageInpute from "../components/LoginPageInpute";
import AuthBox from "../components/shared/AuthBox";
import { validateLoginForm } from "../components/shared/utils/validate";
import { loginUser } from "../features/user/userSlice";


const Login = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  console.log("🚀 ~ file: Login.js:14 ~ Login ~ user", user);
  
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashbord");
      }, 2000);
    }
  }, [user, navigate]);

  const dispatch = useDispatch();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(validateLoginForm(mail, password));
  }, [password, mail, setFormIsValid]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ password, mail }));
    setMail("");
    setPassword("");
  };

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInpute
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter onClick={handleLogin} isFormValid={isFormValid} />
    </AuthBox>
  );
};

export default Login;
