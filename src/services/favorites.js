const API_URL = "http://localhost:4000/favorites";

export const getFavorites = async () => {
  const response = await fetch(API_URL);

  return await response.json();
};

export const addFavorite = async (recipe) => {
  const favorite = {
    recipeId: recipe.idMeal,
    recipeName: recipe.strMeal,
    recipeImage: recipe.strMealThumb,
    category: recipe.strCategory
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(favorite)
  });

  return await response.json();
};

export const removeFavorite = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
};