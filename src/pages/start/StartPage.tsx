import "./styles.scss";

import { useNavigate } from "react-router";
import constants from "../../utils/constants";
import Button from "../../components/button/Button";
import { Container } from "@mui/system";
import { Card, CardContent, Stack, Typography } from "@mui/material";

const StartPage = () => {
  const navigate = useNavigate();
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
          className="start_page_layout"
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
            <Stack>
              <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 5, textAlign: "center" }}
              >
                Welcome to {constants.kAppName}!
              </Typography>
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
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default StartPage;
