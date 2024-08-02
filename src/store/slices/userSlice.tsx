import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/userType";
import { PostType } from "../../types/postType";

interface UserState {
  user: UserType | null;
}
export const userSlice = createSlice({
  initialState: {
    user: JSON.parse(localStorage.getItem("user") as string) || null,
  } as UserState,
  name: "user",
  reducers: {
    setUSer: (state, action: PayloadAction<UserType | null>): void => {
      state.user = action.payload;
    },

    addUserPost: (state, action: PayloadAction<PostType>): void => {
      state.user = {
        ...state.user,
        posts: [...(state.user?.posts as PostType[]), action.payload],
      } as UserType;
    },
    deleteUserPost: (state, action: PayloadAction<string>): void => {
      state.user = {
        ...state.user,
        posts: (state.user?.posts as PostType[]).filter(
          ({ id }) => id !== action.payload
        ),
      } as UserType;
    },
  },
});

export const { setUSer, addUserPost, deleteUserPost } = userSlice.actions;
export default userSlice.reducer;
