import { Outlet, Route, Routes } from "react-router-dom";
import { FanNav } from "../components/nav/FanNav";
import { Welcome } from "../components/welcome/Welcome";
import { FanProfile } from "../components/FanProfiles/FanProfile";

export const FanViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <FanNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route
          path="myprofile"
          element={<FanProfile currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
