// called by  :::  npm run dev ../dev-config.js
const fs = require('fs');
console.log("Development build, TypeCzech bundled");

const DEV_tc_safe_recipe_2_import = './import-2-require/tc-safe-recipe-2-import_DEV.js';
const tc_safe_recipe_2_import = './import-2-require/tc-safe-recipe-2-import.js';
fs.copyFileSync(DEV_tc_safe_recipe_2_import, tc_safe_recipe_2_import);

const DEV_type_czech_import_file = './import-2-require/TypeCzech-2-import_DEV_with_type-czech_on.js';
const compiled_type_czech_import = './import-2-require/TypeCzech-2-import.js';
fs.copyFileSync(DEV_type_czech_import_file, compiled_type_czech_import);

const DEV_type_czech_require_file = './import-2-require/TypeCzech-2-require_DEV_with_type-czech_on.js';
const compiled_type_czech_require = './import-2-require/TypeCzech-2-require.js';
fs.copyFileSync(DEV_type_czech_require_file, compiled_type_czech_require);

const tc_ajax_calls_DEV = './redux-store/tc-ajax-calls_DEV.js';
const tc_ajax_calls = './redux-store/tc-ajax-calls.js';
fs.copyFileSync(tc_ajax_calls_DEV, tc_ajax_calls);

const tc_recipe_store_DEV = './redux-store/tc-recipe-store_DEV.js';
const tc_recipe_store = './redux-store/tc-recipe-store.js';
fs.copyFileSync(tc_recipe_store_DEV, tc_recipe_store);

const tc_RecipeEdit_DEV = './type-czech-jsx/RecipeDisplay/tc_RecipeEdit_DEV.js';
const tc_RecipeEdit = './type-czech-jsx/RecipeDisplay/tc_RecipeEdit.js';
fs.copyFileSync(tc_RecipeEdit_DEV, tc_RecipeEdit);

const tc_RecipeList_DEV = './type-czech-jsx/RecipeDisplay/tc_RecipeList_DEV.js';
const tc_RecipeList = './type-czech-jsx/RecipeDisplay/tc_RecipeList.js';
fs.copyFileSync(tc_RecipeList_DEV, tc_RecipeList);

const tc_RecipeSingle_DEV = './type-czech-jsx/RecipeDisplay/tc_RecipeSingle_DEV.js';
const tc_RecipeSingle = './type-czech-jsx/RecipeDisplay/tc_RecipeSingle.js';
fs.copyFileSync(tc_RecipeSingle_DEV, tc_RecipeSingle);

const tc_CookRecipes_DEV = './type-czech-jsx/tc_CookRecipes_DEV.js';
const tc_CookRecipes = './type-czech-jsx/tc_CookRecipes.js';
fs.copyFileSync(tc_CookRecipes_DEV, tc_CookRecipes);

const tc_HomeRecipes_DEV = './type-czech-jsx/tc_HomeRecipes_DEV.js';
const tc_HomeRecipes = './type-czech-jsx/tc_HomeRecipes.js';
fs.copyFileSync(tc_HomeRecipes_DEV, tc_HomeRecipes);





