import React, { useContext } from "react";
import logo from "../../assets/evangadi-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import "../../index.css";

const Header = () => {
  const { user, setuser } = useContext(AppState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setuser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="EvangadiLogo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end fw-semibold" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">

              <Link className="nav-link active"
                aria-current="page" to="/" >Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                How It Works
              </a>
            </li>

            <li className="nav-item">
              {user?.username ? (
                <Link className="nav-link" to="/login">
                  <button
                    className="btn btn-primary fw-bold px-5 action__btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              ) : (
                <Link className="nav-link" to="/">
                  <button className="btn btn-primary fw-bold px-5 action-btn">
                    Sign In
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
