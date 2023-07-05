import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PiousApis from "../pious_store_apis";
import { Product } from "../../models/product";
import { RootState } from "../store";

// Define a type for the slice state
type ProductsStateType = {
  allProducts: Product[];
};

// Define the initial state using that type
const initialState: ProductsStateType = {
  allProducts: [],
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (token: string) => {
    const products = await PiousApis.getAllProducts(token);
    return products;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    updateProducts: (state, action: PayloadAction<Product[]>) => {
      state.allProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getProducts.pending, (state, action) => {
      //   // state.status = 'loading'
      // })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      });
    // .addCase(getProducts.rejected, (state, action) => {
    //   //
    // })
  },
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const getProductsSelector = (state: RootState) =>
  state.products.allProducts;
