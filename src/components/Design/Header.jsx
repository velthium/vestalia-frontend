import logo from "../../assets/images/VestaliaLogo.webp";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Header() {
  const [isConnected, setIsConnected] = useState(sessionStorage.getItem('isConnected'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsConnected(!!sessionStorage.getItem('isConnected'));
    };

  }, [sessionStorage.getItem('isConnected')]);

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
            <input className="form-control" type="search" id="site-search" name="q" size="60" placeholder='Search for topics' title='Search bar'/>
          </div>

          <ul className="list-unstyled navbar-nav">
              {isConnected && (
                <li className="nav-item">
                    <Link className="nav-link" to="/create-post">Create Post</Link>
                  </li>
              )}
              {isConnected ? (
                <li className="nav-item">
                  <Link className="btn btn-success bg-orange" to="/profile">Profile</Link>
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
