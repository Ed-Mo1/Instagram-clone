import  { useCallback, useEffect, useState } from "react";
import { UserType } from "../types/userType";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/fire-base";
import { useAppSelector } from "./useRedux";

const useSuggestedUsers = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [suggestedUsers, setSuggestedUsers] = useState<UserType[]>([]);

  const getSuggestedUsers = useCallback(async () => {
    setLoading(true);
    try {
      const collRef = collection(db, "users");
      const docRef = query(
        collRef,
        where("id", "not-in", [
          (user as UserType).id,
          ...(user as UserType).following.map((user) => user.id),
        ]),
        orderBy("id"),
        limit(5)
      );
      const docSnap = await getDocs(docRef);

      if (!docSnap.empty) {
        setSuggestedUsers(docSnap.docs.map((doc) => doc.data() as UserType));
      } else {
        setSuggestedUsers([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) getSuggestedUsers();
  }, [user, setSuggestedUsers, getSuggestedUsers]);
  return { loading, suggestedUsers };
};

export default useSuggestedUsers;
