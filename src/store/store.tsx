import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import profileSlice from "./slices/profileSlice";
import postsSlice from "./slices/postsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    posts: postsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
