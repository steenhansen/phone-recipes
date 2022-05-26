import { ThinHorz } from "../HorzBar";
import { MealCuisineDiet } from "../FilterParts/MealCuisineDiet";

import { replaceall } from "../../import-2-require/common-2-import";

export { TitleMinimal };

function TitleMinimal({ title, index, a_recipe }) {
  let { meal, cuisine, diet } = a_recipe;
  const meal_cuisine_diet = { meal, cuisine, diet };
  const the_key = "-title_minimal-" + index;
  // Breakfast/Japanese/Vegetarian
  const title_blanks = replaceall("%20", " ", title);

  return (
    <>
      <div key={the_key} className="flex overflow-hidden">
        <div className="flex-none mr-1 ">
          <a className="font-bold text-blue-600 ">{title_blanks}</a>
        </div>

        <div className="flex-auto w-full ">
          <ThinHorz className="mt-3"></ThinHorz>
        </div>

        <div className="flex-none block float-right ml-1 ">
          <MealCuisineDiet meal_cuisine_diet={meal_cuisine_diet}></MealCuisineDiet>
        </div>
      </div>
    </>
  );
}
