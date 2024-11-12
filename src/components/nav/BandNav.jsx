import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const BandNav = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-body mb-5">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img
              src="../../src/assets/Logo.jpg"
              alt="Sound Spot Logo"
              className="logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggle"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggle">
            <ul className="navbar-nav me-auto mb-lg-0">
              <Link className="nav-link" to={"/mybands"}>
                <li className="nav-item me-5">My Bands</li>
              </Link>
              <Link className="nav-link" to={"/myshows"}>
                <li className="nav-item me-5">My Shows</li>
              </Link>
              <Link className="nav-link" to={"/addshow"}>
                <li className="nav-item me-5">Add Show</li>
              </Link>
            </ul>
            <ul className="navbar-nav">
              {localStorage.getItem("sound_spot_user") ? (
                <li className="navbar-item navbar-logout">
                  <Link
                    className="nav-link"
                    to=""
                    onClick={() => {
                      localStorage.removeItem("sound_spot_user");
                      navigate("/", { replace: true });
                    }}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
