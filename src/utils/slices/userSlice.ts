import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import PiousApis from "../pious_store_apis";

type userStateType = {
  token?: string;
  userId?: number;
  user?: User;
};

const initialState: userStateType = {};

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async ({ token, userId }: { token: string; userId: number }) => {
    const user = await PiousApis.getUserDetails(token, userId);
    return user;
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUserIdAndToken: (
      state,
      action: PayloadAction<{ token?: string; userId?: number }>
    ) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    updateUser: (state, action: PayloadAction<userStateType>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { updateUserIdAndToken, updateUser } = UserSlice.actions;
export default UserSlice.reducer;

export const getTokenSelector = (state: { user: userStateType }) =>
  state.user.token;
export const getUserIdSelector = (state: { user: userStateType }) =>
  state.user.userId;
export const getUserSelector = (state: { user: userStateType }) =>
  state.user.user;
export const getUserDetailsSelector = (state: { user: userStateType }) =>
  state.user;
