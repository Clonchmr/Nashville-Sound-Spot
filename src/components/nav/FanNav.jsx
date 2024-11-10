import { Link } from "react-router-dom";

export const FanNav = () => {
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
              <Link className="nav-link" to={"/myprofile"}>
                <li className="nav-item me-5">My Profile</li>
              </Link>
              <Link className="nav-link" to={""}>
                <li className="nav-item me-5">Bands</li>
              </Link>
              <Link className="nav-link" to={""}>
                <li className="nav-item me-5">Favorites</li>
              </Link>
              <Link className="nav-link">
                <li className="nav-item me-5">Venues</li>
              </Link>
            </ul>
            <ul className="navbar-nav">
              <Link className="nav-link">
                <li className="nav-item logout">Logout</li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
