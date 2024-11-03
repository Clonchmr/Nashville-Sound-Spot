import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllGenres } from "../../services/genreServices";
import { GetBandById, UpdateBand } from "../../services/BandServices";

export const EditBand = ({ currentUser }) => {
  const [allGenres, setAllGenres] = useState([]);
  const [bandToEdit, setBandToEdit] = useState({
    bandName: "",
    description: "",
    genreId: "",
    profilePicture: "",
  });

  const { bandId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getAllGenres().then(setAllGenres);
    GetBandById(bandId).then(setBandToEdit);
  }, [bandId]);

  const handleEditBand = (e) => {
    e.preventDefault();
    const bandEdit = {
      userId: currentUser.id,
      bandName: bandToEdit.bandName,
      description: bandToEdit.description,
      genreId: parseInt(bandToEdit.genreId),
      profilePicture: bandToEdit.profilePicture,
    };
    UpdateBand(bandId, bandEdit)
      .then(GetBandById(bandId))
      .then(navigate(`/mybands/${bandId}/details`));
  };
  return (
    <form>
      <div className="container">
        <h3 className="mt-3">Edit band profile:</h3>
        <fieldset className="row">
          <label className="form-label">Band Name</label>
          <input
            type="text"
            required
            className="form-control col mb-3"
            value={bandToEdit.bandName}
            onChange={(e) => {
              const copy = { ...bandToEdit };
              copy.bandName = e.target.value;
              setBandToEdit(copy);
            }}
          />
          <select
            required
            className="form-select col mb-3"
            value={bandToEdit.genreId}
            onChange={(e) => {
              const copy = { ...bandToEdit };
              copy.genreId = e.target.value;
              setBandToEdit(copy);
            }}
          >
            <option value="">Choose Genre</option>
            {allGenres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.type}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset>
          <label className="form-label">Bio</label>
          <textarea
            className="form-control mb-3"
            required
            value={bandToEdit.description}
            onChange={(e) => {
              const copy = { ...bandToEdit };
              copy.description = e.target.value;
              setBandToEdit(copy);
            }}
          />
        </fieldset>

        <fieldset>
          <button className="btn btn-dark" onClick={handleEditBand}>
            Submit Changes
          </button>
        </fieldset>
      </div>
    </form>
  );
};
