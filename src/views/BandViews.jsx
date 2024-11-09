import { Outlet, Route, Routes } from "react-router-dom";
import { BandNav } from "../components/nav/BandNav";
import { MyBands } from "../components/BandProfiles/MyBands";
import { CreateBand } from "../components/forms/CreateBand";
import { BandProfile } from "../components/BandProfiles/BandProfile";
import { EditBand } from "../components/forms/EditBands";
import { Welcome } from "../components/welcome/Welcome";
import { CreateShow } from "../components/forms/CreateShow";
import { MyShows } from "../components/shows/MyShows";
import { EditShow } from "../components/forms/EditShow";

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
        <Route index element={<Welcome />} />
        <Route path="mybands" element={<MyBands currentUser={currentUser} />} />
        <Route
          path="Create"
          element={<CreateBand currentUser={currentUser} />}
        />
        <Route
          path="mybands/:bandId/details"
          element={<BandProfile currentUser={currentUser} />}
        />
        <Route
          path="mybands/:bandId/details/edit"
          element={<EditBand currentUser={currentUser} />}
        />
        <Route
          path="addshow"
          element={<CreateShow currentUser={currentUser} />}
        />

        <Route path="myshows" element={<MyShows currentUser={currentUser} />} />
        <Route
          path="myshows/editshow/:showId"
          element={<EditShow currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
