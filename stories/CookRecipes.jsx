import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFilterContext, useServerContext, useCreateContext } from '../app/serverBrowserContext'
import { RecipeListBoundary } from './RecipeDisplay/RecipeList'
import { RecipeEditBoundary } from './RecipeDisplay/RecipeEdit'
import { matchingRecipes, CookOnOwnPage, ONLY_ONE_RECIPE_UNFURLED } from "../import-2-require/common-2-import";
import { PRE_CookRecipes, type_czech } from '../type-czech-jsx/tc_CookRecipes'

export { CookRecipes }

function winnowRecipes(cooks_recipes) {
  const { filter_meal, filter_cuisine, filter_diet, filter_text } = useFilterContext();

  let meal_filtered = cooks_recipes;
  if (filter_meal !== '') {
    meal_filtered = cooks_recipes.filter(a_recipe => a_recipe.meal === filter_meal)
  }

  let cuisine_filtered = meal_filtered;
  if (filter_cuisine !== '') {
    cuisine_filtered = meal_filtered.filter(a_recipe => a_recipe.cuisine === filter_cuisine)
  }

  let diet_filtered = cuisine_filtered;
  if (filter_diet !== '') {
    diet_filtered = cuisine_filtered.filter(a_recipe => a_recipe.diet === filter_diet)
  }

  let winnowed_recipes = diet_filtered;
  if (filter_text !== '') {
    const lower_text = filter_text.toLowerCase();
    winnowed_recipes = diet_filtered.filter(a_recipe => (a_recipe.search).includes(lower_text))
  }

  return winnowed_recipes;
}


CookRecipes = type_czech.linkUp(CookRecipes, PRE_CookRecipes)
function CookRecipes({ is_visible_array, setVisibleRecipes }) {
  const server_variables = useServerContext()

  const { shared_auth_email, url } = server_variables;

  const user_on_own_page = CookOnOwnPage(shared_auth_email, url);
  const { create_recipe, setCreateRecipe, edit_recipe, setEditRecipe } = useCreateContext();
  const { setFilterText, setFilterMeal, setFilterCuisine, setFilterDiet } = useFilterContext();

  useEffect(() => {
    var searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get('q') === "create") {
      history.pushState(null, '', window.location.pathname);
    }
  })

  const cooks_recipes = useSelector((recipe_store2) => recipe_store2.current_recipes)

  useEffect(() => {
    setFilterText('')
    setFilterMeal('')
    setFilterCuisine('')
    setFilterDiet('')
  }, [cooks_recipes]);

  var diet_filtered = winnowRecipes(cooks_recipes);
  const filtered_recipes = diet_filtered.filter(not_empty => not_empty)

  if (create_recipe && user_on_own_page) {
    const empty_recipe = {};
    return (
      <>
        <div className=" text-center text-gray-800 font-semibold ">
          Make a New Recipe
        </div>
        <RecipeEditBoundary filtered_recipes={filtered_recipes} the_recipe={empty_recipe} setEditRecipe={setCreateRecipe} ></RecipeEditBoundary>
      </>
    )
  } else if (edit_recipe && user_on_own_page) {
    const the_recipe = filtered_recipes.find(x => x._id === edit_recipe);
    return (
      <>
        <div className=" text-center text-gray-800 font-semibold ">
          Edit Recipe  xx
        </div>
        <RecipeEditBoundary filtered_recipes={filtered_recipes} the_recipe={the_recipe} setEditRecipe={setEditRecipe} ></RecipeEditBoundary>
      </>
    )
  }


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
      changed_visibles[flip_recipe_index] = !changed_visibles[flip_recipe_index]
    }
    setVisibleRecipes(changed_visibles);
  }


  const recipe_count = filtered_recipes.length;
  const number_of_matches = matchingRecipes(filtered_recipes, recipe_count);



  return (
    <>
      <br />
      <div className="text-center text-gray-800 font-semibold w-full">
        {number_of_matches}
      </div>


      <RecipeListBoundary filtered_recipes={filtered_recipes} user_on_own_page={user_on_own_page}
        clickRecipeVisible={clickRecipeVisible} is_visible_array={is_visible_array}
        setEditRecipe={setEditRecipe}></RecipeListBoundary>

    </>
  )
}

