import { useEffect, useState } from "react";
import { GetAllVenues } from "../../services/venueServices";
import { GetBandsByUser } from "../../services/BandServices";
import { useNavigate, useParams } from "react-router-dom";
import {
  EditShowDetails,
  GetAllShows,
  GetShowById,
} from "../../services/showServices";

export const EditShow = ({ currentUser }) => {
  const [venues, setVenues] = useState([]);
  const [userBands, setUserBands] = useState([]);
  const [showToEdit, setShowToEdit] = useState({});
  const [allShows, setAllShows] = useState([]);

  const { showId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    GetAllVenues().then(setVenues);
    GetAllShows().then(setAllShows);
    GetBandsByUser(currentUser.id).then(setUserBands);
    GetShowById(showId).then(setShowToEdit);
  }, [currentUser, showId]);

  const handleEditShow = (e) => {
    e.preventDefault();
    const showObj = {
      bandId: parseInt(showToEdit.bandId),
      venueId: parseInt(showToEdit.venueId),
      date: showToEdit.date,
    };

    EditShowDetails(showId, showObj)
      .then(GetAllShows())
      .then(setAllShows(allShows))
      .then(navigate("/myshows"));
  };

  return (
    <form>
      <div className="container">
        <h3>Edit your show:</h3>
        <fieldset>
          <label className="form-label">Choose from your bands</label>
          <select
            className="form-select mb-3"
            required
            value={showToEdit.bandId}
            onChange={(e) => {
              const copy = { ...showToEdit };
              copy.bandId = e.target.value;
              setShowToEdit(copy);
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
            value={showToEdit.venueId}
            onChange={(e) => {
              const copy = { ...showToEdit };
              copy.venueId = e.target.value;
              setShowToEdit(copy);
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
          <label className="form-label">Select Date</label>
          <input
            className="form-control mb-5"
            type="date"
            required
            value={showToEdit.date}
            onChange={(e) => {
              const copy = { ...showToEdit };
              copy.date = e.target.value;
              setShowToEdit(copy);
            }}
          ></input>
        </fieldset>
        <fieldset>
          <button className="btn btn-dark" onClick={handleEditShow}>
            Save Changes
          </button>
        </fieldset>
      </div>
    </form>
  );
};
