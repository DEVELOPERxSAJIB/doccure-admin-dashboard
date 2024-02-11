import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import userSlice from "../features/user/userSlice";
import productSlice from "../features/product/productSlice";

// create store
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// export store
export default store;
