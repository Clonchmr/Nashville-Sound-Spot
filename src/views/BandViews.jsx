import { Outlet, Route, Routes } from "react-router-dom";
import { BandNav } from "../components/nav/BandNav";
import { MyBands } from "../components/BandProfiles/MyBands";
import { CreateBand } from "../components/forms/CreateBand";

export const BandViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <BandNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<MyBands />} />
        <Route
          path="Create"
          element={<CreateBand currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
