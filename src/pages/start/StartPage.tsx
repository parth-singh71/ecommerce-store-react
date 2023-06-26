import "./styles.scss";

import { useNavigate } from "react-router";
import constants from "../../utils/constants";
import Button from "../../components/button/Button";
import { Container } from "@mui/system";
import { Paper } from "@mui/material";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Paper sx={{
          borderRadius: 2,
      }} className="start_page_layout">
        <Button
          className="signup_btn"
          onClick={() => {
            navigate(constants.kSignupPage);
          }}
        >
          Signup to a new account
        </Button>
        <Button
          className="login_btn"
          onClick={() => {
            navigate(constants.kLoginPage);
          }}
        >
          Login to an existing account
        </Button>
      </Paper>
    </Container>
  );
};

export default StartPage;
