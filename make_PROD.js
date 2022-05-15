// called by  :::  npm run prod ../prod-config.js
const fs = require('fs');
console.log("Production build, no TypeCzech bundled");

const PROD_tc_safe_recipe_2_import = './import-2-require/tc-safe-recipe-2-import_PROD.js';
const tc_safe_recipe_2_import = './import-2-require/tc-safe-recipe-2-import.js';
fs.copyFileSync(PROD_tc_safe_recipe_2_import, tc_safe_recipe_2_import);

const PROD_type_czech_import_file = './import-2-require/TypeCzech-2-import_PROD_without_type-czech.js';
const compiled_type_czech_import = './import-2-require/TypeCzech-2-import.js';
fs.copyFileSync(PROD_type_czech_import_file, compiled_type_czech_import);

const PROD_type_czech_require_file = './import-2-require/TypeCzech-2-require_PROD_without_type-czech.js';
const compiled_type_czech_require = './import-2-require/TypeCzech-2-require.js';
fs.copyFileSync(PROD_type_czech_require_file, compiled_type_czech_require);

const tc_ajax_calls_PROD = './redux-store/tc-ajax-calls_PROD.js';
const tc_ajax_calls = './redux-store/tc-ajax-calls.js';
fs.copyFileSync(tc_ajax_calls_PROD, tc_ajax_calls);

const tc_recipe_store_PROD = './redux-store/tc-recipe-store_PROD.js';
const tc_recipe_store = './redux-store/tc-recipe-store.js';
fs.copyFileSync(tc_recipe_store_PROD, tc_recipe_store);

const tc_RecipeEdit_PROD = './type-czech-jsx/RecipeDisplay/tc_RecipeEdit_PROD.js';
const tc_RecipeEdit = './type-czech-jsx/RecipeDisplay/tc_RecipeEdit.js';
fs.copyFileSync(tc_RecipeEdit_PROD, tc_RecipeEdit);

const tc_RecipeList_PROD = './type-czech-jsx/RecipeDisplay/tc_RecipeList_PROD.js';
const tc_RecipeList = './type-czech-jsx/RecipeDisplay/tc_RecipeList.js';
fs.copyFileSync(tc_RecipeList_PROD, tc_RecipeList);

const tc_RecipeSingle_PROD = './type-czech-jsx/RecipeDisplay/tc_RecipeSingle_PROD.js';
const tc_RecipeSingle = './type-czech-jsx/RecipeDisplay/tc_RecipeSingle.js';
fs.copyFileSync(tc_RecipeSingle_PROD, tc_RecipeSingle);

const tc_CookRecipes_PROD = './type-czech-jsx/tc_CookRecipes_PROD.js';
const tc_CookRecipes = './type-czech-jsx/tc_CookRecipes.js';
fs.copyFileSync(tc_CookRecipes_PROD, tc_CookRecipes);

const tc_HomeRecipes_PROD = './type-czech-jsx/tc_HomeRecipes_PROD.js';
const tc_HomeRecipes = './type-czech-jsx/tc_HomeRecipes.js';
fs.copyFileSync(tc_HomeRecipes_PROD, tc_HomeRecipes);