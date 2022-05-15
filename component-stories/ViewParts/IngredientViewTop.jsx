export { IngredientViewTop }

function IngredientViewTop({ the_ingredients, is_minimal }) {
  const no_ingredients = typeof the_ingredients === 'undefined' || the_ingredients.length === 0;

  if (is_minimal && no_ingredients) {
    return '';
  }
  return (
    <div className="mt-2 ">
      <div className="float-left w-3/4 font-semibold ">Ingredients</div>
      <div className="float-left w-1/4 pl-2 font-semibold ">Amount</div>
    </div>
  )
}
