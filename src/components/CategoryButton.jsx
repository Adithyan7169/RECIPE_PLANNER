function CategoryButton({ name, active = false, onClick }) {
  let buttonClass = "btn btn-outline-secondary me-2 mb-2";

  if (active) {
    buttonClass = "btn btn-warning me-2 mb-2";
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {name}
    </button>
  );
}

export default CategoryButton;