import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/product-card/ProductCard";
import "./styles.scss";
import {
  getProducts,
  getProductsSelector,
} from "../../utils/slices/productsSlice.js";
import { getTokenSelector } from "../../utils/slices/tokenSlice.js";
import { AppDispatch } from "../../utils/store.js";
import { useEffect } from "react";
import { Grid } from "@mui/material";

const ShopPage = () => {
  const products = useSelector(getProductsSelector);
  const token = useSelector(getTokenSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getProducts(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container spacing={0}>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </Grid>
   
  );
};

export default ShopPage;
