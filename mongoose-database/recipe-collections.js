


Recipes_coll = global.GLOBAL_CONFIG.G_RECIPES_COLLECTION; 

const { MAX_RECIPES_SHOWN, REMOVE_RECORD_VERSION, ID_SEPARATOR, safeEmail, safeReturns, safeStrip } = require("../import-2-require/common-2-require");


const {
  PRE_changeRecipe, POST_changeRecipe,
  PRE_reTitleRecipe, POST_reTitleRecipe,
  PRE_safeIngredients, POST_safeIngredients,
  PRE_safeSearch, POST_safeSearch,
  PRE_safeRecipe, POST_safeRecipe,
  PRE_remakeOldComments, POST_remakeOldComments,
  PRE_getOneRecipe, POST_getOneRecipe,
  PRE_deleteRecipe, POST_deleteRecipe,
  PRE_newRecipe, POST_newRecipe,
  PRE_getFilteredRecipes, POST_getFilteredRecipes,
  PRE_getCooksRecipes, POST_getCooksRecipes,
  type_czech } = require('./tc-recipe-collections');

const { deVersionMongo } = require("./mongo-database");


changeRecipe = type_czech.linkUp(changeRecipe, PRE_changeRecipe, POST_changeRecipe);
async function changeRecipe(edited_recipe) {
  const safe_recipe = safeRecipe(edited_recipe);
  const change_id = safe_recipe._id;
  await Recipes_coll.findOneAndUpdate({ _id: change_id }, safe_recipe);
  return safe_recipe;
}






reTitleRecipe = type_czech.linkUp(reTitleRecipe, PRE_reTitleRecipe, POST_reTitleRecipe);
async function reTitleRecipe(re_titled_recipe, old_title) {
  const safe_recipe = safeRecipe(re_titled_recipe);
  const { title, cook } = safe_recipe;
  const old_recipe_id = cook + ID_SEPARATOR + old_title + ID_SEPARATOR
  const old_comments = await getRecipeComments(old_recipe_id);
  const result_new_comments = await remakeOldComments(old_comments, title);
  safe_recipe.comments = result_new_comments;
  const new_recipe = await Recipes_coll.create(safe_recipe)
  await deleteRecipe(old_recipe_id)
  await deleteCommentsOnRecipe(old_recipe_id);
  const concrete_recipe = deVersionMongo(new_recipe);
  return concrete_recipe;
}

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
    _id: safe_id,
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

newRecipe = type_czech.linkUp(newRecipe, PRE_newRecipe, POST_newRecipe);
async function newRecipe(new_recipe) {
  const safe_recipe = safeRecipe(new_recipe);
  const result_recipe = await Recipes_coll.create(safe_recipe);
  const concrete_recipe = deVersionMongo(result_recipe);
  return concrete_recipe;
}

getOneRecipe = type_czech.linkUp(getOneRecipe, PRE_getOneRecipe, POST_getOneRecipe);
async function getOneRecipe(recipe_id) {
  const with_blanks_id = recipe_id.replace('%20', ' ')
  const a_recipe = await Recipes_coll.find({ _id: with_blanks_id }).select(REMOVE_RECORD_VERSION);
  return a_recipe
}

deleteRecipe = type_czech.linkUp(deleteRecipe, PRE_deleteRecipe, POST_deleteRecipe);
async function deleteRecipe(recipe_id) {
  await deleteCommentsOnRecipe(recipe_id);
  const del_recipe_count = await Recipes_coll.deleteOne({ _id: recipe_id });   //{ deletedCount: 1 }
  return del_recipe_count;  //    { deletedCount: 1 }
}

getCooksRecipes = type_czech.linkUp(getCooksRecipes, PRE_getCooksRecipes, POST_getCooksRecipes)
async function getCooksRecipes(cook) {
  const startwith_cook = new RegExp("^" + cook)// cook_name
  const count_recipes = await Recipes_coll.find({ _id: startwith_cook })
              .count();
  const current_recipes = await Recipes_coll.find({ _id: startwith_cook })
              .select(REMOVE_RECORD_VERSION)
              .limit(MAX_RECIPES_SHOWN);  // new recipe does not have this, but changed does
  const sorted_recipes = current_recipes.sort((a, b) => (a.title).localeCompare(b.title, 'en', { sensitivity: 'base' }))
  return {count_recipes, sorted_recipes}
}

getFilteredRecipes = type_czech.linkUp(getFilteredRecipes, PRE_getFilteredRecipes, POST_getFilteredRecipes)
async function getFilteredRecipes(meal, cuisine, diet, find) {
  let meal_filter = {}
  let cuisine_filter = {}
  let diet_filter = {}
  let find_filter = {}
  if (meal !== '') {
    meal_filter = { meal }
  }
  if (cuisine !== '') {
    cuisine_filter = { cuisine }
  }
  if (diet !== '') {
    diet_filter = { diet }
  }
  if (find !== '') {
    const lower_find = find.toLowerCase();
    const find_regex = new RegExp(" " + lower_find)
    find_filter = { "search": { $regex: find_regex, $options: 'i' } };
  }
  const all_filters = Object.assign({}, meal_filter, cuisine_filter, diet_filter, find_filter)
  const count_recipes = await Recipes_coll
                  .find(all_filters)
                  .count();
  const current_recipes = await Recipes_coll.find(all_filters)
    .select(REMOVE_RECORD_VERSION)       // new recipe does not have this, but changed does
    .limit(MAX_RECIPES_SHOWN);
  const sorted_recipes = current_recipes.sort((a, b) => (a.title).localeCompare(b.title, 'en', { sensitivity: 'base' }))
  return  {count_recipes, sorted_recipes}
}

remakeOldComments = type_czech.linkUp(remakeOldComments, PRE_remakeOldComments, POST_remakeOldComments);
async function remakeOldComments(old_comments, new_title) {
  const results_remake = [];
  for (const an_old_comment of old_comments) {
    const old_comment_id = an_old_comment._id;
    const old_comment_arr = old_comment_id.split(ID_SEPARATOR);
    const [cook, _old_title, by, remark] = old_comment_arr;
    const new_comment_id = cook + ID_SEPARATOR + new_title + ID_SEPARATOR + by + ID_SEPARATOR + remark;
    const updated_comment = { _id: new_comment_id, by };
    await Comments_coll.create(updated_comment);
    results_remake.push(new_comment_id);
  }
  return results_remake;
}




async function countRecipes() {
  const count_recipes = await Recipes_coll.countDocuments();
  return count_recipes
}



module.exports = {
  newRecipe, changeRecipe, countRecipes,
  reTitleRecipe, deleteRecipe, remakeOldComments,
  safeRecipe, getCooksRecipes, getOneRecipe, getFilteredRecipes
};

const { getRecipeComments, deleteCommentsOnRecipe } = require("./comment-collections");




