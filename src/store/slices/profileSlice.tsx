import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/userType";
interface UserState {
  profile: UserType | null;
}
export const profileSlice = createSlice({
  initialState: {
    profile: JSON.parse(localStorage.getItem("user") as string) || null,
  } as UserState,
  name: "user",
  reducers: {
    setProfile: (state, action: PayloadAction<UserType | null>): void => {
      state.profile = action.payload;
    },

  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
