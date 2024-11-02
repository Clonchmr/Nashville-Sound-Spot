import { Outlet, Route, Routes } from "react-router-dom";
import { BandNav } from "../components/nav/BandNav";
import { MyBands } from "../components/BandProfiles/MyBands";

export const BandViews = () => {
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
      </Route>
    </Routes>
  );
};
