import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: null,
  },
  reducers: {
    updateToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateToken } = tokenSlice.actions;
export default tokenSlice.reducer;

export const getTokenSelector = (state: { token: { value: string } }) =>
  state.token.value;
