import InputWithLable from "./shared/InputWithLable";
const LoginPageInpute = ({ mail, setMail, password, setPassword }) => {
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
        lable="password"
        type="password"
        placeholder="Enter password"
      />
    </>
  );
};

export default LoginPageInpute;
