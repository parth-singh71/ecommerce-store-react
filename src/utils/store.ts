import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import productsReducer from "./slices/productsSlice";

const rootReducer = combineReducers({
  token: tokenReducer,
  products: productsReducer,
})

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch