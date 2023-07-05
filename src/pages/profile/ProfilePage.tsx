import { useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  getUserDetailsSelector,
} from "../../utils/slices/userSlice";
import { AppDispatch } from "../../utils/store";
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import useLogout from "../../utils/hooks/useLogout";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(getUserDetailsSelector);
  const logout = useLogout();
  useEffect(() => {
    if (!userData.user) {
      if (userData.token && userData.userId) {
        dispatch(
          getUserDetails({ token: userData.token, userId: userData.userId })
        );
      } else {
        alert("Something went wrong, logging you out");
        logout(userData.token);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Card
        sx={{
          minWidth: 275,
          marginX: { xs: 2, sm: 5, md: 25, xl: 30 },
          marginBottom: 2,
          maxHeight: 200,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Stack sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                component="div"
                color="text.primary"
                gutterBottom
              >
                {userData.user?.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  // display: cartItem.product.description ? "-webkit-box" : "none",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {userData.user?.first_name && userData.user.last_name
                  ? `${userData.user?.first_name} ${userData.user.last_name}`
                  : "Name: Unknown"}
              </Typography>
            </Stack>
            {!userData.user?.is_authorized_seller ? (
              <StorefrontIcon color="primary" />
            ) : (
              <LocalMallIcon color="info" />
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
