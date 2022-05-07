import { ThinHorz } from '../HorzBar'
import { MealCuisineDiet } from '../FilterParts/MealCuisineDiet'

export { TitleMinimal }

function TitleMinimal({ title, index, a_recipe }) {
  let { meal, cuisine, diet } = a_recipe;
  const meal_cuisine_diet = { meal, cuisine, diet };
  const the_key = '-title_minimal-' + index;
  // Breakfast/Japanese/Vegetarian

  return (
    <>
      <div key={the_key} className="flex overflow-hidden" >

        <div className="flex-none mr-1 ">
          <a className="text-blue-600   font-bold  "
          >{title}</a>
        </div>

        <div className="flex-auto  w-full ">
        <ThinHorz className="mt-3"></ThinHorz>
        </div>


        <div className="flex-none  float-right ml-1 block ">
            <MealCuisineDiet meal_cuisine_diet={meal_cuisine_diet}></MealCuisineDiet>

        </div>

      </div>
    </>
  )

}


