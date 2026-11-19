import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stars } from "react-bootstrap-icons";
import RecipeCard from "../components/RecipeCard.jsx";
import { getRecipes } from "../services/api.js";

const categories = ["Pasta", "Dessert", "Chicken", "Beef", "Seafood"];

function Home() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes().then((data) => setRecipes(data.slice(0, 3)));
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <p className="text-warning fw-bold">
            <Stars className="me-2" /> DISCOVER • COOK • ENJOY
          </p>
          <h1 className="display-4 fw-bold">
            Find Your Next <span className="text-warning">Favorite Recipe</span>
          </h1>
          <p className="text-secondary mt-3">
            Explore delicious recipes and discover something new to cook.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4">What are you craving?</h2>
          {categories.map((category) => (
            <button
              key={category}
              className="btn btn-outline-secondary me-2 mb-2"
              onClick={() => navigate(`/recipes?category=${category}`)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h2 className="fw-bold">Featured Recipes</h2>
            <Link to="/recipes" className="text-decoration-none">Explore all →</Link>
          </div>
          <div className="row">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;