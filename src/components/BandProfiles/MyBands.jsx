import { useEffect, useState } from "react";
import { GetBandsByUser } from "../../services/BandServices";
import "../../styles/bands.css";
import { useNavigate } from "react-router-dom";

export const MyBands = ({ currentUser }) => {
  const [userBands, setUserBands] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    GetBandsByUser(currentUser.id).then(setUserBands);
  }, [currentUser]);
  return (
    <>
      <div className="container my-bands-container">
        {Array.isArray(userBands) && userBands.length > 0 ? (
          userBands.map((band) => (
            <div
              key={band.id}
              className="card mb-3 border-secondary text-center my-bands-cards"
              onClick={() => {
                navigate(`/mybands/${band.id}/details`);
              }}
            >
              <img
                className="card-img-top"
                alt={`${band.bandName} profile picture`}
                src={`${band.profilePicture}`}
              />
              <div className="card-body">
                <h5 className="card-title">{band.bandName}</h5>
              </div>
            </div>
          ))
        ) : (
          <p>You have no current bands</p>
        )}
      </div>
      <div>
        <button
          className="btn btn-dark mt-5 mb-5"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create a band
        </button>
      </div>
    </>
  );
};
