import { Flex, Image, Text } from "@chakra-ui/react";
import googleLogo from "../../../public/google.png";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/fire-base";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { AuthError, UserCredential } from "firebase/auth";
import { UserType } from "../../types/userType";
import { setUSer } from "../../store/slices/userSlice";
import useShowToast from "../../hooks/useShowToast";
import { useAppDispatch } from "../../hooks/useRedux";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const toast = useShowToast();
  const login = async () => {
    try {
      const user = await signInWithGoogle();
      if (!user && error) throw new Error(error.message);

      const collRef = collection(db, "users");

      const userRef = doc(collRef, (user as UserCredential).user.uid);

      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        dispatch(setUSer(docSnap.data() as UserType));
        localStorage.setItem("user", JSON.stringify(docSnap.data()));
        navigate(location.state?.from.pathname || "/Instagram-clone/", { replace: true });
        toast({
          title: "Success",
          message: "Login Successful",
          status: "success",
        });
        return;
      }

      const userData: UserType = {
        id: (user as UserCredential).user.uid,
        username: (user as UserCredential).user.email?.split("@")[0] as string,
        fullName: (user as UserCredential).user.displayName as string,
        email: (user as UserCredential).user.email as string,
        bio: "",
        followers: [],
        following: [],
        posts: [],
        profilePictureUrl: (user as UserCredential).user.photoURL as string,
        createdAt: Date.now(),
      };
      await setDoc(userRef, userData);
      dispatch(setUSer(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      navigate(location.state?.from.pathname || "/Instagram-clone/", { replace: true });
      toast({
        title: "Success",
        message: "Login Successful",
        status: "success",
      });
    } catch (err) {
      toast({
        title: "Error",
        message: (err as AuthError).message,
        status: "error",
      });
    }
  };
  return (
    <Flex
      onClick={login}
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
      my={4}
      cursor={"pointer"}
      w={"100%"}
    >
      <Image src={googleLogo} h={5} alt="logo" cursor={"pointer"} />
      <Text color={"blue.500"} fontSize={14}>
        Continue with Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
