import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { UserType } from "../types/userType";
import { db } from "../config/fire-base";

const useGetUserProfileById = (userId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserType | null>(null);

  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(db, "users", userId));
        setUserProfile(userRef.data() as UserType);
      } catch (error) {
        showToast({
          title: "Error",
          message: (error as Error).message,
          status: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, []);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
