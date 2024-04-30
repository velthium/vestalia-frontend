import logo from "@/assets/images/VestaliaLogo.webp";
import { AuthContext } from "@/context/Auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

function Header() {
  const { authData } = useContext(AuthContext);

  return (
    <header className="bg-white">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand m-0 d-flex align-items-center">
            <img
              className="rounded"
              src={logo}
              alt="Vestalia Logo"
              id="vestalia-logo" />
            <h1 className="mx-3 fs-lg-3 fs-4 my-auto custom-orange fw-bold">Vestalia Network</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarNav">
            <ul className="navbar-nav mx-auto mt-3 mt-lg-0">
              <input
                className="form-control icon-search-bar"
                type="search"
                id="site-search"
                name="q"
                size="60"
                placeholder="Search for topics"
                title="Search bar"/>
            </ul>
            <ul className="list-unstyled navbar-nav">
              {authData.walletSigner && (
                <li className="nav-item mt-3 mt-lg-0">
                  <Link
                    className="nav-link text-center"
                    to="/create-community">Create Community
                  </Link>
                </li>
              )}
              {authData.walletSigner ? (
                <li className="nav-item mt-3 mt-lg-0 justify-content-between align-self-center">
                  {authData.desmosProfile ? (
                    <Link
                      className="btn btn-warning bg-orange"
                      to="/profile">{authData.desmosProfile.dtag}
                    </Link>
                  ) : (
                    <Link
                      className="btn btn-warning bg-orange"
                      to="/profile">Profil
                    </Link>
                  )}
                </li>
              ) : (
                <li className="nav-item text-center mt-3 mt-lg-0">
                  <Link
                    className="btn btn-warning bg-green h7"
                    to="/auth">
                    Connect
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
