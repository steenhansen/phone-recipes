Recipes_coll = "un-defined";

const { MAX_RECIPES_SHOWN, REMOVE_RECORD_VERSION, ID_SEPARATOR } = require("../import-2-require/common-2-require");
const { safeRecipe } = require("../import-2-require/safe-recipe-2-require");
const { type_czech } = require("../import-2-require/make-Type-Czech-require.js");
const {
  PRE_changeRecipe,
  POST_changeRecipe,
  PRE_reTitleRecipe,
  POST_reTitleRecipe,
  PRE_remakeOldComments,
  POST_remakeOldComments,
  PRE_getOneRecipe,
  POST_getOneRecipe,
  PRE_deleteRecipe,
  POST_deleteRecipe,
  PRE_newRecipe,
  POST_newRecipe,
  PRE_getFilteredRecipes,
  POST_getFilteredRecipes,
  PRE_getCooksRecipes,
  POST_getCooksRecipes,
} = require("./tc-recipe-collections");

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
  const { _id } = safe_recipe;
  const already_there = await getOneRecipe(_id);
  if (already_there.length === 1) {
    return safe_recipe;
  }
  const { title, cook } = safe_recipe;
  const lower_old_title = old_title.toLowerCase();
  const lower_new_title = title.toLowerCase();
  const old_recipe_id = cook + ID_SEPARATOR + lower_old_title + ID_SEPARATOR;
  const old_comments = await getRecipeComments(old_recipe_id);
  const result_new_comments = await remakeOldComments(old_comments, lower_new_title, title);
  safe_recipe.comments = result_new_comments;
  const new_recipe = await Recipes_coll.create(safe_recipe);
  await deleteRecipe(old_recipe_id);
  await deleteCommentsOnRecipe(old_recipe_id);
  const concrete_recipe = deVersionMongo(new_recipe);
  return concrete_recipe;
}

newRecipe = type_czech.linkUp(newRecipe, PRE_newRecipe, POST_newRecipe);
async function newRecipe(new_recipe) {
  const safe_recipe = safeRecipe(new_recipe);
  const { _id } = safe_recipe;
  const already_there = await getOneRecipe(_id);
  if (already_there.length === 1) {
    return safe_recipe;
  }
  const result_recipe = await Recipes_coll.create(safe_recipe);
  const concrete_recipe = deVersionMongo(result_recipe);
  return concrete_recipe;
}

getOneRecipe = type_czech.linkUp(getOneRecipe, PRE_getOneRecipe, POST_getOneRecipe);
async function getOneRecipe(recipe_id) {
  const lower_id = recipe_id.toLowerCase();
  const a_recipe = await Recipes_coll.find({ _id: lower_id }).select(REMOVE_RECORD_VERSION);
  return a_recipe;
}

async function getTestRecipes() {
  const test_recipes = await Recipes_coll.find({}).select(REMOVE_RECORD_VERSION);
  return test_recipes;
}

deleteRecipe = type_czech.linkUp(deleteRecipe, PRE_deleteRecipe, POST_deleteRecipe);
async function deleteRecipe(recipe_id) {
  await deleteCommentsOnRecipe(recipe_id);
  const del_recipe_count = await Recipes_coll.deleteOne({ _id: recipe_id }); //{ deletedCount: 1 }
  return del_recipe_count; //    { deletedCount: 1 }
}

getCooksRecipes = type_czech.linkUp(getCooksRecipes, PRE_getCooksRecipes, POST_getCooksRecipes);
async function getCooksRecipes(cook) {
  const startwith_cook = new RegExp("^" + cook); // cook_name
  const count_recipes = await Recipes_coll.find({ _id: startwith_cook }).count();
  const current_recipes = await Recipes_coll.find({ _id: startwith_cook }).select(REMOVE_RECORD_VERSION).limit(MAX_RECIPES_SHOWN); // new recipe does not have this, but changed does
  const sorted_recipes = current_recipes.sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));
  return { count_recipes, sorted_recipes };
}

getFilteredRecipes = type_czech.linkUp(getFilteredRecipes, PRE_getFilteredRecipes, POST_getFilteredRecipes);
async function getFilteredRecipes(meal, cuisine, diet, find) {
  let meal_filter = {};
  let cuisine_filter = {};
  let diet_filter = {};
  let find_filter = {};
  if (meal !== "") {
    meal_filter = { meal };
  }
  if (cuisine !== "") {
    cuisine_filter = { cuisine };
  }
  if (diet !== "") {
    diet_filter = { diet };
  }
  if (find !== "") {
    const lower_find = find.toLowerCase();
    const find_regex = new RegExp(" " + lower_find);
    find_filter = { search: { $regex: find_regex, $options: "i" } };
  }
  const all_filters = Object.assign({}, meal_filter, cuisine_filter, diet_filter, find_filter);
  const count_recipes = await Recipes_coll.find(all_filters).count();
  const current_recipes = await Recipes_coll.find(all_filters)
    .select(REMOVE_RECORD_VERSION) // new recipe does not have this, but changed does
    .limit(MAX_RECIPES_SHOWN);
  const sorted_recipes = current_recipes.sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));
  return { count_recipes, sorted_recipes };
}

remakeOldComments = type_czech.linkUp(remakeOldComments, PRE_remakeOldComments, POST_remakeOldComments);
async function remakeOldComments(old_comments, lower_title, cased_title) {
  const results_remake = [];
  for (const an_old_comment of old_comments) {
    const old_comment_id = an_old_comment._id;
    const old_comment_arr = old_comment_id.split(ID_SEPARATOR);
    const [cook, _old_title, by, remark] = old_comment_arr;
    const new_comment_id = cook + ID_SEPARATOR + lower_title + ID_SEPARATOR + by + ID_SEPARATOR + remark;
    const updated_comment = { _id: new_comment_id, by, title: cased_title };
    await Comments_coll.create(updated_comment);
    results_remake.push(new_comment_id);
  }
  return results_remake;
}

async function countRecipes() {
  const count_recipes = await Recipes_coll.countDocuments();
  return count_recipes;
}

module.exports = {
  getTestRecipes,
  newRecipe,
  changeRecipe,
  countRecipes,
  reTitleRecipe,
  deleteRecipe,
  remakeOldComments,
  safeRecipe,
  getCooksRecipes,
  getOneRecipe,
  getFilteredRecipes,
};

const { getRecipeComments, deleteCommentsOnRecipe } = require("./comment-collections");
