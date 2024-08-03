import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import PageLayout, { PageLayoutSpinner } from "./layout/PageLayout";
import { lazy, Suspense, useLayoutEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/fire-base";
import { setUSer } from "./store/slices/userSlice";
import { useAppDispatch } from "./hooks/useRedux";
import { UserType } from "./types/userType";

const Profile = lazy(() => import("./pages/profile/Profile"));

const Home = lazy(() => import("./pages/home/Home"));

const App = () => {
  const dispatch = useAppDispatch();
  const [user, loading] = useAuthState(auth);
  useLayoutEffect(() => {
    if (user) {
      dispatch(
        setUSer(JSON.parse(localStorage.getItem("user") as string) as UserType)
      );
    }
  }, [loading]);
  return (
    <>
      <Routes>
        <Route
          path="/Instagram-clone/"
          element={
            <Suspense fallback={<PageLayoutSpinner />}>
              <PageLayout />
            </Suspense>
          }
        >
          <Route
            index={true}
            element={
              user ? (
                <Home />
              ) : (
                <Navigate to="/Instagram-clone/auth" replace={true} />
              )
            }
          />
          <Route path=":username" element={<Profile />} />
        </Route>
        <Route
          path="/Instagram-clone/auth"
          element={
            <Suspense fallback={<PageLayoutSpinner />}>
              {!user ? (
                <Auth />
              ) : (
                <Navigate to="/Instagram-clone/" replace={true} />
              )}
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default App;
