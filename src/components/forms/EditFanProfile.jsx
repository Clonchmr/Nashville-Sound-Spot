import { useEffect, useState } from "react";
import {
  GetAllGenres,
  GetFanById,
  GetFanFavoriteGenres,
  RemoveFavoriteGenres,
  SetFavoriteGenres,
  UpdateFan,
} from "../../services/fanServices";
import { useNavigate } from "react-router-dom";
import "../../styles/Fan.css";

export const EditFanProfile = ({ currentUser }) => {
  const [currentFan, setCurrentFan] = useState({ name: "" });
  const [allGenres, setAllGenres] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [favoriteGenreIds, setFavoriteGenreIds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    GetFanById(currentUser.id).then(setCurrentFan);
    GetAllGenres().then(setAllGenres);
  }, [currentUser]);

  useEffect(() => {
    GetFanFavoriteGenres(currentUser.id).then(setFavoriteGenres);
  }, [currentUser]);

  useEffect(() => {
    setFavoriteGenreIds(favoriteGenres.map((fg) => fg.genreId));
  }, [favoriteGenres]);

  const handleGenreChange = (genreId, isChecked) => {
    if (isChecked) {
      setFavoriteGenreIds([...favoriteGenreIds, genreId]);
    } else {
      setFavoriteGenreIds(favoriteGenreIds.filter((id) => id !== genreId));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const genresToAdd = favoriteGenreIds.filter(
      (genreId) => !favoriteGenres.some((fg) => fg.genreId === genreId)
    );

    const genresToRemove = favoriteGenres.filter(
      (fg) => !favoriteGenreIds.includes(fg.genreId)
    );
    await Promise.all(
      genresToAdd.map(async (genreId) => {
        let genreObj = {
          userId: currentUser.id,
          genreId: genreId,
        };
        return SetFavoriteGenres(genreObj);
      })
    );

    await Promise.all(
      genresToRemove.map(async (genre) => {
        return RemoveFavoriteGenres(genre.id);
      })
    );

    await UpdateFan(currentUser.id, currentFan);

    navigate(`/myprofile`);
  };
  return (
    <form className="edit-fan-container">
      <h3>Edit profile information</h3>
      <fieldset className="fan-name-edit">
        <label className="form-label" htmlFor="profile-name">
          Edit name:
        </label>
        <input
          className="form-control mb-5"
          id="profile-name"
          required
          value={currentFan.name}
          onChange={(e) => {
            const copy = { ...currentFan };
            copy.name = e.target.value;
            setCurrentFan(copy);
          }}
        ></input>
      </fieldset>
      <fieldset>
        {
          <div className="container edit-genres-container">
            <label className="form-label">Edit favorite genres:</label>
            <div className=" row row-cols-2 row-cols-md-4 gy-2 genre-choices  mb-5">
              {allGenres.map((g) => {
                return (
                  <div className="col genre-choice" key={g.id}>
                    <div className="form-check">
                      <label htmlFor={g.id} className="form-check-label">
                        <input
                          className="form-check-input mb-2"
                          id={g.id}
                          type="checkbox"
                          name={g.id}
                          value={g.id}
                          checked={favoriteGenreIds.includes(g.id)}
                          onChange={(e) => {
                            handleGenreChange(g.id, e.target.checked);
                          }}
                        />{" "}
                        {g.type}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
      </fieldset>
      <fieldset>
        <button className="btn btn-dark" onClick={handleUpdate}>
          Submit Changes
        </button>
      </fieldset>
    </form>
  );
};
