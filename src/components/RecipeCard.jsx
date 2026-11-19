import { Link } from "react-router-dom";
import { addFavorite } from "../services/favorites.js";

function RecipeCard({ recipe }) {
  const handleFavorite = async () => {
    await addFavorite(recipe);
    alert("Recipe added to favorites!");
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} style={{ height: "220px", objectFit: "cover" }}/>
        <div className="card-body d-flex flex-column">
          <p className="text-warning fw-bold mb-2">{recipe.strCategory}</p>
          <h5 className="card-title">{recipe.strMeal}</h5>
          <p className="card-text text-secondary">
            A delicious {recipe.strCategory?.toLowerCase()} recipe.
          </p>
          <div className="d-flex gap-2 mt-auto">
            <Link to={`/recipe/${recipe.idMeal}`} className="btn btn-warning flex-grow-1">
              View Recipe →
            </Link>
            <button className="btn btn-outline-danger" onClick={handleFavorite}>
              <i className="bi bi-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;