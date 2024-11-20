import { useEffect, useState } from "react";
import {
  GetFanById,
  GetFanFavoriteGenres,
  GetFavoriteVenuesByUser,
  GetUserBandFavorites,
} from "../../services/fanServices";
import { Link, useNavigate } from "react-router-dom";

export const FanProfile = ({ currentUser }) => {
  const [currentFan, setCurrentFan] = useState({});
  const [favoriteBands, setFavoriteBands] = useState([]);
  const [favoriteVenues, setFavoriteVenues] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    GetFanById(currentUser.id).then(setCurrentFan);
    GetFanFavoriteGenres(currentUser.id).then(setFavoriteGenres);
  }, [currentUser, favoriteGenres.length]);

  useEffect(() => {
    GetUserBandFavorites(currentUser.id).then(setFavoriteBands);
    GetFavoriteVenuesByUser(currentUser.id).then(setFavoriteVenues);
  }, [currentUser, favoriteBands.length, favoriteVenues.length]);

  return (
    <div className="container fan-profile-container">
      <div className="card-container row">
        <div className="col-md-5 offset-md-1">
          <div className="card border-secondary text-center">
            <div className="card-body">
              <h4 className="card-title mb-5 mt-5">{currentFan.name}</h4>
              <h6 className="card-subtitle mb-3">Favorite Genres</h6>
              <ul className="list-unstyled">
                {favoriteGenres.length > 0 ? (
                  favoriteGenres.map((g) => {
                    return (
                      <li key={g.id} className="list-item mb-2">
                        {g.genre.type}
                      </li>
                    );
                  })
                ) : (
                  <li className="list-item">No favorite genres</li>
                )}
              </ul>
              <button
                className="btn btn-outline-light mt-3"
                onClick={() => {
                  navigate(`/myprofile/edit`);
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="fan-favorites-container col-md-5 offset-md-1">
          <div className="row">
            <div className="col">
              <div className="card border-secondary text-center mb-5">
                <h4 className="card-header mb-1">Favorite Bands</h4>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {favoriteBands.length > 0 ? (
                      favoriteBands.map((b) => {
                        return (
                          <li key={b.id} className="list-group-item mb-1">
                            <Link
                              className="link-light link-opacity-75"
                              to={`/bands/${b.band.id}`}
                            >
                              {b.band.bandName}
                            </Link>
                          </li>
                        );
                      })
                    ) : (
                      <li className="list-item list-unstyled">
                        No current favorite bands
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card border-secondary text-center">
                <h4 className="card-header mb-1">Favorite Venues</h4>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {favoriteVenues.length > 0 ? (
                      favoriteVenues.map((v) => {
                        return (
                          <li key={v.id} className="list-group-item mb-1">
                            <Link
                              className="link-light link-opacity-75"
                              to={`/venues/${v.venue.id}`}
                            >
                              {v.venue.name}
                            </Link>
                          </li>
                        );
                      })
                    ) : (
                      <li className="list-item list-unstyled">
                        No current favorite venues
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
