import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/fire-base";
import { UserType } from "../types/userType";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { setProfile } from "../store/slices/profileSlice";
const useProfile = (username: string) => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const [loading, setLoading] = useState<boolean>(false);

  const getUser = async () => {
    setLoading(true);
    try {
      const collRef = collection(db, "users");
      const docRef = query(collRef, where("username", "==", username));
      const docSnap = await getDocs(docRef);

      if (!docSnap.empty) {
        dispatch(setProfile(docSnap.docs[0].data() as UserType));
      } else {
        dispatch(setProfile(null));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, [username]);

  return { profile, loading };
};

export default useProfile;
