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
import { Paper, Typography, Container } from "@mui/material";
import TextField from "../../../components/text-field/TextField";
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
      // signup api call here
      console.log(username, email, password);
      const authData = await PiousApis.signupUser(username, email, password);
      if (authData) {
        const { token, user_id } = authData;
        //save to global state
        dispatch(updateUserIdAndToken({ token, userId: user_id }));
        navigate(constants.kHomePage);
      }
    } else {
      //TODO: NOTIFY USER TO ENTER USERNAME OR PASSWORD AND TRY AGAIN
      alert("Please enter username, email and password to continue");
      setErrorData({
        ...errorData,
        shouldShowError: true,
        text: "Please enter username, email and password to continue",
      });
    }
  };

  return (
    <Container>
      <Paper
        className="signup_container"
        sx={{
          borderRadius: 2,
        }}
      >
        <form onSubmit={async (e) => await onSignupPressed(e)}>
          <Typography variant="h4" component="h2">
            Signup to a new account
          </Typography>
          <TextField
            size="small"
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            size="small"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            size="small"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign up</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
