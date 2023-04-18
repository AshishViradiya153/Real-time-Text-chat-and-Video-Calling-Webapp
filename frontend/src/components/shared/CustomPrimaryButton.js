import { Button } from "@mui/material";
import React from "react";

const CustomPrimaryButton = (props) => {
  const { onClick, disabled, additionalStyles, lable } = props;
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDdirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        sx={{
          bgcolor: "#5865F2",
          color: "white",
          fontSize: "16px",
          textTransform: "none",
          fontWeight: 500,
          width: "50%",
          height: "40px",
        }}
        style={additionalStyles ? additionalStyles : {}}
        disabled={disabled}
        onClick={onClick}
      >
        {lable}
      </Button>
    </div>
  );
};

export default CustomPrimaryButton;
