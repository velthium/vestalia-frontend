import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <nav>
        <ul class="list-unstyled">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profil">Profil</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default Header;