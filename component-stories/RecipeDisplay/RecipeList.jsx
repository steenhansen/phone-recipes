import React from "react";
import { withErrorBoundary } from "react-error-boundary";

import { type_czech } from "../../import-2-require/make-Type-Czech-import";
import { MealCuisineDiet } from "../FilterParts/MealCuisineDiet";
import { TitleToggleView } from "../ViewParts/TitleToggleView";
import { TitleView } from "../ViewParts/TitleView";
import { CommentAdd } from "../ViewParts/CommentAdd";
import { PhoneView } from "../ViewParts/PhoneView";
import { EditButton } from "../EditParts/EditButton";
import { RecipeSingleBoundary } from "./RecipeSingle";
import { CommentList } from "../ViewParts/CommentList";
import { ID_SEPARATOR, SELF_COMMENTS_ALLOWED, userToUrl } from "../../import-2-require/common-2-import";
import { useServerContext } from "../../server-app/serverBrowserContext";
import { PRE_RecipeList } from "../../type-czech-jsx/RecipeDisplay/tc_RecipeList";
import { possibleErrorBoundary, recordErrorBoundary } from "../ErrorBoundaries";

export { RecipeListBoundary };

function RecipeListFallback({ error }) {
  const error_jsx = recordErrorBoundary("RecipeList", error);
  return error_jsx;
}

// NB the error entered in React Components Error Boundary state.error must be a number or null, not a string?
const RecipeListBoundary = withErrorBoundary(RecipeList, {
  FallbackComponent: RecipeListFallback,
  onError(error, info) {}, // NB this does not seem to get called, so use fallback to saved error to db
});

function canComment(_id, recipe_comments, title) {
  const used_comments = [];
  for (const used_comment of recipe_comments) {
    const comment_arr = used_comment.split(ID_SEPARATOR);
    const [_cook, _title, _by, comment_text] = comment_arr;
    used_comments.push(comment_text);
  }
  const server_variables = useServerContext();
  const { shared_auth_email, url } = server_variables;
  const user_url = userToUrl(shared_auth_email);
  const user_on_own_page = url !== "/" && user_url === url;

  if (user_on_own_page) {
    return "";
  }
  //if (SELF_COMMENTS_ALLOWED || cook !== shared_auth_email) {
  return <CommentAdd _id={_id} used_comments={used_comments} title={title}></CommentAdd>;
  //}
  // return '';
}

function RecipeView(user_on_own_page, filtered_recipes, a_recipe, recipe_index, clickRecipeVisible, is_visible_array, setEditRecipe) {
  const { _id, cook, title, comments, meal, cuisine, diet } = a_recipe;
  const clickRecipeFlip = (e) => {
    e.preventDefault();
    clickRecipeVisible(recipe_index);
  };
  const server_variables = useServerContext();
  const { url } = server_variables;
  const title_visible = is_visible_array[recipe_index] ? "none" : "block";
  const recipe_visible = is_visible_array[recipe_index] ? "block" : "none";
  const comment_add_input = canComment(_id, a_recipe.comments, title);
  const the_key = "recipe_list_" + _id;
  let edit_button_or_recipe_type = "yuuuy 88";

  if (user_on_own_page) {
    edit_button_or_recipe_type = <EditButton _id={_id} setEditRecipe={setEditRecipe}></EditButton>;
  } else if (url === "/") {
    const meal_cuisine_diet = { meal, cuisine, diet };
    const cook_page = userToUrl(a_recipe.cook);
    edit_button_or_recipe_type = (
      <MealCuisineDiet meal_cuisine_diet={meal_cuisine_diet}>
        <a className="text-sm italic base-link " href={cook_page}>
          {a_recipe.cook}
        </a>
      </MealCuisineDiet>
    );
  } else {
    const meal_cuisine_diet = { meal, cuisine, diet };
    edit_button_or_recipe_type = (
      <>
        <MealCuisineDiet meal_cuisine_diet={meal_cuisine_diet}></MealCuisineDiet>
      </>
    );
  }

  return (
    <div key={the_key} id="-a-hidden-or-viewable-recipe-" className="">
      <div id="-a-hidden-recipe-" style={{ display: title_visible }}>
        <TitleToggleView title={title} clickRecipeFlip={clickRecipeFlip}></TitleToggleView>
      </div>
      <div id="-a-viewable-recipe-" style={{ display: recipe_visible }}>
        <TitleView title={title} clickRecipeFlip={clickRecipeFlip}></TitleView>

        <div id="-filter-top-" className="flex justify-between -mt-2 ">
          <div>&nbsp;</div>
          {edit_button_or_recipe_type}
          <PhoneView recipe_index={recipe_index} filtered_recipes={filtered_recipes} title={title} cook={cook} is_visible_array={is_visible_array}></PhoneView>
        </div>

        <RecipeSingleBoundary a_recipe={a_recipe} is_minimal={false}></RecipeSingleBoundary>
        {comment_add_input}
        <CommentList comments={comments}></CommentList>
      </div>
    </div>
  );
}

RecipeList = type_czech.linkUp(RecipeList, PRE_RecipeList);
function RecipeList({ is_storybook, user_on_own_page, filtered_recipes, clickRecipeVisible, is_visible_array, setEditRecipe }) {
  possibleErrorBoundary("RecipeList", is_storybook);
  const recipe_list = filtered_recipes.map((one_recipe, index) =>
    RecipeView(user_on_own_page, filtered_recipes, one_recipe, index, clickRecipeVisible, is_visible_array, setEditRecipe)
  );
  return recipe_list;
}
