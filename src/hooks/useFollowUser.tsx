import { useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/fire-base";
import { UserType } from "../types/userType";
import { setUSer } from "../store/slices/userSlice";
import { setProfile } from "../store/slices/profileSlice";
const useFollowUser = (user: UserType) => {
  const dispatch = useAppDispatch();

  const { user: mainUser } = useAppSelector((state) => state.user);
  const { profile: userProfile } = useAppSelector((state) => state.profile);

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const removeUser = async (user: UserType) => {
    const mainUserDocRef = doc(db, "users", (mainUser as UserType).id);
    const currentProfileDocRef = doc(db, "users", user.id);

    await updateDoc(mainUserDocRef, {
      following: (mainUser as UserType).following.filter(
        ({ id }) => id !== (user as UserType).id
      ),
    });
    await updateDoc(currentProfileDocRef, {
      followers: user.followers.filter(
        ({ id }) => id !== (mainUser as UserType).id
      ),
    });

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...mainUser,
        following: (mainUser as UserType).following.filter(
          ({ id }) => id !== (user as UserType).id
        ),
      })
    );
    dispatch(
      setUSer({
        ...(mainUser as UserType),
        following: (mainUser as UserType).following.filter(
          ({ id }) => id !== (user as UserType).id
        ),
      })
    );
    userProfile &&
      dispatch(
        setProfile({
          ...user,
          followers: user.followers.filter(
            ({ id }) => id !== (mainUser as UserType).id
          ),
        })
      );
  };

  const addUser = async (user: UserType) => {
    const mainUserDocRef = doc(db, "users", (mainUser as UserType).id);
    const currentProfileDocRef = doc(db, "users", user.id);

    await updateDoc(mainUserDocRef, {
      following: [...(mainUser as UserType).following, user],
    });
    await updateDoc(currentProfileDocRef, {
      followers: [...user.followers, mainUser],
    });

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...mainUser,
        following: [...(mainUser as UserType).following, user],
      })
    );

    dispatch(
      setUSer({
        ...(mainUser as UserType),
        following: [...(mainUser as UserType).following, user],
      })
    );
    userProfile &&
      dispatch(
        setProfile({
          ...user,
          followers: [...(user as UserType).followers, mainUser as UserType],
        })
      );
  };

  useLayoutEffect(() => {
    const isFound = mainUser?.following.find(({ id }) => id === user.id);
    if (isFound) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [mainUser?.following]);

  const followUser = async (user: UserType) => {
    setLoading(true);
    try {
      isFollowing ? await removeUser(user) : await addUser(user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { isFollowing, loading, followUser };
};

export default useFollowUser;
