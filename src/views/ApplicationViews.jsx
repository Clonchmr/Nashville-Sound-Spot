import { useEffect, useState } from "react";

import "../App.css";
import { BandViews } from "./BandViews";
import { FanViews } from "./FanViews";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localSpotUser = localStorage.getItem("sound_spot_user");
    const spotUserObject = JSON.parse(localSpotUser);

    setCurrentUser(spotUserObject);
  }, []);
  return currentUser.isBand ? (
    <BandViews currentUser={currentUser} />
  ) : (
    <FanViews currentUser={currentUser} />
  );
};
