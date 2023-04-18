import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import logo from "../assets/images/main.webp";
const Wrapper = styled("div")({
  backgroundColor: "wight",
  color: "black",
  height: "100vh",
});

// const Nav = styled("nav")({
//   width: "90vh",
//   maxWidth: "1120px",
//   margin: " 0 auto",
//   height: "6rem",
//   display: "flex",
//   alignItems: "center",
// });
// const Logo = styled("img")({
//   width: "261px",
//   height: "163px",
// });

const Container = styled("div")({
  width: "90vw",
  maxWidth: "1120px",
  minHeight: "86vh",
  display: "flex",
  alignItems: "center",
  marginTop: "-3rem",
  margin: "0 auto",
});

const MainImg = styled("img")({
  width: "55%",
  // display: "block",
  objectFit: "cover",
  // display: "none",
});
const Button = styled("button")({
  cursor: "pointer",
  color: "#fff",
  background: "#3b82f6",
  border: "transparent",
  borderRadius: " 0.25rem",
  letterSpacing: "1px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  transition: " 0.3s ease-in-out all",
  textTransform: "capitalize",
  display: "inline-block",
  fontSize: "1.25rem",
  padding: "0.5rem 1.25rem",
  "&:hover": {
    background: "#1d4ed8",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1) 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
});
const Text = styled("p")({
  marginBottom: "12px",
  padding: "0pc 12px 0px 0px",
  color: "#334e68",
});

const landing = () => {
  return (
    <Wrapper>
      <Container>
        <div style={{ width: "700px" }}>
          <h1>
            Real-time online
            <span style={{ color: "#3b82f6", fontWeight: 700 }}>
              video calls with chat
            </span>
            App
          </h1>
          <Text>
            We understands that video calls are invaluable for quick remote
            connections with relatives, office people and freands.Our group
            video calls make it easier for you to connect with up to 4 person
            and collaborate online. Make a Frends and injoy on video call...
          </Text>
          <Link to="/login">
            <Button>Login/Register</Button>
          </Link>
        </div>
        <MainImg src={logo} alt="main jobster hunt" />
      </Container>
    </Wrapper>
  );
};

export default landing;
