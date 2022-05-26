export {
  SPEC_ERROR_ID_TYPE,
  SPEC_COMMENT_ID_EMPTY,
  SPEC_INGREDIENT_TYPE,
  SPEC_INGREDIENT_EMPTY,
  SPEC_POST_TO_DB_TYPE,
  SPEC_POST_TO_DB_EMPTY,
  SPEC_RETITLED_TYPE,
  SPEC_RETITLED_EMPTY,
  SPEC_RECIPE_COMMENTS_TYPE,
  SPEC_RECIPE_COMMENTS_EMPTY,
  SPEC_RECIPE_ARRAY_COMMENTS_TYPE,
  SPEC_RECIPE_ARRAY_COMMENTS_EMPTY,
  SPEC_RECIPE_TYPES,
  SPEC_RECIPE_EMPTIES,
  SPEC_TITLE_TYPES,
  SPEC_TITLE_EMPTY,
  SPEC_NEW_COMMENT_TYPE,
  SPEC_NEW_COMMENT_EMPTY,
  SPEC_DELETE_COUNT,
  SPEC_COMMENT_ID_TYPE,
};

if (typeof symbol_does_not_exist === "symbol") {
  throw "tc-safe-recipe-2-import.js";
}

const SPEC_RECIPE_TYPES = {
  _id: "string",
  cook: "string",
  title: "string",
  search: "string",
  steps: "string",
  serves: "string",
  time: "string",
  meal: "string",
  cuisine: "string",
  diet: "string",
  internal: "string",
  minutes: "number",
  ingredients: "array",
  comments: "array",
};
const SPEC_RECIPE_EMPTIES = {
  _id: "EMPTY-ERROR",
  cook: "EMPTY-ERROR",
  title: "EMPTY-ERROR",
  search: "EMPTY-ERROR",
  steps: "IG",
  serves: "IG",
  time: "IG",
  meal: "IG",
  cuisine: "IG",
  diet: "IG",
  internal: "IG",
  minutes: "IG",
  ingredients: "IG",
  comments: "IG",
};

const SPEC_TITLE_TYPES = Object.assign({}, { old_title: "string" }, SPEC_RECIPE_TYPES);
const SPEC_TITLE_EMPTY = Object.assign({}, { old_title: "IG" }, SPEC_RECIPE_EMPTIES);

const SPEC_NEW_COMMENT_TYPE = { recipe_id: "string", by: "string", remark: "string", title: "string" };
const SPEC_NEW_COMMENT_EMPTY = { recipe_id: "EMPTY-ERROR", by: "EMPTY-ERROR", remark: "EMPTY-ERROR", title: "EMPTY-ERROR " };

const SPEC_COMMENT_ID_TYPE = { _id: "string" };
const SPEC_COMMENT_ID_EMPTY = { _id: "EMPTY-ERROR" };

const SPEC_ERROR_ID_TYPE = { browser_error: "string" };
const SPEC_ERROR_ID_EMPTY = { browser_error: "EMPTY-ERROR" };

const SPEC_RETITLED_TYPE = { re_titled_recipe: SPEC_RECIPE_TYPES, old_title: "string" };
const SPEC_RETITLED_EMPTY = { re_titled_recipe: SPEC_RECIPE_EMPTIES, old_title: "EMPTY-ERROR" };

const SPEC_POST_TO_DB_TYPE = [SPEC_RECIPE_TYPES, SPEC_TITLE_TYPES, SPEC_NEW_COMMENT_TYPE, SPEC_COMMENT_ID_TYPE, SPEC_RETITLED_TYPE, SPEC_ERROR_ID_TYPE];
const SPEC_POST_TO_DB_EMPTY = [SPEC_RECIPE_EMPTIES, SPEC_TITLE_EMPTY, SPEC_NEW_COMMENT_EMPTY, SPEC_COMMENT_ID_EMPTY, SPEC_RETITLED_EMPTY, SPEC_ERROR_ID_EMPTY];

const SPEC_RECIPE_COMMENTS_TYPE = { _id: "string", by: "string", title: "string" };
const SPEC_RECIPE_COMMENTS_EMPTY = { _id: "EMPTY-ERROR", by: "EMPTY-ERROR", title: "EMPTY-ERROR" };

const SPEC_RECIPE_ARRAY_COMMENTS_TYPE = { _id: "string", by: "string" };
const SPEC_RECIPE_ARRAY_COMMENTS_EMPTY = { _id: "EMPTY-ERROR", by: "EMPTY-ERROR" };

const SPEC_DELETE_COUNT = { deletedCount: "number" };

const SPEC_INGREDIENT_TYPE = { ingredient: "string", amount: "string" };
const SPEC_INGREDIENT_EMPTY = { ingredient: "EMPTY-ERROR", amount: "EMPTY-ERROR" };
