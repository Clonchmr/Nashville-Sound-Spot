import { useState } from "react";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userServices";

export const Register = (props) => {
  const [fan, setFan] = useState({
    email: "",
    name: "",
    isBand: false,
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    createUser(fan).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "sound_spot_user",
          JSON.stringify({
            id: createdUser.id,
            isBand: createdUser.isBand,
          })
        );

        navigate("/");
      }
    });
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

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1 className="mt-5 mb-5">Nashville Sound Spot</h1>
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
                }}
                type="checkbox"
                id="isBand"
                className="mb-3"
              />
              I am a band{" "}
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
