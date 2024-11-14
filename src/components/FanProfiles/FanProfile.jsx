import { useEffect, useState } from "react";
import {
  GetFanById,
  GetFavoriteVenuesByUser,
  GetUserBandFavorites,
} from "../../services/fanServices";

export const FanProfile = ({ currentUser }) => {
  const [currentFan, setCurrentFan] = useState({});
  const [favoriteBands, setFavoriteBands] = useState([]);
  const [favoriteVenues, setFavoriteVenues] = useState([]);

  useEffect(() => {
    GetFanById(currentUser.id).then(setCurrentFan);
  }, [currentUser]);

  useEffect(() => {
    GetUserBandFavorites(currentUser.id).then(setFavoriteBands);
    GetFavoriteVenuesByUser(currentUser.id).then(setFavoriteVenues);
  }, [currentUser, favoriteBands.length, favoriteVenues.length]);

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
                <h4 className="card-header mb-1">Favorite Bands</h4>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {favoriteBands.length > 0 ? (
                      favoriteBands.map((b) => {
                        return (
                          <li key={b.id} className="list-group-item mb-1">
                            {b.band.bandName}
                          </li>
                        );
                      })
                    ) : (
                      <li className="list-item">No current favorite bands</li>
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
                            {v.venue.name}
                          </li>
                        );
                      })
                    ) : (
                      <li className="list-item">No current favorite venues</li>
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
