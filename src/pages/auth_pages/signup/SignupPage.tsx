import "./styles.scss";
import { useEffect, useState } from "react";
import PiousApis from "../../../utils/pious_store_apis";
import { useDispatch, useSelector } from "react-redux";
import {
  getTokenSelector,
  updateUserIdAndToken,
} from "../../../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";
import constants from "../../../utils/constants";
import {
  Paper,
  Typography,
  Container,
  Card,
  Stack,
  CardContent,
  TextField,
} from "@mui/material";
import Button from "../../../components/button/Button";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorData, setErrorData] = useState({
    shouldShowError: false,
    text: "",
  });
  const dispatch = useDispatch();
  const token = useSelector(getTokenSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate(constants.kHomePage);
    }
  });
  const onSignupPressed = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && email && password) {
      const authData = await PiousApis.signupUser(username, email, password);
      if (authData) {
        const { token, user_id } = authData;
        //save to global state
        dispatch(updateUserIdAndToken({ token, userId: user_id }));
        navigate(constants.kHomePage);
      }
    } else {
      alert("Please enter username, email and password to continue");
      setErrorData({
        ...errorData,
        shouldShowError: true,
        text: "Please enter username, email and password to continue",
      });
    }
  };

  return (
    <Container
      sx={{
        position: "fixed",
        height: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Stack
        sx={{
          height: 1,
        }}
      >
        <Card
          className="signup_container"
          sx={{
            height: "min-content",
            my: "auto",
            minWidth: 275,
            borderRadius: 2,
            mx: { xs: 2, sm: 5, md: 25, xl: 30 },
          }}
        >
          <CardContent
            sx={{
              py: 5,
              px: 5,
              "&:last-child": {
                pb: 5,
              },
            }}
          >
            <form onSubmit={async (e) => await onSignupPressed(e)}>
              <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 5, textAlign: "center" }}
              >
                Signup to a new account
              </Typography>
              <Stack>
                <TextField
                  label="Username"
                  placeholder="Username"
                  variant="outlined"
                  size="small"
                  type="text"
                  sx={{ mb: 2 }}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Email"
                  placeholder="Email"
                  variant="outlined"
                  size="small"
                  type="email"
                  sx={{ mb: 2 }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  placeholder="Password"
                  variant="outlined"
                  size="small"
                  type="password"
                  sx={{ mb: 2 }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Stack>
              <Button type="submit">Sign up</Button>
            </form>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default SignupPage;
