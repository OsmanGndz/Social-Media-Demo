import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./features/userSlice";
import postSlice from "./features/postSlice";

export const store = configureStore({
  reducer: {
    user: userSlicer,
    post: postSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
