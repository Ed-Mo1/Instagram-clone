import { onAuthStateChanged } from "firebase/auth";
import React, { useLayoutEffect } from "react";
import { auth } from "../config/fire-base";
import { setUSer } from "../store/slices/userSlice";
import { UserType } from "../types/userType";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";

const ProtectecRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/Instagram-clone/auth", { replace: true });
      } else {
        dispatch(
          setUSer(
            JSON.parse(localStorage.getItem("user") as string) as UserType
          )
        );
      }
    });

    return () => unsubscribe();
  }, []);
  return children;
};

export default ProtectecRoute;
