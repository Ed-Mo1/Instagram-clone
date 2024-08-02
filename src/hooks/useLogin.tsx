import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../config/fire-base";
import useShowToast from "./useShowToast";
import { collection, doc, getDoc } from "firebase/firestore";
import { UserType } from "../types/userType";
import { useAppDispatch } from "./useRedux";
import { setUSer } from "../store/slices/userSlice";
import { AuthError, UserCredential } from "firebase/auth";
import { LoginInfo } from "../pages/auth/Login";
import { useLocation, useNavigate } from "react-router-dom";

interface Login {
  login: ({ email, password }: LoginInfo) => Promise<void>;
  loading: boolean;
}
const useLogin = (): Login => {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const login = async ({ email, password }: LoginInfo): Promise<void> => {
    if (!email || !password) {
      showToast({
        title: "Error",
        message: "Please provide email and password",
        status: "error",
      });
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(email, password);
      if (!user && error) throw new Error(error.message);
      const colRef = collection(db, "users");
      const docRef = doc(colRef, (user as UserCredential).user.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as UserType;
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUSer(data));
      navigate(location.state?.from.pathname || "/", { replace: true });
      showToast({
        title: "Success",
        message: "Login Successful",
        status: "success",
      });
    } catch (err) {
      showToast({
        title: "Error",
        message: (err as AuthError).message,
        status: "error",
      });
    }
  };
  return { login, loading };
};

export default useLogin;
