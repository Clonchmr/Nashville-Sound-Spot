import React, { useState } from "react";
import "../../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userServices";

export const Login = () => {
  const [email, set] = useState("matthewclonch@email.com");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "sound_spot_user",
          JSON.stringify({
            id: user.id,
            isBand: user.isBand,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1 className="mt-5">Nashville Sound Spot</h1>
          <h2 className="mt-5">Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button
                className="login-btn btn-dark btn mb-3 mt-3"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
