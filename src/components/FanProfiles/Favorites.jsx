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
  const [activeAccordion, setActiveAccordion] = useState(null);

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

  const handleAccordionToggle = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  /*useEffect(() => {
    // Manually initialize accordion
    const accordionElements = document.querySelectorAll(".accordion-button");
    accordionElements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        const targetId = e.target.getAttribute("data-bs-target");
        const targetElement = document.querySelector(targetId);

        if (targetElement.classList.contains("show")) {
          targetElement.classList.remove("show");
        } else {
          // Close other open accordions first
          document
            .querySelectorAll(".accordion-collapse.show")
            .forEach((el) => {
              if (el !== targetElement) {
                el.classList.remove("show");
              }
            });
          targetElement.classList.add("show");
        }
      });
    });
  }, []);*/

  const renderBandsContent = () =>
    favoriteBands.length > 0 ? (
      favoriteBands.map((b) => (
        <div
          key={b.band.id}
          className="card  border-secondary text-center mb-4"
        >
          <img
            className="card-img-top"
            src={b.band.profilePicture}
            alt={b.band.bandName}
            onClick={() => navigate(`/bands/${b.band.id}`)}
          />
          <div className="card-body">
            <h4 className="card-title mb-4">{b.band.bandName}</h4>
            <button
              className="btn btn-outline-light"
              onClick={() => handleRemoveFavoriteBand(b.id)}
            >
              Unfavorite
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No current favorite bands</p>
    );

  const renderVenuesContent = () =>
    favoriteVenues.length > 0 ? (
      favoriteVenues.map((v) => (
        <div key={v.venue.id} className="card  card-border-secondary mb-4">
          <div className="card-body">
            <h4
              className="card-title mb-5"
              onClick={() => navigate(`/venues/${v.venue.id}`)}
            >
              {v.venue.name}
            </h4>
            <h6 className="card-subtitle mb-5">Capacity: {v.venue.capacity}</h6>
            <button
              className="btn btn-outline-light"
              onClick={() => handleRemoveFavoriteVenue(v.id)}
            >
              Unfavorite
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No current favorite venues</p>
    );

  return (
    <div className="container favorites-container ">
      <h3 className="mb-5">Your favorites:</h3>
      <div className="d-none d-md-flex row">
        <section className="favorite-bands-container text-center col-md-6">
          <h3 className="mb-5">Favorite Bands</h3>
          {renderBandsContent()}
        </section>

        <section className="favorite-venues-container text-center col-md-6">
          <h3 className="mb-5">Favorite Venues</h3>
          {renderVenuesContent()}
        </section>
      </div>
      <div className="accordion d-md-none" id="favoritesAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="bandsHeader">
            <button
              className={`accordion-button ${
                activeAccordion === "bands" ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => handleAccordionToggle("bands")}
              aria-expanded={activeAccordion === "bands" ? "true" : "false"}
              aria-controls="bandsList"
            >
              Favorite Bands
            </button>
          </h2>
          <div
            id="bandsList"
            className={`accordion-collapse collapse ${
              activeAccordion === "bands" ? "show" : ""
            }`}
            aria-labelledby="bandsHeader"
          >
            <div className="accordion-body">{renderBandsContent()}</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="venuesHeader">
            <button
              className={`accordion-button ${
                activeAccordion === "venues" ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => handleAccordionToggle("venues")}
              aria-expanded={activeAccordion === "venues" ? "true" : "false"}
              aria-controls="venuesList"
            >
              Favorite Venues
            </button>
          </h2>
          <div
            id="venuesList"
            className={`accordion-collapse collapse ${
              activeAccordion === "venues" ? "show" : ""
            }`}
            aria-labelledby="venuesHeader"
          >
            <div className="accordion-body">{renderVenuesContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
