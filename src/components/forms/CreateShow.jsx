import { useEffect, useState } from "react";
import { GetAllVenues } from "../../services/venueServices";
import { GetBandsByUser } from "../../services/BandServices";
import { CreateNewShow, GetAllShows } from "../../services/showServices";
import { useNavigate } from "react-router-dom";

export const CreateShow = ({ currentUser }) => {
  const [venues, setVenues] = useState([]);
  const [userBands, setUserBands] = useState([]);
  const [show, setShow] = useState({});
  const [allShows, setAllShows] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    GetAllVenues().then(setVenues);
    GetBandsByUser(currentUser.id).then(setUserBands);
  }, [setVenues, currentUser]);

  const handleBookShow = (e) => {
    e.preventDefault();
    const showObj = {
      bandId: parseInt(show.bandId),
      venueId: parseInt(show.venueId),
      date: show.date,
    };

    CreateNewShow(showObj)
      .then(GetAllShows())
      .then(setAllShows)
      .then(navigate("/myshows"));
  };
  return (
    <form>
      <div className="container">
        <h3 className="">Schedule a show:</h3>
        <fieldset>
          <label className="form-label">Choose from your bands</label>
          <select
            className="form-select mb-3"
            required
            onChange={(e) => {
              const copy = { ...show };
              copy.bandId = e.target.value;
              setShow(copy);
            }}
          >
            <option value="">Choose a band</option>
            {userBands.map((band) => {
              return (
                <option key={band.id} value={band.id}>
                  {band.bandName}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset>
          <label className="form-label">Select Venue</label>
          <select
            className="form-select mb-3"
            required
            onChange={(e) => {
              const copy = { ...show };
              copy.venueId = e.target.value;
              setShow(copy);
            }}
          >
            <option value="">Choose a venue</option>
            {venues.map((venue) => {
              return (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset>
          <label className="form-label ">Select Date</label>
          <input
            className="form-control mb-5"
            type="date"
            required
            onChange={(e) => {
              const copy = { ...show };
              copy.date = e.target.value;
              setShow(copy);
            }}
          ></input>
        </fieldset>
        <fieldset>
          <button className="btn btn-dark" onClick={handleBookShow}>
            Book
          </button>
        </fieldset>
      </div>
    </form>
  );
};
