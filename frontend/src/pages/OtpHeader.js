import React from "react";
import Typography from "@mui/material/Typography";

const OtpHeader = () => {
  return (
    <>
      <Typography variant="h5" style={{ color: "#eff6ff" }}>
        Enter your OTP
      </Typography>
      <Typography style={{ color: "#e5f0ff" }}>
        Check your email and use the OTP sent to you.
      </Typography>
    </>
  );
};

export default OtpHeader;
