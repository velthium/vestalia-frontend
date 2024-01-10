import logo from "../../assets/images/VestaliaLogo.webp";
import { Link } from "react-router-dom";
import React from 'react';

function Header() {
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
              <li className="nav-item">
                <Link className="nav-link" to="/profil">Profil</Link>
              </li>
            </ul>
      </nav>
    </header>
  );
}

export default Header;
