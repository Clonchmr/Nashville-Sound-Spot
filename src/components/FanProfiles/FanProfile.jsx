import { useEffect, useState } from "react";
import { GetFanById } from "../../services/fanServices";

export const FanProfile = ({ currentUser }) => {
  const [currentFan, setCurrentFan] = useState({});

  useEffect(() => {
    GetFanById(currentUser.id).then(setCurrentFan);
  }, [currentUser]);
  return (
    <div className="container">
      <div className="card-container row">
        <div className="col-md-5 offset-md-1">
          <div className="card border-secondary text-center">
            <div className="card-body">
              <h4 className="card-title mb-5 mt-5">{currentFan.name}</h4>
              <h6 className="card-subtitle mb-5">Favorite Genres</h6>
              <button className="btn btn-dark">Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="col-md-5 offset-md-1">
          <div className="row">
            <div className="col">
              <div className="card border-secondary text-center mb-5">
                <div className="card-body">
                  <h4 className="card-title">Favorite Bands</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card border-secondary text-center">
                <div className="card-body">
                  <h4 className="card-title">Favorite Venues</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
