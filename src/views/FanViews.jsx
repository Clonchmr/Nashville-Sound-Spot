import { Outlet, Route, Routes } from "react-router-dom";
import { FanNav } from "../components/nav/FanNav";
import { Welcome } from "../components/welcome/Welcome";
import { FanProfile } from "../components/FanProfiles/FanProfile";
import { AllBands } from "../components/FanProfiles/AllBands";
import { BandProfile } from "../components/BandProfiles/BandProfile";
import { AllVenues } from "../components/venues/AllVenues";
import { VenueDetails } from "../components/venues/VenueDetails";

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
        <Route path="venues" element={<AllVenues />} />
        <Route
          path="venues/:venueId"
          element={<VenueDetails currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
