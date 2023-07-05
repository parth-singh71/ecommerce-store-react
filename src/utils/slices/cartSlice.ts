import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExtendedProductCart } from "../../models/productCart";
import PiousApis from "../pious_store_apis";
import { RootState } from "../store";

type CartStateType = { cartProducts: ExtendedProductCart[] };

const initialState: CartStateType = {
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<ExtendedProductCart[]>) => {
      state.cartProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.fulfilled, (_state, action) => {
      console.log("added", action.payload);
    }),
      builder.addCase(getAllProductsInCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.cartProducts = action.payload;
        }
      });
  },
});

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (
    params: {
      productId: number;
      authJson: { token: string; userId: number };
      quantity?: number;
    },
    { dispatch }
  ) => {
    const dataJson = await PiousApis.addProductToCart(params.productId, {
      token: params.authJson.token,
      userId: params.authJson.userId,
    });
    dispatch(getAllProductsInCart(params.authJson));
    return dataJson;
  }
);

export const getAllProductsInCart = createAsyncThunk(
  "cart/getAllProductsInCart",
  async (authData: { token: string; userId: number }) => {
    const productCartData = await PiousApis.getAllProductsInCart(
      authData.token,
      authData.userId
    );
    return productCartData;
  }
);

export const { updateCart } = cartSlice.actions;
export const getCartItems = (state: RootState) => state.cart.cartProducts;

export default cartSlice.reducer;
