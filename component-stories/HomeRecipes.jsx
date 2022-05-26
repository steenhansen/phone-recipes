import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useFilterContext, useServerContext } from "../server-app/serverBrowserContext";
import { databaseGet } from "../redux-store/ajax-calls.js";
import { matchingRecipes, ONLY_ONE_RECIPE_UNFURLED } from "../import-2-require/common-2-import";
import { RecipeListBoundary } from "./RecipeDisplay/RecipeList";
import { type_czech } from "../import-2-require/make-Type-Czech-import";
import { PRE_HomeRecipes } from "../type-czech-jsx/tc_HomeRecipes";

export { HomeRecipes };

HomeRecipes = type_czech.linkUp(HomeRecipes, PRE_HomeRecipes);
function HomeRecipes({ is_visible_array, setVisibleRecipes, is_story_book_environment = false }) {
  const server_variables = useServerContext();
  const { shared_total_count } = server_variables;
  const [total_recipes_match, setTotalRecipesMatch] = useState(shared_total_count);
  const dispatch = useDispatch();
  const { filter_text, filter_meal, filter_cuisine, filter_diet } = useFilterContext();

  useEffect(() => {
    if (!is_story_book_environment) {
      const recipe_filters = { filter_meal, filter_cuisine, filter_diet, filter_text };
      databaseGet(recipe_filters).then((filtered_recipes) => {
        setTotalRecipesMatch(filtered_recipes.count_recipes);
        dispatch({ type: "filtered-recipes", payload: filtered_recipes });
      });
    }
  }, [filter_meal, filter_cuisine, filter_diet, filter_text]);

  const filtered_recipes = useSelector((recipe_store2) => recipe_store2.current_recipes);

  const clickRecipeVisible = (flip_recipe_index) => {
    const changed_visibles = is_visible_array.concat();
    if (ONLY_ONE_RECIPE_UNFURLED) {
      const is_clicked_visible = changed_visibles[flip_recipe_index];
      if (is_clicked_visible) {
        changed_visibles[flip_recipe_index] = false;
      } else {
        const num_recipes = changed_visibles.length;
        for (let recipe_index = 0; recipe_index < num_recipes; recipe_index++) {
          changed_visibles[recipe_index] = false;
        }
        changed_visibles[flip_recipe_index] = true;
      }
    } else {
      changed_visibles[flip_recipe_index] = !changed_visibles[flip_recipe_index];
    }
    setVisibleRecipes(changed_visibles);
  };

  const setEditRecipe = (x) => x;
  const number_of_matches = matchingRecipes(filtered_recipes, total_recipes_match);
  return (
    <div className="p-0 m-0 ">
      <div className="w-full font-semibold text-center text-gray-800 ">{number_of_matches}</div>
      <RecipeListBoundary
        filtered_recipes={filtered_recipes}
        user_on_own_page={false}
        clickRecipeVisible={clickRecipeVisible}
        is_visible_array={is_visible_array}
        setEditRecipe={setEditRecipe}
      ></RecipeListBoundary>
    </div>
  );
}
