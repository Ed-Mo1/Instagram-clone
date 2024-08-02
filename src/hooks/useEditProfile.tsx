import { useState } from "react";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAppSelector, useAppDispatch } from "./useRedux";
import { UserType } from "../types/userType";
import { db, storage } from "../config/fire-base";
import { setUSer } from "../store/slices/userSlice";

import { EditProfileState } from "../components/profile/EditProfile";
import { useLocation } from "react-router-dom";
import { setProfile } from "../store/slices/profileSlice";
const useEditProfile = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  const { user } = useAppSelector((state) => state.user);
  const showToast = useShowToast();

  const editProfile = async (
    inputs: EditProfileState,
    selectedFile: string | null
  ) => {
    if (isUpdating || !user) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `profilePics/${(user as UserType)?.id}`);
    const userDocRef = doc(db, "users", (user as UserType)?.id);

    const usersColl = collection(db, "users");

    const q = query(usersColl, where("username", "==", inputs.username));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty && querySnapshot.docs[0].id !== (user as UserType)?.id) {
      showToast({
        title: "Error",
        message: "Username already exists",
        status: "error",
      });
      setIsUpdating(false);
      return;
    }

    let URL = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(storageRef);
        URL = await getDownloadURL(
          ref(storage, `profilePics/${(user as UserType)?.id}`)
        );
      }

      const updatedUser = {
        ...user,
        fullName: inputs.fullName || (user as UserType)?.fullName,
        username: inputs.username || (user as UserType)?.username,
        bio: inputs.bio || (user as UserType)?.bio,
        profilePictureUrl: URL || (user as UserType)?.profilePictureUrl,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      const newLocation = location.pathname.replace(
        `/${(user as UserType)?.username}`,
        `/${updatedUser.username}`
      );
      window.history.replaceState({}, "", newLocation);

      dispatch(setProfile(updatedUser));

      dispatch(setUSer(updatedUser));

      showToast({
        title: "Success",
        message: "Profile updated successfully",
        status: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        message: (error as Error).message,
        status: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
