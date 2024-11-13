import { Outlet, Route, Routes } from "react-router-dom";
import { FanNav } from "../components/nav/FanNav";
import { Welcome } from "../components/welcome/Welcome";
import { FanProfile } from "../components/FanProfiles/FanProfile";
import { AllBands } from "../components/FanProfiles/AllBands";
import { BandProfile } from "../components/BandProfiles/BandProfile";

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
        <Route path="bands" element={<AllBands currentUser={currentUser} />} />
        <Route
          path="bands/:bandId"
          element={<BandProfile currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
