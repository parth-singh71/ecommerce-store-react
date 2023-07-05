import { useEffect, useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../utils/store";
import {
  getAllProductsInCart,
  getCartItems,
} from "../../utils/slices/cartSlice";
import { getUserDetailsSelector } from "../../utils/slices/userSlice";
import CartItemCard from "../../components/cart-item-card/CartItemCard";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { ExtendedProductCart } from "../../models/productCart";

const getTotalPrice = (cartItems: ExtendedProductCart[]) => {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    total += cartItem.product.price * cartItem.quantity;
  }
  return total;
};

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authData = useSelector(getUserDetailsSelector);
  const cartItems = useSelector(getCartItems);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const total = getTotalPrice(cartItems);
    setTotalPrice(total);
  }, [cartItems]);
  useEffect(() => {
    if (cartItems.length == 0) {
      if (authData.token && authData.userId) {
        dispatch(
          getAllProductsInCart({
            token: authData.token,
            userId: authData.userId,
          })
        );
      } else {
        alert("something went wrong cartpage");
        //TODO: LOGOUT USER
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return cartItems.length == 0 ? (
    <Typography>No Items found in cart.</Typography>
  ) : (
    <>
      <Cart cartItems={cartItems} />
      <Card
        sx={{
          minWidth: 275,
          marginX: { xs: 2, sm: 5, md: 25, xl: 30 },
          marginBottom: 2,
          maxHeight: 200,
        }}
      >
        <CardContent
          sx={{
            padding: 2,
            "&:last-child": {
              paddingBottom: 2,
            },
          }}
        >
          <Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                pb: 2,
              }}
            >
              <Typography
                sx={{ flex: 1 }}
                variant="body2"
                component="div"
                color="text.primary"
              >
                Total
              </Typography>
              <Typography component="div" color="text.secondary">
                {totalPrice} /-
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                px: { xs: 2, sm: 5, md: 5, lg: 10, xl: 15 },
                alignSelf: "center",
              }}
              onClick={() => {
                console.log("take to payment page");
              }}
            >
              Continue to payment
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

const Cart = ({ cartItems }: { cartItems: ExtendedProductCart[] }) => {
  return (
    <Stack spacing={0}>
      {cartItems.map((cartItem) => {
        return <CartItemCard key={cartItem.id} cartItem={cartItem} />;
      })}
    </Stack>
  );
};

export default CartPage;
