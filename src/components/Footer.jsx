import { Link } from "react-router-dom";
import { ForkKnife } from "react-bootstrap-icons";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-5">
      <div className="container">
        <div className="text-center">
          <h4 className="fw-bold">
            <ForkKnife size={22} className="me-2" />
            RecipePlanner
          </h4>

          <p className="text-light">
            Discover delicious recipes and make every meal special.
          </p>

          <div className="mb-4">
            <Link to="/" className="text-white text-decoration-none me-4">
              Home
            </Link>
            <Link to="/recipes" className="text-white text-decoration-none">
              Recipes
            </Link>
          </div>

          <hr />

          <p className="text-secondary mb-0">
             RecipePlanner.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;