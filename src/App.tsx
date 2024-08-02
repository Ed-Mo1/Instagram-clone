import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import PageLayout from "./layout/PageLayout";
import Profile from "./pages/profile/Profile";
import ProtectecRoute from "./components/ProtectecRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/Instagram-clone/" element={<PageLayout />}>
          <Route
            index={true}
            element={
              <ProtectecRoute>
                <Home />
              </ProtectecRoute>
            }
          />
          <Route path=":username" element={<Profile />} />
        </Route>
        <Route path="/Instagram-clone/auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
