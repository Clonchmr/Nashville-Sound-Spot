import { useEffect, useState } from "react";
import { GetAllVenues } from "../../services/venueServices";
import "../../styles/Venues.css";
import { useNavigate } from "react-router-dom";

export const AllVenues = () => {
  const [allVenues, setAllVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState(allVenues);
  const [searchText, setSearchText] = useState("");
  const [sortMethod, setSortMethod] = useState("name");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      const venues = await GetAllVenues();
      if (sortMethod === "capacity from lower") {
        const sortedVenues = venues.toSorted((a, b) => a.capacity - b.capacity);
        setAllVenues(sortedVenues);
      } else if (sortMethod === "capacity from higher") {
        const sortedVenues = venues.toSorted((a, b) => b.capacity - a.capacity);
        setAllVenues(sortedVenues);
      } else {
        const sortedVenues = venues.toSorted((a, b) =>
          a.name.localeCompare(b.name)
        );
        setAllVenues(sortedVenues);
      }
    };
    fetchVenues();
  }, [sortMethod]);

  useEffect(() => {
    const filteredVenues = allVenues.filter((venue) =>
      venue.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (searchText === "") {
      setFilteredVenues(allVenues);
    } else {
      setFilteredVenues(filteredVenues);
    }
  }, [searchText, allVenues]);
  return (
    <div className="container">
      <form className="venues-header mb-5">
        <div>
          <label htmlFor="venue-search" className="form-label">
            Search venues
          </label>
          <input
            className="form-control"
            id="venue-search"
            type="text"
            placeholder="Search by name..."
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="sort-method" className="form-label">
            Sort by:
          </label>
          <select
            className="form-select"
            id="sort-method"
            onChange={(e) => {
              setSortMethod(e.target.value);
            }}
          >
            <option value="name">Name</option>
            <option value="capacity from lower">Capacity (Ascending)</option>
            <option value="capacity from higher">Capacity (Descending)</option>
          </select>
        </div>
      </form>
      <div className="venues-container">
        {filteredVenues.map((venue) => {
          return (
            <div
              key={venue.id}
              className="card card-border-secondary"
              onClick={() => {
                navigate(`/venues/${venue.id}`);
              }}
            >
              <div className="card-body">
                <h4 className="card-title mb-4">{venue.name}</h4>
                <h6 className="card-subtitle">Capacity: {venue.capacity}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
