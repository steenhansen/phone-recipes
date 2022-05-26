import { searchStrip, safeEmail, safeStrip, ID_SEPARATOR } from "./common-2-import";
import { type_czech } from "../import-2-require/make-Type-Czech-import";

import { PRE_safeIngredients, POST_safeIngredients, PRE_safeSearch, POST_safeSearch, PRE_safeRecipe, POST_safeRecipe } from "./tc-safe-recipe-2-import";

safeIngredients = type_czech.linkUp(safeIngredients, PRE_safeIngredients, POST_safeIngredients);
function safeIngredients(ingredients) {
  const safe_ingredients = ingredients.map((an_ingredient) => {
    const ingredient = searchStrip(an_ingredient.ingredient);
    const amount = searchStrip(an_ingredient.amount);
    return { ingredient, amount };
  });
  return safe_ingredients;
}

safeSearch = type_czech.linkUp(safeSearch, PRE_safeSearch, POST_safeSearch);
function safeSearch(safe_title, steps, ingredients) {
  const safe_ingredients = safeIngredients(ingredients);
  const title_steps = " " + safe_title + " " + searchStrip(steps) + " ";
  const safe_search = safe_ingredients.reduce((acc, curr) => acc + curr.ingredient + " " + curr.amount + " ", title_steps);
  return safe_search;
}

safeRecipe = type_czech.linkUp(safeRecipe, PRE_safeRecipe, POST_safeRecipe);
function safeRecipe(new_recipe) {
  const { cook, title, steps, serves, time, meal, cuisine, diet, ingredients, internal, minutes } = new_recipe;
  const safe_cook = safeEmail(cook);
  const safe_title = safeStrip(title);
  const safe_id = safe_cook + ID_SEPARATOR + safe_title + ID_SEPARATOR;
  const id_lower = safe_id.toLowerCase();
  const int_minutes = 0 + minutes;
  const safe_search = safeSearch(safe_title, steps, ingredients);
  const safe_lower_search = safe_search.toLowerCase();
  const safe_recipe = {
    _id: id_lower,
    cook: safe_cook,
    title: safe_title,
    steps: steps,
    serves: serves,
    time: time,
    meal: meal,
    cuisine: cuisine,
    diet: diet,
    ingredients: ingredients,
    comments: [],
    internal: internal,
    minutes: int_minutes,
    search: safe_lower_search,
  };
  if (new_recipe.old_title) {
    const safe_old = safeStrip(new_recipe.old_title);
    safe_recipe.old_title = safe_old;
  }
  return safe_recipe;
}

export { safeRecipe };
