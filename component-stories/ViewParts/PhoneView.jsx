import { userToUrl } from "../../import-2-require/common-2-import";

export { PhoneView }

function PhoneView({ recipe_index, filtered_recipes, title, cook, is_visible_array }) {
  const recipe_list = filtered_recipes.map((a_recipe, index) => {
    if (is_visible_array[index]) {
      return userToUrl(a_recipe.cook) + '/' + a_recipe.title;
    } else {
      ''
    }
  });
  const recipe_phone = recipe_list.join('');
  const selenium_id = '--view--kitchen--' + recipe_index;
  return (
    <a id={selenium_id} href={recipe_phone} className="float-right -mt-1 base-link" >
      Kitchen
    </a>
  )
}

