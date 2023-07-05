import { useDispatch } from "react-redux";
import PiousApis from "../pious_store_apis";
import Cookies from "js-cookie";
import { AppDispatch } from "../store";
import { updateUser } from "../slices/userSlice";
import { updateProducts } from "../slices/productsSlice";
import { updateCart } from "../slices/cartSlice";
import { updateWishlist } from "../slices/wishlistSlice";
import { useNavigate } from "react-router";
import constants from "../constants";

const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logout = (token?: string, shouldShowAlert?: boolean) => {
    PiousApis.logoutUser(token).then((isLogoutSuccessful) => {
      if (isLogoutSuccessful && shouldShowAlert) {
        alert("Successfully logged out");
      }
    });
    Cookies.remove("authdata");
    dispatch(updateUser({}));
    dispatch(updateProducts([]));
    dispatch(updateCart([]));
    dispatch(updateWishlist([]));
    navigate(constants.kHomePage);
  };
  return logout;
};

export default useLogout;
