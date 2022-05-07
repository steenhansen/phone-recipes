export { IngredientList }

function ListRowSimple(ingredient_set, index, row_input_colour = 'bg-row-input-colour-none') {
  const { ingredient, amount } = ingredient_set
  const the_key = 'ingredient_list_' + ingredient + amount + index;
  return (
    <div key={the_key} className=" mt-2 ">
      <div className=" w-3/4  float-left pb-1 ">      <input className={`w-full ${row_input_colour} `} type="text" defaultValue={ingredient} disabled /></div>
      <div className=" w-1/4 float-left  pl-2  "><input className={`w-full ${row_input_colour} `} type="text" defaultValue={amount} disabled /></div>
    </div>
  )
}

function IngredientList({ ingredients, row_input_colour }) {
  const the_ingredients_x = ingredients.map((an_ingredient, index) => ListRowSimple(an_ingredient, index, row_input_colour))
  return the_ingredients_x
}