import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "bootstrap";
import {
  DeleteBand,
  GetBandById,
  GetBandsByUser,
} from "../../services/BandServices";
import "../../styles/bands.css";
import { GetShowsByBandId } from "../../services/showServices";
import {
  AddFavoriteBand,
  GetCurrentFavoriteBand,
  GetUserBandFavorites,
  RemoveFavoriteBand,
} from "../../services/fanServices";

export const BandProfile = ({ currentUser }) => {
  const [currentBand, setCurrentBand] = useState({});
  const [shows, setShows] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentFavorite, setCurrentFavorite] = useState({});
  const modalRef = useRef(null);

  const { bandId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    GetBandById(bandId).then(setCurrentBand);
    GetCurrentFavoriteBand(bandId).then(setCurrentFavorite);
    setIsFavorite(
      userFavorites?.length > 0 &&
        userFavorites.some((favorite) => favorite.bandId === currentBand.id)
    );
  }, [bandId, currentBand.genreId, userFavorites, currentBand.id]);

  useEffect(() => {
    GetUserBandFavorites(currentUser.id).then(setUserFavorites);
  }, [currentUser, userFavorites.length]);

  useEffect(() => {
    GetShowsByBandId(bandId).then(setShows);
  }, [bandId]);

  useEffect(() => {
    const sortShows = () => {
      const filterByDate = shows.toSorted(
        (firstItem, secondItem) =>
          new Date(firstItem.date) - new Date(secondItem.date)
      );
      setShows(filterByDate);
    };

    sortShows();
  }, [shows.length]);

  const handleLaunchModal = () => {
    if (modalRef.current) {
      const modalInstance = new Modal(modalRef.current);
      modalInstance.show();
    }
  };

  const handleDelete = (e) => {
    if (modalRef.current) {
      const modalInstance = Modal.getInstance(modalRef.current);
      if (modalInstance) {
        modalInstance.hide();
      }
    }

    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }

    document.body.classList.remove("modal-open");

    DeleteBand(bandId)
      .then(GetBandsByUser(currentUser.id))
      .then(navigate("/mybands"));
  };

  const handleAddFavorite = () => {
    const bandObj = {
      userId: currentUser.id,
      bandId: parseInt(bandId),
    };
    AddFavoriteBand(bandObj)
      .then(GetUserBandFavorites(currentUser.id))
      .then(setUserFavorites)
      .then(navigate("/favorites"));
  };

  const handleRemoveFavoriteBand = () => {
    RemoveFavoriteBand(currentFavorite[0].id)
      .then(GetUserBandFavorites(currentUser.id))
      .then(setUserFavorites);
  };

  return (
    <div className="container band-profile-container">
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
                  className="btn btn-outline-light"
                  onClick={() => {
                    navigate("edit");
                  }}
                >
                  Edit Profile
                </button>
              ) : isFavorite ? (
                <button
                  className="btn btn-outline-light"
                  onClick={handleRemoveFavoriteBand}
                >
                  Remove from favorites
                </button>
              ) : (
                <button
                  className="btn btn-light border-dark"
                  onClick={handleAddFavorite}
                >
                  Add favorite
                </button>
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
          <div className="band-shows-container">
            <div className="card mt-5">
              <div className="card-body">
                {shows.length > 0 ? (
                  shows.map((show) => {
                    return (
                      <p key={show.id} className="card-text">
                        {show.date} at {show.venue.name}
                      </p>
                    );
                  })
                ) : (
                  <p className="card-text">No shows currently scheduled </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {currentUser.id === currentBand.userId ? (
          <button
            type="button"
            className="btn btn-secondary mt-5 mb-4 delete-band-btn"
            onClick={handleLaunchModal}
          >
            Delete Band
          </button>
        ) : (
          ""
        )}
        <div
          ref={modalRef}
          className="modal fade"
          id="staticBackdrop"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Delete band?
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete your band{" "}
                  {currentBand.bandName}?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
