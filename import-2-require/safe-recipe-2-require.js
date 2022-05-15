const { safeEmail, safeStrip, ID_SEPARATOR, safeReturns } = require("./common-2-require");
const { type_czech } = require('../import-2-require/make-Type-Czech-require.js');

const {
  PRE_safeIngredients, POST_safeIngredients,
  PRE_safeSearch, POST_safeSearch,
  PRE_safeRecipe, POST_safeRecipe
} = require('./tc-safe-recipe-2-require');

safeIngredients = type_czech.linkUp(safeIngredients, PRE_safeIngredients, POST_safeIngredients);
function safeIngredients(ingredients) {
  const safe_ingredients = ingredients.map(an_ingredient => {
    const ingredient = safeStrip(an_ingredient.ingredient);
    const amount = safeStrip(an_ingredient.amount);
    return { ingredient, amount };
  });
  return safe_ingredients;
}

safeSearch = type_czech.linkUp(safeSearch, PRE_safeSearch, POST_safeSearch);
function safeSearch(safe_title, steps, safe_ingredients) {
  const title_steps = ' ' + safe_title + ' ' + safeStrip(steps) + ' ';
  const safe_search = safe_ingredients.reduce((acc, curr) =>
    (acc + curr.ingredient + ' ' + curr.amount + ' ')
    , title_steps)
  return safe_search;
}

safeRecipe = type_czech.linkUp(safeRecipe, PRE_safeRecipe, POST_safeRecipe);
function safeRecipe(new_recipe) {
  const { cook, title, steps, serves, time, meal, cuisine, diet, ingredients, internal, minutes } = new_recipe;
  const safe_cook = safeEmail(cook);
  const safe_title = safeStrip(title);
  const safe_id = safe_cook + ID_SEPARATOR + safe_title + ID_SEPARATOR;
  const id_lower = safe_id.toLowerCase();
  const safe_steps = safeReturns(steps);
  const safe_serves = safeStrip(serves);
  const safe_time = safeStrip(time);
  const safe_meal = safeStrip(meal);
  const safe_cuisine = safeStrip(cuisine);
  const safe_diet = safeStrip(diet);
  const safe_ingredients = safeIngredients(ingredients)
  const safe_internal = safeStrip(internal);
  const safe_minutes = 0 + minutes;
  const safe_search = safeSearch(safe_title, steps, safe_ingredients);
  const safe_lower_search = safe_search.toLowerCase();
  const safe_recipe = {
    _id: id_lower,
    cook: safe_cook,
    title: safe_title,
    steps: safe_steps,
    serves: safe_serves,
    time: safe_time,
    meal: safe_meal,
    cuisine: safe_cuisine,
    diet: safe_diet,
    ingredients: safe_ingredients,
    comments: [],
    internal: safe_internal,
    minutes: safe_minutes,
    search: safe_lower_search
  }
  if (new_recipe.old_title) {
    const safe_old = safeStrip(new_recipe.old_title);
    safe_recipe.old_title = safe_old;
  }
  return safe_recipe;
}
S
module.exports = {
  safeRecipe
};


