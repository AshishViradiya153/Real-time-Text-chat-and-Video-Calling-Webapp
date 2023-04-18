import InputWithLable from "../components/shared/InputWithLable";
const ForgetPasswordInput = ({ mail, setMail, password, setPassword }) => {
  return (
    <>
      <InputWithLable
        autoFocus={true}
        value={mail}
        setValue={setMail}
        lable="E-mail"
        type="text"
        placeholder="Enter e-mail address"
      />
      <InputWithLable
        value={password}
        setValue={setPassword}
        lable="New Password"
        type="password"
        placeholder="Enter a new password"
      />
    </>
  );
};

export default ForgetPasswordInput;
