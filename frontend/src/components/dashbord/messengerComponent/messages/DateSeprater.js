import { styled } from "@mui/system";
const Wrapper = styled("div")({
  height: "0.6px",
  background: "#4892f6",
  position: "relative",
  marginTop: "20px",
  marginBottom: "10px",
});
const DateLable = styled("span")({
  position: "absolute",
  left: "46%",
  top: "-11px",
  color: "#e5f0ff",
  padding: "0 5px",
  background: "#374362",
  fontFamily: "monospace",
});
const DateSeprater = ({ date }) => {
  return (
    <Wrapper>
      <DateLable>{date}</DateLable>
    </Wrapper>
  );
};

export default DateSeprater;
