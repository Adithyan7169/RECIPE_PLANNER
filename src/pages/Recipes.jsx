import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import CategoryButton from "../components/CategoryButton.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import { getRecipes, searchRecipes, getRecipesByCategory } from "../services/api.js";

const categories = ["All", "Pasta", "Dessert", "Chicken", "Beef", "Seafood"];

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "All";

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) data = await searchRecipes(searchQuery);
        else if (categoryQuery !== "All") data = await getRecipesByCategory(categoryQuery);
        else data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error loading recipes:", error);
        setRecipes([]);
      }
      setLoading(false);
    };
    loadRecipes();
  }, [searchQuery, categoryQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) setSearchParams({ search: search.trim() });
  };

  const handleCategory = (category) => {
    setSearchParams(category === "All" ? {} : { category });
    setSearch("");
  };

  return (
    <main>
  
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h1 className="fw-bold">Explore Recipes</h1>
          <p className="text-secondary">Find delicious recipes for every occasion.</p>

   
          <form onSubmit={handleSearch} className="input-group mt-4">
            <span className="input-group-text"><Search /></span>
            <input type="text" className="form-control" placeholder="Search for a recipe..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" className="btn btn-warning">Search</button>
          </form>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <h5 className="fw-bold mb-3">Categories</h5>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              name={category}
              active={category === categoryQuery}
              onClick={() => handleCategory(category)}
            />
          ))}
        </div>
      </section>

  
      <section className="py-4">
        <div className="container">
          {searchQuery && <h3 className="fw-bold mb-4">Search results for "{searchQuery}"</h3>}
          {!searchQuery && categoryQuery !== "All" && (
            <h3 className="fw-bold mb-4">{categoryQuery} Recipes</h3>
          )}

          {loading ? (
            <p className="text-center">Loading recipes...</p>
          ) : recipes.length === 0 ? (
            <p className="text-center text-secondary">No recipes found.</p>
          ) : (
            <div className="row">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Recipes;