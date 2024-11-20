import { useEffect, useState } from "react";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userServices";
import { GetAllGenres, SetFavoriteGenres } from "../../services/fanServices";

export const Register = (props) => {
  const [fan, setFan] = useState({
    email: "",
    name: "",
    isBand: false,
  });
  const [bandChecked, setBandChecked] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    GetAllGenres().then(setGenres);
  }, []);

  const registerNewUser = async () => {
    const createdUser = await createUser(fan);

    if (createdUser.hasOwnProperty("id")) {
      // Store user in localStorage
      localStorage.setItem(
        "sound_spot_user",
        JSON.stringify({
          id: createdUser.id,
          isBand: createdUser.isBand,
        })
      );
      if (!bandChecked) {
        for (let genreId of selectedGenres) {
          const genreObj = {
            userId: createdUser.id,
            genreId: genreId,
          };
          await SetFavoriteGenres(genreObj);
        }
      }

      navigate("/");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(fan.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateFan = (evt) => {
    const copy = { ...fan };
    copy[evt.target.id] = evt.target.value;
    setFan(copy);
  };

  const handleGenreChoice = (genreId, isChecked) => {
    if (isChecked) {
      setSelectedGenres([...selectedGenres, genreId]);
    } else {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    }
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1
          className="register-h1 mt-5 mb-5 text-shadow"
          onClick={() => {
            navigate("/login");
          }}
        >
          Nashville Sound Spot
        </h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateFan}
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateFan}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>
              <input
                onChange={(evt) => {
                  const copy = { ...fan };
                  copy.isBand = evt.target.checked;
                  setFan(copy);
                  setBandChecked(evt.target.checked);
                }}
                type="checkbox"
                id="isBand"
                className="mb-5 text-shadow"
              />
              I am a band{" "}
            </label>
          </div>
        </fieldset>
        <fieldset>
          {!bandChecked && (
            <div className="container">
              <label className="form-label mb-4 text-shadow">
                Choose your favorite genres.{" "}
                <span className="italicize">
                  (Pick as many as you would like!)
                </span>
              </label>
              <div className=" row row-cols-2 row-cols-md-4 gy-2 genre-choices offset-3 mb-5">
                {genres.map((g) => {
                  return (
                    <div className="col genre-choice" key={g.id}>
                      <div className="form-check">
                        <label htmlFor={g.id} className="form-check-label">
                          <input
                            className="form-check-input mb-2 text-shadow"
                            id={g.id}
                            type="checkbox"
                            name={g.id}
                            value={g.id}
                            onChange={(e) =>
                              handleGenreChoice(g.id, e.target.checked)
                            }
                          />{" "}
                          {g.type}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="btn login-btn btn-light" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
