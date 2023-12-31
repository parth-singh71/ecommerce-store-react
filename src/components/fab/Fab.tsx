import { Fab as MuiFab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  getUserDetailsSelector,
} from "../../utils/slices/userSlice";
import { useEffect } from "react";
import { AppDispatch } from "../../utils/store";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";
import constants from "../../utils/constants";
import useLogout from "../../utils/hooks/useLogout";

const Fab = ({ currentRoute }: { currentRoute: string }) => {
  const userData = useSelector(getUserDetailsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
    <div>
      {userData.user?.is_authorized_seller &&
      currentRoute != `/${constants.kAddProductPage}` ? (
        <MuiFab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 24, right: 24 }}
          onClick={() => {
            navigate(constants.kAddProductPage);
          }}
        >
          <Add />
        </MuiFab>
      ) : null}
    </div>
  );
};

export default Fab;
