const { type_czech } = require("../import-2-require/make-Type-Czech-require.js");

const {
  SPEC_INGREDIENT_TYPE,
  SPEC_INGREDIENT_EMPTY,
  SPEC_RECIPE_TYPES,
  SPEC_TITLE_TYPES,
  SPEC_RECIPE_EMPTIES,
  SPEC_TITLE_EMPTY,
} = require("./tc-types-2-require");

module.exports = {
  PRE_safeIngredients,
  POST_safeIngredients,
  PRE_safeSearch,
  POST_safeSearch,
  PRE_safeRecipe,
  POST_safeRecipe,
};

function PRE_safeIngredients(ingredients) {
  const id_less_ingredients = [];
  for (const an_ingredient of ingredients) {
    const { ingredient, amount } = an_ingredient;
    const no_id = { ingredient, amount };
    id_less_ingredients.push(no_id);
  }
  const type_issue = type_czech.checkArray_objType0n(id_less_ingredients, SPEC_INGREDIENT_TYPE);

  if (type_issue) return type_issue;

  const empty_issue = type_czech.checkArray_objEmpty0n(id_less_ingredients, SPEC_INGREDIENT_EMPTY);
  if (empty_issue) return empty_issue;
}

function POST_safeIngredients(safe_ingredients) {
  const type_issue = type_czech.checkArray_objType0n(safe_ingredients, SPEC_INGREDIENT_TYPE);
  if (type_issue) return type_issue;

  const empty_issue = type_czech.checkArray_objEmpty0n(safe_ingredients, SPEC_INGREDIENT_EMPTY);
  if (empty_issue) return empty_issue;
}

function PRE_safeSearch(safe_title, steps, safe_ingredients) {
  const the_params = [safe_title, steps, safe_ingredients];

  const type_issue = type_czech.checkParam_type(the_params, ["string", "string", "array"]);
  if (type_issue) return type_issue;

  const empty_issue = type_czech.checkParam_empty(the_params, ["EMPTY-ERROR", "IG", "IG"]);
  if (empty_issue) return empty_issue;

  const id_less_ingredients = [];
  for (const an_ingredient of safe_ingredients) {
    const { ingredient, amount } = an_ingredient;
    const no_id = { ingredient, amount };
    id_less_ingredients.push(no_id);
  }

  const type_issue_ing = type_czech.checkArray_objType0n(id_less_ingredients, SPEC_INGREDIENT_TYPE);
  if (type_issue_ing) return type_issue_ing;

  const empty_issue_ing = type_czech.checkArray_objEmpty0n(id_less_ingredients, SPEC_INGREDIENT_EMPTY);
  if (empty_issue_ing) return empty_issue_ing;
}

function POST_safeSearch(safe_string) {
  const type_issue = type_czech.checkParam_type(safe_string, "string");
  if (type_issue) return type_issue;

  const empty_issue = type_czech.checkParam_empty(safe_string, "EMPTY-ERROR");
  if (empty_issue) return empty_issue;
}

function PRE_safeRecipe(unsafe_recipe) {
  const type_issue = type_czech.checkParam_typeEither(unsafe_recipe, [SPEC_RECIPE_TYPES, SPEC_TITLE_TYPES]);
  if (type_issue) return type_issue;

  const empty_issue = type_czech.checkParam_emptyEither(unsafe_recipe, [SPEC_RECIPE_EMPTIES, SPEC_TITLE_EMPTY]);
  if (empty_issue) return empty_issue;
}

function POST_safeRecipe(safe_recipe) {
  const type_issue = type_czech.checkParam_typeEither(safe_recipe, [SPEC_RECIPE_TYPES, SPEC_TITLE_TYPES]);
  if (type_issue) return type_issue;

  const empty_issue = type_czech.checkParam_emptyEither(safe_recipe, [SPEC_RECIPE_EMPTIES, SPEC_TITLE_EMPTY]);
  if (empty_issue) return empty_issue;
}
