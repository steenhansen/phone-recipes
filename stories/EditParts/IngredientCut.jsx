import { ButtonBase } from '../ButtonBase'

export { IngredientCut }

function IngredientCut({ the_ingredients, clickCutIngred }) {

  const cutIngredientClick = (event) => {
    const delete_ingred_id = event.target.id;
    const [_, delete_index] = delete_ingred_id.split('-');
    clickCutIngred(delete_index);
  }

  function CutRow(ingredient_set, index) {
    const { ingredient, amount } = ingredient_set
    const the_key = 'cut_' + ingredient + index + amount;
    const the_id = 'cut-' + index;
    return (
      <div key={the_key} className=" clear-left ">

        <div className=" w-[30px] mr-1 float-left  ">
          <ButtonBase className="    ml-0 mr-1 py-0 cut-red"  >
            <a id={the_id} onClick={cutIngredientClick}>Cut</a>
          </ButtonBase>
        </div>

        <div className="w-6/12  mr-1 float-left">
          <input className=' base-view w-full' type="text" defaultValue={ingredient} disabled />
        </div>

        <div className='w-3/12  float-left '>
          <input className=' base-view w-full' type="text" defaultValue={amount} disabled />
        </div>



      </div>


    )
  }

  if (the_ingredients) {
    return the_ingredients.map((an_ingredient, index) => CutRow(an_ingredient, index))
  }
  return '';
}