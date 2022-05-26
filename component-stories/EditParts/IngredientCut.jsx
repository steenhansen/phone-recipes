import { ButtonBase } from "../ButtonBase";

export { IngredientCut };

function IngredientCut({ the_ingredients, clickCutIngred }) {
  const cutIngredientClick = (event) => {
    const delete_ingred_id = event.target.id;
    const [_, delete_index] = delete_ingred_id.split("-");
    clickCutIngred(delete_index);
  };

  function CutRow(ingredient_set, index) {
    const { ingredient, amount } = ingredient_set;
    const the_key = "cut_" + ingredient + index + amount;
    const the_id = "--cut--" + index + "--";
    return (
      <div key={the_key} className="clear-left ">
        <div className=" w-[30px] mr-1 float-left  ">
          <ButtonBase className="py-0 ml-0 mr-1 cut-red">
            <a id={the_id} onClick={cutIngredientClick}>
              Cut
            </a>
          </ButtonBase>
        </div>

        <div className="float-left w-6/12 mr-1">
          <input className="w-full base-view" type="text" defaultValue={ingredient} disabled />
        </div>

        <div className="float-left w-3/12 ">
          <input className="w-full base-view" type="text" defaultValue={amount} disabled />
        </div>
      </div>
    );
  }

  if (the_ingredients) {
    return the_ingredients.map((an_ingredient, index) => CutRow(an_ingredient, index));
  }
  return "";
}
