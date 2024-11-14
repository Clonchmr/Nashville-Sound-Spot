import { useEffect, useState } from "react";
import { GetAllBands, GetAllGenres } from "../../services/fanServices";
import { useNavigate } from "react-router-dom";

export const AllBands = ({ currentUser }) => {
  const [allBands, setAllBands] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [filteredBands, setFilteredBands] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    GetAllBands().then(setAllBands);
    GetAllGenres().then(setAllGenres);
  }, [currentUser, allBands.length]);

  useEffect(() => {
    GetAllBands().then(setFilteredBands);
  }, []);

  useEffect(() => {
    let foundBand = allBands;

    if (selectedGenre !== "") {
      foundBand = foundBand.filter(
        (band) => band.genre.id === parseInt(selectedGenre)
      );
    }

    if (searchText !== "") {
      foundBand = foundBand.filter((band) =>
        band.bandName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredBands(foundBand);
  }, [searchText, selectedGenre, allBands]);

  const handleBandFilter = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleBandSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="container">
      <form className="search-filter-header">
        <select
          className="form-select"
          id="genre-filter"
          defaultValue=""
          onChange={handleBandFilter}
        >
          <option value="">Filter by genre</option>
          {allGenres.map((genre) => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.type}
              </option>
            );
          })}
        </select>
        <input
          className="form-control"
          id="band-name-search"
          type="text"
          placeholder="Search by band name..."
          onChange={handleBandSearch}
        ></input>
      </form>
      <div className="band-cards-container offset-1">
        {filteredBands.length > 0 ? (
          filteredBands.map((band) => {
            return (
              <div
                key={band.id}
                className="card border-secondary text-center"
                onClick={(e) => {
                  navigate(`/bands/${band.id}`);
                }}
              >
                <img
                  className="card-img-top"
                  src={band.profilePicture}
                  alt={band.bandName}
                />
                <div className="card-body">
                  <h4 className="card-title">{band.bandName}</h4>
                  <h6 className="card-subtitle">{band.genre.type}</h6>
                </div>
              </div>
            );
          })
        ) : (
          <h5>No current bands found</h5>
        )}
      </div>
    </div>
  );
};
