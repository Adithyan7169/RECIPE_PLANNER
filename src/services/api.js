const API_URL =
  "https://www.themealdb.com/api/json/v1/1";

export const getRecipes = async () => {
  const recipeNames = ["chicken","pasta","pizza","burger","cake","salad"];

  const requests = recipeNames.map((name) =>
    fetch(
      `${API_URL}/search.php?s=${encodeURIComponent(name)}`
    )
      .then((response) => response.json())
      .then((data) => data.meals?.[0] || null)
  );

  const results = await Promise.all(requests);

  return results.filter(
    (recipe) => recipe !== null
  );
};


export const searchRecipes = async (query) => {

 
  const response = await fetch(
    `${API_URL}/search.php?s=${encodeURIComponent(query)}`
  );

  const data = await response.json();


  if (data.meals) {
    return data.meals;
  }


  const firstWord = query.trim().split(" ")[0];

  if (firstWord) {

    const fallbackResponse = await fetch(
      `${API_URL}/search.php?s=${encodeURIComponent(firstWord)}`
    );

    const fallbackData =
      await fallbackResponse.json();

    return fallbackData.meals || [];
  }

  return [];
};



export const getRecipeById = async (id) => {

  const response = await fetch(
    `${API_URL}/lookup.php?i=${id}`
  );

  const data = await response.json();

  return data.meals
    ? data.meals[0]
    : null;
};


export const getRecipesByCategory = async (category) => {

  const response = await fetch(
    `${API_URL}/filter.php?c=${encodeURIComponent(category)}`
  );

  const data = await response.json();

  return data.meals || [];
};