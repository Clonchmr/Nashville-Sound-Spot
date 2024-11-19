import { useEffect, useState } from "react";
import { CancelShow, GetAllShows } from "../../services/showServices";
import { GetBandsByUser } from "../../services/BandServices";
import "../../styles/shows.css";
import { useNavigate } from "react-router-dom";

export const MyShows = ({ currentUser }) => {
  const [allShows, setAllShows] = useState([]); //need to fix rendering issues, still wont show new show until refresh
  const [userBands, setUserBands] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    GetAllShows().then(setAllShows);
    GetBandsByUser(currentUser.id).then(setUserBands);
    GetAllShows().then(setFilteredShows);
  }, [currentUser]);

  useEffect(() => {
    const sortShows = () => {
      const filterByDate = filteredShows.toSorted(
        (firstItem, secondItem) =>
          new Date(firstItem.date) - new Date(secondItem.date)
      );
      setFilteredShows(filterByDate);
    };

    sortShows();
  }, [filteredShows.length]);

  const handleCancelShow = async (showId) => {
    await CancelShow(showId);
    const updatedShows = await GetAllShows();
    setAllShows(updatedShows);
    setFilteredShows(updatedShows);
  };

  const handleFilterBands = (e) => {
    const filteredShowsByBandId = allShows.filter(
      (show) => show.bandId === parseInt(e.target.value)
    );
    if (e.target.value === "") {
      setFilteredShows(allShows);
    } else setFilteredShows(filteredShowsByBandId);
  };

  return (
    <div className="container">
      <h3 className="mb-5 text-shadow">Your upcoming shows:</h3>
      <select
        className="form-select mb-5 show-select"
        onChange={handleFilterBands}
      >
        <option value="">Filter by band</option>
        {userBands.map((band) => {
          return (
            <option key={band.id} value={band.id}>
              {band.bandName}
            </option>
          );
        })}
      </select>

      <div className="shows-container">
        {filteredShows
          .filter((show) => show.band.userId === currentUser.id)
          .map((show) => {
            return (
              <div key={show.id} className="card shows-card">
                <div className="card-body row">
                  <div className="col">
                    <p className="card-text">{show.band.bandName}</p>
                    <p className="card-text">{show.date}</p>
                  </div>
                  <div className="col">
                    <p className="card-text">{show.venue.name}</p>
                    <p className="card-text">{show.venue.capacity} cap.</p>
                  </div>
                  <button
                    className="btn btn-outline-light"
                    onClick={() => {
                      navigate(`/myshows/editshow/${show.id}`);
                    }}
                  >
                    Edit Show
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      handleCancelShow(show.id);
                    }}
                  >
                    Cancel Show
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
