import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetBandById } from "../../services/BandServices";

export const BandProfile = ({ currentUser }) => {
  const [currentBand, setCurrentBand] = useState({});

  const { bandId } = useParams();

  useEffect(() => {
    GetBandById(bandId).then(setCurrentBand);
  }, [bandId]);

  return (
    <div className="container">
      <div className="card-container row">
        <div className="col-md-5 offset-md-1">
          <div className="card border-secondary text-center">
            <img
              src={currentBand.profilePicture}
              alt={currentBand.bandName}
              className="card-img-top"
            />
            <div className="card-body">
              <h4 className="card-title mb-5">{currentBand.bandName}</h4>
              <h6 className="card-subtitle mb-5 text-body-secondary">
                {currentBand.genre?.type}
              </h6>
              {currentUser.id === currentBand.userId ? (
                <button className="btn btn-secondary">Edit Profile</button>
              ) : (
                " "
              )}
            </div>
          </div>
        </div>
        <div className="band-info-container col-md-5 offset-md-1">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Bio:</h4>
              <p className="card-text">{currentBand.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
