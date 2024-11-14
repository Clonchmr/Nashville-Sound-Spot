import { useEffect, useState } from "react";
import { GetFanById } from "../../services/fanServices";

export const EditFanProfile = ({ currentUser }) => {
  const [currentFan, setCurrentFan] = useState({});

  useEffect(() => {
    GetFanById(currentUser.id).then(setCurrentFan);
  }, [currentUser]);
  return (
    <form>
      <fieldset>
        <label className="form-label" htmlFor="profile-name">
          Edit name:
        </label>
        <input
          className="form-control"
          id="profile-name"
          required
          value={currentFan.name}
        ></input>
      </fieldset>
    </form>
  );
};
