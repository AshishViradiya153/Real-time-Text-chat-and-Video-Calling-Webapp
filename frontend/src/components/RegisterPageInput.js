import React from "react";
import InputWithLable from "./shared/InputWithLable";
const RegisterPageInput = ({
  username,
  setUsername,
  mail,
  setMail,
  password,
  setPassword,
}) => {
  return (
    <>
      <InputWithLable
        autoFocus={true}
        value={username}
        setValue={setUsername}
        lable="User-name"
        type="text"
        placeholder="Enter your pretty name"
      />
      <InputWithLable
        value={mail}
        setValue={setMail}
        lable="E-mail"
        type="text"
        placeholder="Enter e-mail address"
      />
      <InputWithLable
        value={password}
        setValue={setPassword}
        lable="password"
        type="password"
        placeholder="Enter password"
      />
    </>
  );
};

export default RegisterPageInput;
