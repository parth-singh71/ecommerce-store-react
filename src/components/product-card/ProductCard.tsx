import { Product } from "../../models/product";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const ProductCard = ({
  key,
  product,
}: {
  key: string | number;
  product: Product;
}) => {
  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Card sx={{ minWidth: 275, marginX: 2, marginTop: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" component="div">
            {product.price} /-
          </Typography>
          <Typography variant="body2">{product.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart</Button>
        </CardActions>
      </Card>
    </Grid>
  );
  //   (<div key={key}>
  //     <h4>{product.name}</h4>
  //     <p>{product.description}</p>
  //   </div>);
};

export default ProductCard;
