import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/product-card/ProductCard";
import "./styles.scss";
import {
  getAllProducts,
  getProductsSelector,
} from "../../utils/slices/productsSlice.js";
import {
  getTokenSelector,
  getUserDetailsSelector,
} from "../../utils/slices/userSlice.js";
import { AppDispatch } from "../../utils/store.js";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import {
  getAllProductsInWishlist,
  getWishlistItems,
} from "../../utils/slices/wishlistSlice.js";
import { ExtendedProductWishlist } from "../../models/productWishlist.js";

const getWishlistProductIds = (wishlishProducts: ExtendedProductWishlist[]) => {
  // eslint-disable-next-line prefer-const
  let res: number[] = [];
  for (let i = 0; i < wishlishProducts.length; i++) {
    const wishlishProduct = wishlishProducts[i];
    res.push(wishlishProduct.product.id);
  }
  console.log("res is", res);

  return res;
};

const ShopPage = () => {
  const products = useSelector(getProductsSelector);
  const authData = useSelector(getUserDetailsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const wishlishProducts = useSelector(getWishlistItems);
  const [wishlistProductIds, setWishlistProductIds] = useState<number[]>([]);
  useEffect(() => {
    const arr: number[] = getWishlistProductIds(wishlishProducts);
    setWishlistProductIds(arr);
  }, [wishlishProducts]);
  useEffect(() => {
    if (authData.token) {
      dispatch(getAllProducts(authData.token));
    } else {
      //TODO: LOGOUT USER
    }
    if (wishlishProducts.length == 0) {
      if (authData.token && authData.userId) {
        dispatch(
          getAllProductsInWishlist({
            token: authData.token,
            userId: authData.userId,
          })
        );
      } else {
        //TODO: LOGOUT USER
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container spacing={0}>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            wishlisted={wishlistProductIds.includes(product.id)}
            wishlishProducts={wishlishProducts}
          />
        );
      })}
    </Grid>
  );
};

export default ShopPage;
