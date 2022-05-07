
export { IngredientEditTop }

function IngredientEditTop({the_ingredients, is_minimal}){
  const no_ingredients = typeof the_ingredients === 'undefined' || the_ingredients.length===0;

  if (is_minimal && no_ingredients){
    return '';
  }
  return (
    <div  className=" mt-2 ">
    
    <div className=" w-[40px] mr-2 float-left ">
        &nbsp;
      </div>

      <div className=" w-7/12 mr-2 float-left font-semibold ">Ingredients</div>
      <div className=" w-2/12  float-left  font-semibold ">Amount</div>

      <div className=" w-[40px] mr-2 float-left ">
        &nbsp;
      </div>


    </div>
  )
}
