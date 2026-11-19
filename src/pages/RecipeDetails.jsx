import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import { getRecipeById } from "../services/api.js";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeById(id).then((data) => {
      setRecipe(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="container py-5 text-center"><p>Loading recipe...</p></div>;
  }

  if (!recipe) {
    return <div className="container py-5 text-center"><p>Recipe not found.</p></div>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient) ingredients.push(`${recipe[`strMeasure${i}`]} ${ingredient}`);
  }

  const downloadRecipe = () => {
    const pdf = new jsPDF();
    let y = 20;

    const write = (text, x, size, style) => {
      pdf.setFontSize(size);
      pdf.setFont("helvetica", style);
      pdf.text(text, x, y);
    };

    const nextLine = (step) => {
      y += step;
      if (y > 275) {
        pdf.addPage();
        y = 20;
      }
    };

    write(recipe.strMeal, 20, 22, "bold");
    nextLine(15);
    write("Ingredients", 20, 16, "bold");
    nextLine(10);

    ingredients.forEach((ingredient) => {
      write(`• ${ingredient}`, 25, 11, "normal");
      nextLine(7);
    });

    nextLine(8);
    write("Instructions", 20, 16, "bold");
    nextLine(10);

    pdf.splitTextToSize(recipe.strInstructions, 170).forEach((line) => {
      write(line, 20, 11, "normal");
      nextLine(6);
    });

    pdf.save(`${recipe.strMeal}-Recipe.pdf`);
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Recipe Image */}
        <div className="col-md-5">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="img-fluid rounded shadow-sm" />
        </div>

        {/* Recipe Information */}
        <div className="col-md-7">
          <p className="text-warning fw-bold">{recipe.strCategory}</p>
          <h1 className="fw-bold mb-3">{recipe.strMeal}</h1>

          <h4 className="fw-bold mt-4">Ingredients</h4>
          <ul className="list-group mb-4">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="list-group-item">{ingredient}</li>
            ))}
          </ul>

          <h4 className="fw-bold mt-4">Instructions</h4>
          <p className="text-secondary">{recipe.strInstructions}</p>

          {/* Download Button */}
          <div className="mt-4">
            <button onClick={downloadRecipe} className="btn btn-warning">
              <i className="bi bi-file-earmark-pdf me-2"></i>
              Download Recipe PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;