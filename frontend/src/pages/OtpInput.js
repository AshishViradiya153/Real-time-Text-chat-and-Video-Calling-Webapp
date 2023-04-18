import InputWithLable from "../components/shared/InputWithLable";
const OtpInput = ({ otp, setOtp }) => {
  return (
    <>
      <InputWithLable
        autoFocus={true}
        value={otp}
        setValue={setOtp}
        lable="Your OTP"
        type="number"
        placeholder="Enter OTP"
      />
    </>
  );
};

export default OtpInput;
