import logo from "@/assets/images/VestaliaLogo.webp";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/Auth';
import { Link } from 'react-router-dom';

function Header() {
  const { authData, setAuthData } = useAuth();
  const [ userData, setUserData ] = useState({});

  useEffect(() => {

    if (authData.walletSigner !== null) {

        fetch('https://api.mainnet.desmos.network/desmos/profiles/v3/profiles/' + authData.walletSigner.signer.accountData.address)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error(error));

    }
  }, [authData]);

  return (
    <header>
      <nav className="mx-5 navbar navbar-expand-lg navbar-light d-flex justify-content-between">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img className="rounded" src={logo} alt="Vestalia Logo" id="vestalia-logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className='d-flex justify-content-between'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input className="form-control" type="search" id="site-search" name="q" size="60" placeholder='Search for topics' title='Search bar'/>
        </div>

        <ul className="list-unstyled navbar-nav">
          {authData.isConnected && (
            <li className="nav-item">
              <Link className="nav-link" to="/create-community">Create Community</Link>
            </li>
          )}
          {authData.isConnected ? (
            <li className="nav-item">
            {userData.profile ? (
              <Link className="btn btn-success bg-orange" to="/profile">{userData.profile.dtag}</Link>
          ) : (
            <Link className="btn btn-success bg-orange" to="/profile">Profil</Link>
          )}
            </li>
          ) : (
            <li className="nav-item">
              <Link className="btn btn-success bg-dark" to="/auth">Connect</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;