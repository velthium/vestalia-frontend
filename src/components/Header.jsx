import logo from "../assets/images/VestaliaLogo.webp"
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img className="rounded" src={logo} alt="Vestalia Logo" style={{ height: '50px' }} />
        </Link>
        <ul class="list-unstyled navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profil">Profil</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default Header;