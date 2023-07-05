import "./styles.scss";
import React, { useEffect, useState } from "react";
import PiousApis from "../../../utils/pious_store_apis";
import { useDispatch, useSelector } from "react-redux";
import {
  getTokenSelector,
  updateUserIdAndToken,
} from "../../../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";
import constants from "../../../utils/constants";
import { Container, Paper, Typography } from "@mui/material";
import TextField from "../../../components/text-field/TextField";
import Button from "../../../components/button/Button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
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
  const onLoginPressed = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && password) {
      // login api call here
      console.log(username, password);
      const authData = await PiousApis.loginUser(username, password);
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
        text: "Please enter username and password to continue",
      });
    }
  };

  return (
    <Container>
      <Paper
        className="login_container"
        sx={{
          borderRadius: 2,
        }}
      >
        <form onSubmit={async (e) => await onLoginPressed(e)}>
          <Typography variant="h4" component="h2">
            Login to an existing account
          </Typography>
          <TextField
            size="small"
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            size="small"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
