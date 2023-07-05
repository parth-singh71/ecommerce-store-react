import { Product } from "../../models/product";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsSelector } from "../../utils/slices/userSlice";
import { addProductToCart } from "../../utils/slices/cartSlice";
import { AppDispatch } from "../../utils/store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import {
  addProductToWishlist,
  getAllProductsInWishlist,
} from "../../utils/slices/wishlistSlice";
import { ExtendedProductWishlist } from "../../models/productWishlist";

type ProductCardType = {
  product: Product;
  wishlisted: boolean;
  wishlishProducts: ExtendedProductWishlist[];
};

const ProductCard = ({
  product,
  wishlishProducts,
  wishlisted = false,
}: ProductCardType) => {
  const [liked, setLiked] = useState(wishlisted);
  const dispatch = useDispatch<AppDispatch>();
  const authData = useSelector(getUserDetailsSelector);
  useEffect(() => {
    setLiked(wishlisted);
  }, [wishlisted]);
  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Card
        sx={{
          minWidth: 275,
          marginX: 2,
          marginBottom: 2,
          maxHeight: 200,
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" component="div">
            {product.price} /-
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: product.description ? "-webkit-box" : "none",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              // display: product.description ? "block" : "none",
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={async () => {
              if (authData.token && authData.userId) {
                dispatch(
                  addProductToCart({
                    productId: product.id,
                    authJson: {
                      token: authData.token,
                      userId: authData.userId,
                    },
                  })
                );
                // await PiousApis.addProductToCart(product.id, {token: authData.token, userId: authData.userId});
              }
            }}
          >
            Add to cart
          </Button>
          <IconButton
            size="small"
            onClick={() => {
              if (authData.token && authData.userId) {
                dispatch(
                  addProductToWishlist({
                    productId: product.id,
                    authJson: {
                      token: authData.token,
                      userId: authData.userId,
                    },
                  })
                );
                setLiked(true);
              } else {
                //TODO: LOGOUT USER
              }
            }}
          >
            {liked ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
