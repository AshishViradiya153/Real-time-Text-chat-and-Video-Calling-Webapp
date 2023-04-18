import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const RedirectTextInfo = styled("span")({
  color: "#00AFF4",
  fontWeight: "500",
  cursor: "pointer",
});
const RedirectInfo = (props) => {
  const { text, redirectText, additionalStyles, redirectHandler } = props;
  return (
    <Typography
      sx={{ color: "#93a0b7" }}
      style={additionalStyles ? additionalStyles : {}}
      variant="subtitle2"
    >
      {text}{" "}
      <RedirectTextInfo onClick={redirectHandler}>
        {redirectText}
      </RedirectTextInfo>
    </Typography>
  );
};

export default RedirectInfo;
