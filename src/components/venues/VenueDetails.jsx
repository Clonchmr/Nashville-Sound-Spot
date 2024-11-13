import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetShowsByVenue, GetVenueById } from "../../services/venueServices";
import {
  AddFavoriteVenue,
  GetCurrentFavoriteVenue,
  GetFavoriteVenuesByUser,
  RemoveFavoriteVenue,
} from "../../services/fanServices";

export const VenueDetails = ({ currentUser }) => {
  const [venue, setVenue] = useState({});
  const [userFavorites, setUserFavorites] = useState([]);
  const [currentFavorite, setCurrentFavorite] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [venueShows, setVenueShows] = useState([]);
  const [sortedShows, setSortedShows] = useState([]);

  const { venueId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    GetVenueById(venueId).then(setVenue);
    GetShowsByVenue(venueId).then(setVenueShows);
    setIsFavorite(
      userFavorites?.length > 0 &&
        userFavorites.some((favorite) => favorite.venueId === venue.id)
    );
  }, [venueId, userFavorites, venue.id]);

  useEffect(() => {
    const sortShows = venueShows.toSorted(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setSortedShows(sortShows);
  }, [venueShows]);

  useEffect(() => {
    GetFavoriteVenuesByUser(currentUser.id).then(setUserFavorites);
    GetCurrentFavoriteVenue(venueId).then(setCurrentFavorite);
  }, [currentUser, userFavorites.length, venueId]);

  const handleAddFavorite = () => {
    const venueObj = {
      userId: currentUser.id,
      venueId: parseInt(venueId),
    };
    AddFavoriteVenue(venueObj)
      .then(GetFavoriteVenuesByUser(currentUser.id))
      .then(setUserFavorites)
      .then(navigate("/favorites"));
  };

  const handleRemoveFavorite = () => {
    RemoveFavoriteVenue(currentFavorite[0].id)
      .then(GetFavoriteVenuesByUser(currentUser.id))
      .then(setUserFavorites);
  };
  return (
    <div className="container venue-details-container">
      <div className="card border-secondary mb-4">
        <div className="card-body row">
          <div className="col text-center">
            <h4 className="card-title mb-5 mt-3">{venue.name}</h4>
            <h6 className="card-subtitle mb-5">Capacity: {venue.capacity}</h6>
            {isFavorite ? (
              <button className="btn btn-dark" onClick={handleRemoveFavorite}>
                Remove Favorite
              </button>
            ) : (
              <button className="btn btn-dark" onClick={handleAddFavorite}>
                Add Favorite
              </button>
            )}
          </div>
          <p className="card-text col">{venue.description}</p>
        </div>
      </div>
      <div className="card border-secondary">
        <div className="card-body">
          <h4 className="card-title text-center mb-5" id="shows-card-title">
            Upcoming Shows
          </h4>
          {sortedShows.length > 0 ? (
            <ul className="shows-list list-unstyled row text-center">
              {sortedShows.map((show) => {
                return (
                  <li key={show.id} className="list-item col-12 col-sm-6 mb-4">
                    <span className="italicize">{show.date}</span>{" "}
                    {show.band.bandName}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="card-text text-center">
              No shows currently scheduled
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
