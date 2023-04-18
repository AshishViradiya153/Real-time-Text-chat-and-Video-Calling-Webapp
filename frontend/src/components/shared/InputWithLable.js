import { styled } from "@mui/system";

const Wrapper = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
});

const Label = styled("p")({
  color: "#e5f0ff",
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "16px",
});

const Input = styled("input")({
  boxSizing: "border-box",
  border: "3px solid #e5f0ff",
  webkitTransition: "0.5s",
  transition: "0.5s",
  outline: "none",
  flexGrow: 1,
  height: "40px",
  boxShadow: " 0 4px 4px 1px rgb(0 0 0 / 20%)",
  // border: "1px solid #e5f0ff",
  borderRadius: "5px",
  color: "#0f2131",
  margin: 0,
  padding: "0 5px",
  fontSize: "16px",
  "&:hover": {
    borderColor: "#0062cc",
  },
  "&:focus": {
    boxShadow: "none",
    borderColor: "#005cbf",
  },
});
const InputWithLable = (props) => {
  const { lable, value, setValue, type, placeholder, autoFocus } = props;

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Wrapper>
      <Label>{lable}</Label>
      <Input
        autoFocus={autoFocus ? autoFocus : ""}
        value={value}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export default InputWithLable;
