import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { UserType } from "../types/userType";
import { db } from "../config/fire-base";

const useSearchUser = (): {
  loading: boolean;
  user: UserType | null;
  getUser: (username: string) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
} => {
  const [loading, setLoading] = useState<boolean>(false);

  const [user, setUser] = useState<UserType | null>(null);

  const getUser = async (username: string): Promise<void> => {
    setLoading(true);
    try {
      const collRef = collection(db, "users");
      const docRef = query(collRef, where("username", "==", username));
      const docSnap = await getDocs(docRef);

      if (!docSnap.empty) {
        setUser(docSnap.docs[0].data() as UserType);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, user,setUser, getUser };
};

export default useSearchUser;
