import { Link } from "react-router-dom";
import { ForkKnife } from "react-bootstrap-icons";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <ForkKnife className="me-2" />
          RecipePlanner
        </Link>
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/recipes" className="nav-link">Recipes</Link>
          <Link to="/favorites" className="nav-link">
            <i className="bi bi-heart me-1"></i>
            Favorites
          </Link>
          <Link to="/recipes" className="btn btn-warning">Explore Recipes</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;