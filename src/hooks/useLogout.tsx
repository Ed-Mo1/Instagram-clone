import { auth } from "../config/fire-base";
import { useSignOut } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { FirebaseError } from "firebase/app";
import { AuthError } from "firebase/auth";
import { setUSer } from "../store/slices/userSlice";
import { useAppDispatch } from "./useRedux";

interface signout {
  signoutUser: () => Promise<void>;
  loading: boolean;
  error: AuthError | Error | undefined;
}

const useLogout = (): signout => {
  const dispatch = useAppDispatch();
  const [signout, loading, error] = useSignOut(auth);
  const showToast = useShowToast();
  const signoutUser = async (): Promise<void> => {
    try {
      await signout();
      localStorage.removeItem("user");
      dispatch(setUSer(null));
      showToast({
        title: "Success",
        message: "Logged out successfully",
        status: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        message: (error as FirebaseError).name,
        status: "error",
      });
    }
  };
  return { signoutUser, loading, error };
};

export default useLogout;
