import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExtendedProductWishlist } from "../../models/productWishlist";
import { RootState } from "../store";
import PiousApis from "../pious_store_apis";

type wishlistStateType = {
  wishlistProducts: ExtendedProductWishlist[];
};

const initialState: wishlistStateType = {
  wishlistProducts: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    updateWishlist: (
      state,
      action: PayloadAction<ExtendedProductWishlist[]>
    ) => {
      state.wishlistProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToWishlist.fulfilled, (_state, action) => {
      console.log("added", action.payload);
    }),
      builder.addCase(getAllProductsInWishlist.fulfilled, (state, action) => {
        if (action.payload) {
          state.wishlistProducts = action.payload;
        }
      });
  },
});

export const addProductToWishlist = createAsyncThunk(
  "wishlish/addProductToWishlist",
  async (
    params: {
      productId: number;
      authJson: { token: string; userId: number };
    },
    { dispatch }
  ) => {
    const dataJson = await PiousApis.addProductToWishlist(params.productId, {
      token: params.authJson.token,
      userId: params.authJson.userId,
    });
    dispatch(getAllProductsInWishlist(params.authJson));
    return dataJson;
  }
);

export const getAllProductsInWishlist = createAsyncThunk(
  "wishlist/getAllProductsInWishlist",
  async (authData: { token: string; userId: number }) => {
    const productWishlistData = await PiousApis.getAllProductsInWishlist(
      authData.token,
      authData.userId
    );
    return productWishlistData;
  }
);

export const { updateWishlist } = wishlistSlice.actions;
export const getWishlistItems = (state: RootState) => {
  return state.wishlist.wishlistProducts;
};

export default wishlistSlice.reducer;
