import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const FanNav = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

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
            onClick={toggleNavbar}
            data-bs-target="#navbarToggle"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarToggle"
          >
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item me-5">
                <Link
                  className="nav-link"
                  to={"/myprofile"}
                  onClick={handleLinkClick}
                >
                  My Profile
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link
                  className="nav-link"
                  to={"/bands"}
                  onClick={handleLinkClick}
                >
                  Bands
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link
                  className="nav-link"
                  to={"/favorites"}
                  onClick={handleLinkClick}
                >
                  Favorites
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link
                  className="nav-link"
                  to={"/venues"}
                  onClick={handleLinkClick}
                >
                  Venues
                </Link>
              </li>
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
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
