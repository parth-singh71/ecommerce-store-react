import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import {
  getAllProductsInWishlist,
  getWishlistItems,
} from "../../utils/slices/wishlistSlice";
import { AppDispatch } from "../../utils/store";
import { getUserDetailsSelector } from "../../utils/slices/userSlice";
import { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { ExtendedProductWishlist } from "../../models/productWishlist";
import WishlistItemCard from "../../components/wishlist-item-card/WishlistItemCard";
import useLogout from "../../utils/hooks/useLogout";

const WishlistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authData = useSelector(getUserDetailsSelector);
  const wishlistItems = useSelector(getWishlistItems);
  const logout = useLogout();
  useEffect(
    () => {
      if (wishlistItems.length == 0) {
        if (authData.token && authData.userId) {
          dispatch(
            getAllProductsInWishlist({
              token: authData.token,
              userId: authData.userId,
            })
          );
        } else {
          alert("Something went wrong, logging you out");
          logout(authData.token);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return wishlistItems.length == 0 ? (
    <Typography>No Items found in cart.</Typography>
  ) : (
    <Wishlist wishlistItems={wishlistItems} />
  );
};

const Wishlist = ({
  wishlistItems,
}: {
  wishlistItems: ExtendedProductWishlist[];
}) => {
  return (
    <Stack spacing={0}>
      {wishlistItems.map((wishlistItem) => {
        return (
          <WishlistItemCard key={wishlistItem.id} wishlistItem={wishlistItem} />
        );
      })}
    </Stack>
  );
};

export default WishlistPage;
