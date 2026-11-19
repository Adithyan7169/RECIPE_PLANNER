import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites, removeFavorite } from "../services/favorites.js";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites().then(setFavorites);
  }, []);

  const handleRemove = async (id) => {
    await removeFavorite(id);
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">My Favorites </h1>

      {favorites.length === 0 ? (
        <p className="text-secondary">You haven't added any favorites yet.</p>
      ) : (
        <div className="row">
          {favorites.map((favorite) => (
            <div className="col-md-6 col-lg-4 mb-4" key={favorite.id}>
              <div className="card h-100 shadow-sm border-0">
                <img src={favorite.recipeImage} className="card-img-top" alt={favorite.recipeName} style={{ height: "220px", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column">
                  <p className="text-warning fw-bold mb-2">{favorite.category}</p>
                  <h5 className="card-title">{favorite.recipeName}</h5>
                  <div className="d-flex gap-2 mt-auto">
                    <Link to={`/recipe/${favorite.recipeId}`} className="btn btn-warning flex-grow-1">
                      View Recipe →
                    </Link>
                    <button className="btn btn-outline-danger" onClick={() => handleRemove(favorite.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;