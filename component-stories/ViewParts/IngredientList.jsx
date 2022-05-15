export { IngredientList }

function ListRowSimple(ingredient_set, index, row_input_colour = 'bg-row-input-colour-none') {
  const { ingredient, amount } = ingredient_set
  const the_key = 'ingredient_list_' + ingredient + amount + index;
  return (
    <div key={the_key} className="mt-2 ">
      <div className="float-left w-3/4 pb-1 ">      <input className={`base-view w-full ${row_input_colour} `} type="text" defaultValue={ingredient} disabled /></div>
      <div className="float-left w-1/4 pl-2 "><input className={`base-view w-full ${row_input_colour} `} type="text" defaultValue={amount} disabled /></div>
    </div>
  )
}

function IngredientList({ ingredients, is_minimal, row_input_colour }) {
  if (ingredients.length === 0 && !is_minimal) {
    const blank_ingredient = { ingredient: '', amount: '' };
    return ListRowSimple(blank_ingredient, 0)
  }
  const the_ingredients_x = ingredients.map((an_ingredient, index) => ListRowSimple(an_ingredient, index, row_input_colour))
  return the_ingredients_x;
}