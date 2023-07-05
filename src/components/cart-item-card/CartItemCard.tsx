import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { ExtendedProductCart } from "../../models/productCart";

type CartItemCardType = { cartItem: ExtendedProductCart };

const CartItemCard = ({ cartItem }: CartItemCardType) => {
  return (
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
              {cartItem.product.name}
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
              Qty: {cartItem.quantity}
            </Typography>
          </Stack>
          <Typography component="div" color="text.secondary">
            {cartItem.product.price} /-
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
