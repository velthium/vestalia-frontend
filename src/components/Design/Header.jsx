import logo from "@/assets/images/VestaliaLogo.webp";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/Auth";
import { Link } from "react-router-dom";

function Header() {
  const { authData } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (authData.walletSigner !== null) {
        fetch("https://api.mainnet.desmos.network/desmos/profiles/v3/profiles/" + authData.walletSigner.signer.accountData.address)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error(error));
    }
  }, [authData]);

  return (
    <header className="bg-white">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand m-0 d-flex align-items-center">
            <img className="rounded" src={logo} alt="Vestalia Logo" id="vestalia-logo" />
            <h1 className="ms-3 h4 my-auto text-success">Vestalia Network</h1>
          </Link>
          <button className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mt-3 mt-lg-0">
              <input className="form-control icon-search-bar" type="search" id="site-search" name="q" size="60" placeholder="Search for topics" title="Search bar"/>
            </ul>
            <ul className="list-unstyled navbar-nav">
              {authData.isConnected && (
                <li className="nav-item mt-3 mt-lg-0">
                  <Link className="nav-link" to="/create-community">Create Community</Link>
                </li>
              )}
              {authData.isConnected ? (
                <li className="nav-item mt-3 mt-lg-0">
                {userData.profile ? (
                  <Link className="btn btn-success bg-orange" to="/profile">{userData.profile.dtag}</Link>
              ) : (
                <Link className="btn btn-success bg-orange" to="/profile">Profil</Link>
              )}
                </li>
              ) : (
                <li className="nav-item mt-3 mt-lg-0">
                  <Link className="btn btn-success bg-green h7" to="/auth">Connect</Link>
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
