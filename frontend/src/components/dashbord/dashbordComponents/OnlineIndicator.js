import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/system";
const OnlineIndicator = () => {
  return (
    <Box
      sx={{
        borderRadius: "50%",
        color: "green",
        position: "absolute",
        right: "5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <FiberManualRecordIcon fontSize="small" />
    </Box>
  );
};

export default OnlineIndicator;
