import { useEffect, useState } from "react";
import {
  GetFavoriteVenuesByUser,
  GetUserBandFavorites,
  RemoveFavoriteBand,
  RemoveFavoriteVenue,
} from "../../services/fanServices";
import { useNavigate } from "react-router-dom";
import "../../styles/Favorites.css";

export const Favorites = ({ currentUser }) => {
  const [favoriteBands, setFavoriteBands] = useState([]);
  const [favoriteVenues, setFavoriteVenues] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    GetUserBandFavorites(currentUser.id).then(setFavoriteBands);
    GetFavoriteVenuesByUser(currentUser.id).then(setFavoriteVenues);
  }, [currentUser, favoriteBands.length, favoriteVenues.length]);

  const handleRemoveFavoriteBand = (favoriteId) => {
    RemoveFavoriteBand(favoriteId)
      .then(GetUserBandFavorites(currentUser.id))
      .then(setFavoriteBands);
  };

  const handleRemoveFavoriteVenue = (favoriteId) => {
    RemoveFavoriteVenue(favoriteId)
      .then(GetFavoriteVenuesByUser(currentUser.id))
      .then(setFavoriteVenues);
  };

  return (
    <div className="container favorites-container ">
      <section className="favorite-bands-container  text-center">
        <h3 className="mb-5">Favorite Bands</h3>
        {favoriteBands.length > 0 ? (
          favoriteBands.map((b) => {
            return (
              <div
                key={b.band.id}
                className="card border-secondary text-center mb-4"
              >
                <img
                  className="card-img-top"
                  src={b.band.profilePicture}
                  alt={b.band.bandName}
                  onClick={(e) => {
                    navigate(`/bands/${b.band.id}`);
                  }}
                />
                <div className="card-body">
                  <h4 className="card-title mb-4">{b.band.bandName}</h4>
                  <button
                    className="btn btn-outline-light"
                    onClick={() => {
                      handleRemoveFavoriteBand(b.id);
                    }}
                  >
                    Unfavorite
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No current favorite bands</p>
        )}
      </section>
      <section className="favorite-venues-container text-center">
        <h3 className="mb-5">Favorite Venues</h3>
        {favoriteVenues.length > 0 ? (
          favoriteVenues.map((v) => {
            return (
              <div key={v.venue.id} className="card card-border-secondary mb-4">
                <div className="card-body">
                  <h4
                    className="card-title mb-5"
                    onClick={() => {
                      navigate(`/venues/${v.venue.id}`);
                    }}
                  >
                    {v.venue.name}
                  </h4>
                  <h6 className="card-subtitle mb-5">
                    Capacity: {v.venue.capacity}
                  </h6>
                  <button
                    className="btn btn-outline-light"
                    onClick={() => {
                      handleRemoveFavoriteVenue(v.id);
                    }}
                  >
                    Unfavorite
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No current favorite venues</p>
        )}
      </section>
    </div>
  );
};
