import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../config/fire-base";
import { UserCredential } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { UserType } from "../types/userType";
import { FirebaseError } from "firebase/app";
import useShowToast from "./useShowToast";
import { useLocation, useNavigate } from "react-router-dom";
import { setUSer } from "../store/slices/userSlice";
import { useAppDispatch } from "./useRedux";

interface SignupProps {
  email: string;
  password: string;
  username: string;
  fullName: string;
  confirmPassword: string;
}

interface Signup {
  signup: (props: SignupProps) => Promise<void>;
  loading: boolean;
}
const useSignupWithEmailAndPassword = (): Signup => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showToast = useShowToast();
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const signup = async ({
    email,
    password,
    username,
    fullName,
    confirmPassword,
  }: SignupProps) => {
    if (!email || !password || !username || !fullName || !confirmPassword) {
      showToast({
        title: "Error",
        message: "Please provide all the fields",
        status: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      showToast({
        title: "Error",
        message: "Passwords do not match",
        status: "error",
      });
      return;
    }

    const usersRef = collection(db, "users");

    const q = query(usersRef, where("username", "==", username));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast({
        title: "Error",
        message: "Username already in use",
        status: "error",
      });
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(email, password);
      if (!user && error) throw new Error(error.message);
      const userRef = doc(db, "users", (user as UserCredential).user.uid);
      const userData: UserType = {
        id: (user as UserCredential).user.uid,
        username,
        fullName,
        email,
        bio: "",
        followers: [],
        following: [],
        posts: [],
        profilePictureUrl: "",
        createdAt: Date.now(),
      };
      await setDoc(userRef, userData);
      dispatch(setUSer(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      navigate(location.state?.from || "/Instagram-clone/", { replace: true });
      showToast({
        title: "Success",
        message: "User created successfully",
        status: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        message: (error as FirebaseError).message,
        status: "error",
      });
    }
  };
  return {
    signup,
    loading,
  };
};

export default useSignupWithEmailAndPassword;
