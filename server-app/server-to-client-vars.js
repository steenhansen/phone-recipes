const { getCookComments } = require('../mongoose-database/comment-collections');
const { getFilteredRecipes, getCooksRecipes, getOneRecipe } = require('../mongoose-database/recipe-collections');
const { urlToRecipeId } = require("../import-2-require/common-2-require");

module.exports = { PageContextInit };

const NUM_SLUG_PARTS = 3;

async function multiUrlRecipes(url) {
  const no_lead_slash = url.substring(1);
  const slug_array = no_lead_slash.split('/');
  let shared_store_recipes = [];
  for (let i = 0; i < slug_array.length; i += NUM_SLUG_PARTS) {
    if (i + NUM_SLUG_PARTS <= slug_array.length) {
      const start_gmail = slug_array[i];
      const end_gmail = slug_array[i + 1];
      const recipe_id = slug_array[i + 2];
      const recipe_id_blanks = recipe_id.replaceAll('%20', ' ');
      const recipe_url = urlToRecipeId(start_gmail, end_gmail, recipe_id_blanks);
      const a_recipe = await getOneRecipe(recipe_url)
      if (a_recipe.length > 0) {
        shared_store_recipes.push(a_recipe[0]);
      } else {
        const deleted_recipe = { deleted: true, title: recipe_id };
        shared_store_recipes.push(deleted_recipe);
      }
    }
  }
  return shared_store_recipes;
}

async function PageContextInit(url, shared_csrfToken, shared_auth_email) {
  const num_slashes = (url.match(/\//g) || []).length;
  let shared_store_recipes = [];
  let shared_store_cooks_comments = [];
  let shared_total_count = 1723423432;
  if (num_slashes > 2) {
    shared_store_recipes = await multiUrlRecipes(url)
  } else if (num_slashes === 2) {
    const cook_array = url.split('/');
    const cook_email = cook_array[1] + '@' + cook_array[2];
    const { count_recipes, sorted_recipes } = await getCooksRecipes(cook_email);
    shared_total_count = count_recipes;
    shared_store_recipes = sorted_recipes;
    shared_store_cooks_comments = await getCookComments(cook_email)
  } else {
    const { count_recipes, sorted_recipes } = await getFilteredRecipes('', '', '', '');
    shared_total_count = count_recipes;
    shared_store_recipes = sorted_recipes;
  }
  const G_TYPE_CZECH_ON = global.GLOBAL_CONFIG.G_TYPE_CZECH_ON;
  const G_TYPE_CZECH_OPTIONS = global.GLOBAL_CONFIG.G_TYPE_CZECH_OPTIONS;
  const server_variables_init = {
    //pageProps,                // automatic sharing
    //routeParams,              // automatic sharing
    url,
    G_TYPE_CZECH_ON,
    G_TYPE_CZECH_OPTIONS,
    shared_auth_email,
    shared_csrfToken,
    shared_store_recipes,
    shared_total_count,
    shared_store_cooks_comments
  };
  return server_variables_init;
}
