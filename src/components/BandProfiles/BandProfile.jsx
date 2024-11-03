import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteBand,
  GetBandById,
  GetBandsByUser,
} from "../../services/BandServices";
import "../../styles/bands.css";

export const BandProfile = ({ currentUser }) => {
  const [currentBand, setCurrentBand] = useState({});

  const navigate = useNavigate();

  const { bandId } = useParams();

  useEffect(() => {
    GetBandById(bandId).then(setCurrentBand);
  }, [bandId]);

  const handleDelete = (e) => {
    DeleteBand(bandId)
      .then(GetBandsByUser(currentUser.id))
      .then(navigate("/mybands"));
  };

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
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigate("edit");
                  }}
                >
                  Edit Profile
                </button>
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
        {currentUser.id === currentBand.userId ? (
          <button
            className="btn btn-secondary mt-5 delete-band-btn"
            onClick={handleDelete}
          >
            Delete Band
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
