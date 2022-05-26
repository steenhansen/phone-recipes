const { type_czech } = require("../import-2-require/make-Type-Czech-require.js");

const { safeEmail, ID_SEPARATOR, MAX_TEST_AJAX_DELAY_SEC } = require("../import-2-require/common-2-require");

const {
  SPEC_RECIPE_COMMENTS_TYPE,
  SPEC_RECIPE_COMMENTS_EMPTY,
  SPEC_DELETE_COUNT,
  SPEC_RECIPE_TYPES,
  SPEC_TITLE_TYPES,
  SPEC_RECIPE_EMPTIES,
  SPEC_TITLE_EMPTY,
} = require("../import-2-require/tc-types-2-require");

function PRE_changeRecipe(edited_recipe) {
  const type_issue = type_czech.checkParam_typeEither(edited_recipe, [SPEC_RECIPE_TYPES, SPEC_TITLE_TYPES]);
  if (type_issue) return type_issue;

  const empty_issue = type_czech.checkParam_emptyEither(edited_recipe, [SPEC_RECIPE_EMPTIES, SPEC_TITLE_EMPTY]);
  if (empty_issue) return empty_issue;
}

function POST_changeRecipe(recipe_promise) {
  if (!recipe_promise instanceof Promise) {
    return "POST_changeRecipe A not returning promise, but : " + recipe_promise.toString();
  }
  let is_resolved = false;

  recipe_promise.then((changed_recipe) => {
    is_resolved = true;
    const type_err = type_czech.checkParam_typeEither(changed_recipe, [SPEC_RECIPE_TYPES, SPEC_TITLE_TYPES]);
    if (type_err) type_czech.check_assert(` is not a correct recipe, but ` + type_err);
    const empty_issue = type_czech.checkParam_emptyEither(changed_recipe, [SPEC_RECIPE_EMPTIES, SPEC_TITLE_EMPTY]);
    if (empty_issue) type_czech.check_assert(`POST_changeRecipe C has EMPTY errors ` + empty_issue);
  });

  setTimeout(
    () =>
      is_resolved
        ? "POST_changeRecipe D just fine thank you" // ''
        : type_czech.check_assert(`POST_changeRecipe E did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`),
    MAX_TEST_AJAX_DELAY_SEC
  );
}

function PRE_reTitleRecipe(re_titled_recipe, old_title) {
  const the_params = [re_titled_recipe, old_title];
  const the_signature = [SPEC_RECIPE_TYPES, "string"];
  const type_issue = type_czech.checkParam_type(the_params, the_signature);
  if (type_issue) return type_issue;

  const empty_issue = type_czech.checkParam_empty(the_params, [SPEC_RECIPE_EMPTIES, "EMPTY-ERROR"]);
  if (empty_issue) return empty_issue;
}

function POST_reTitleRecipe(re_title_promise) {
  if (!re_title_promise instanceof Promise) {
    return "POST_reTitleRecipe A not returning promise, but : " + re_title_promise.toString();
  }
  let is_resolved = false;

  re_title_promise.then((re_titled) => {
    is_resolved = true;

    const type_err = type_czech.checkParam_type(re_titled, SPEC_RECIPE_TYPES);
    if (type_err) type_czech.check_assert(`POST_reTitleRecipe B is not a correct recipe, but ` + type_err);

    const empty_issue = type_czech.checkParam_empty(re_titled, SPEC_RECIPE_EMPTIES);
    if (empty_issue) type_czech.check_assert(`POST_reTitleRecipe C has EMPTY errors ` + empty_issue);
  });

  setTimeout(
    () =>
      is_resolved
        ? "POST_reTitleRecipe D just fine thank you" // ''
        : type_czech.check_assert(`POST_reTitleRecipe E did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`),
    MAX_TEST_AJAX_DELAY_SEC
  );
}

function PRE_newRecipe(new_recipe) {
  const plain_recipe = JSON.parse(JSON.stringify(new_recipe));
  const type_issue = type_czech.checkParam_typeEither(plain_recipe, [SPEC_RECIPE_TYPES, SPEC_TITLE_TYPES]);
  if (type_issue) return type_issue; ///                   this is corret when delete a comment

  const empty_issue = type_czech.checkParam_emptyEither(plain_recipe, [SPEC_RECIPE_EMPTIES, SPEC_TITLE_EMPTY]);
  if (empty_issue) return empty_issue;
}

function POST_newRecipe(save_promise) {
  if (!save_promise instanceof Promise) {
    return "POST_newRecipe A not returning promise, but : " + save_promise.toString();
  }
  let is_resolved = false;

  save_promise.then((saved_recipe) => {
    is_resolved = true;

    const type_err = type_czech.checkParam_type(saved_recipe, SPEC_RECIPE_TYPES);
    if (type_err) type_czech.check_assert(`POST_newRecipe B is not a correct recipe, but ` + type_err);

    const empty_issue = type_czech.checkParam_empty(saved_recipe, SPEC_RECIPE_EMPTIES);
    if (empty_issue) type_czech.check_assert(`POST_newRecipe C has EMPTY errors ` + empty_issue);
  });

  setTimeout(
    () =>
      is_resolved
        ? "POST_newRecipe D just fine thank you"
        : type_czech.check_assert(`POST_newRecipe E did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`),
    MAX_TEST_AJAX_DELAY_SEC
  );
}

function PRE_getOneRecipe(recipe_id) {
  const type_issue = type_czech.checkParam_type(recipe_id, "string");
  if (type_issue) return type_issue;
  const recipe_arr = recipe_id.split(ID_SEPARATOR);
  const type_issue2 = type_czech.checkParam_type(recipe_arr, ["string", "string", "string"]);
  if (type_issue2) return type_issue2;
  const [cook, title] = recipe_arr;
  if (!safeEmail(cook)) return `PRE_getOneRecipe A Cook name does not match safeEmail() -  - ${cook}`;
  if (!title.length > 0) return `PRE_getOneRecipe B title is empty  - ${title}`;
}

function POST_getOneRecipe(delete_promise) {
  if (!delete_promise instanceof Promise) {
    return "POST_getOneRecipe A not returning promise, but : " + delete_promise.toString();
  }
  let is_resolved = false;
  delete_promise.then((recipe_array) => {
    is_resolved = true;
    const array_err = type_czech.checkParam_type(recipe_array, "array");
    if (array_err) array_err.check_assert(`POST_getOneRecipe B is not a correct recipe, but ` + array_err);
    if (recipe_array.length !== 0) {
      const type_err = type_czech.checkParam_type(recipe_array[0], SPEC_RECIPE_TYPES);
      if (type_err) type_czech.check_assert(`POST_getOneRecipe C is not a correct recipe, but ` + type_err);
      const empty_issue = type_czech.checkParam_empty(recipe_array[0], SPEC_RECIPE_EMPTIES);
      if (empty_issue) type_czech.check_assert(`POST_getOneRecipe D has EMPTY errors ` + empty_issue);
    }
  });
  setTimeout(
    () =>
      is_resolved
        ? "POST_getOneRecipe D just fine thank you" // ''
        : type_czech.check_assert(`POST_getOneRecipe E did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`),
    MAX_TEST_AJAX_DELAY_SEC
  );
}

function PRE_deleteRecipe(recipe_id) {
  const type_issue = type_czech.checkParam_type(recipe_id, "string");
  if (type_issue) return type_issue;
  const recipe_arr = recipe_id.split(ID_SEPARATOR);
  const type_issue2 = type_czech.checkParam_type(recipe_arr, ["string", "string", "string"]);
  if (type_issue2) return type_issue2;
  const [cook, title] = recipe_arr;
  if (!safeEmail(cook)) return `PRE_deleteRecipe A Cook name does not match safeEmail() -  - ${cook}`;
  if (!title.length > 0) return `PRE_deleteRecipe B title is empty  - ${title}`;
}

function POST_deleteRecipe(delete_promise) {
  if (!delete_promise instanceof Promise) {
    return "POST_deleteRecipe A not returning promise, but : " + delete_promise.toString();
  }
  let is_resolved = false;
  delete_promise.then((delete_counts) => {
    is_resolved = true;
    const type_issue = type_czech.checkParam_type(delete_counts, SPEC_DELETE_COUNT);
    if (type_issue) type_czech.check_assert(`POST_deleteRecipe B is not a correct recipe, but ` + type_issue);
  });

  setTimeout(
    () =>
      is_resolved
        ? "POST_deleteRecipe C just fine thank you" // ''
        : type_czech.check_assert(`POST_deleteRecipe D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`),
    MAX_TEST_AJAX_DELAY_SEC
  );
}

function PRE_getCooksRecipes(cook) {
  const type_issue = type_czech.checkParam_type(cook, "string");
  if (type_issue) return type_issue;
  if (!safeEmail(cook)) return `Cook name does not match safeEmail() - recipes - ${cook}`;
}

function POST_getCooksRecipes(cook_promise) {
  if (!cook_promise instanceof Promise) {
    return "POST_getCooksRecipes A not returning promise, but : " + cook_promise.toString();
  }
  let is_resolved = false;
  cook_promise.then((cook_recipes) => {
    is_resolved = true;
    const { sorted_recipes, count_recipes } = cook_recipes;
    const type_err = type_czech.checkArray_objType0n(sorted_recipes, SPEC_RECIPE_TYPES);
    if (type_err) type_czech.check_assert(`POST_getCooksRecipes B ` + type_err);
    const empty_issue = type_czech.checkArray_objEmpty0n(sorted_recipes, SPEC_RECIPE_EMPTIES);
    if (empty_issue) type_czech.check_assert(`POST_getCooksRecipes C ` + empty_issue);

    const count_err = type_czech.checkParam_type(count_recipes, "number");
    if (count_err) type_czech.check_assert(`POST_getCooksRecipes D ` + count_err);
  });
  setTimeout(
    () => (is_resolved ? "" : type_czech.check_assert(`POST_getCooksRecipes E did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)),
    MAX_TEST_AJAX_DELAY_SEC
  );
}

function PRE_getFilteredRecipes(meal, cuisine, diet, find) {
  return type_czech.checkArgs_typeEach(arguments, "string");
}

function POST_getFilteredRecipes(recipes_promise) {
  if (!recipes_promise instanceof Promise) {
    return "POST_getFilteredRecipes A not returning promise, but : " + recipes_promise.toString();
  }
  let is_resolved = false;
  recipes_promise.then((filtered_recipes) => {
    const { sorted_recipes, count_recipes } = filtered_recipes;
    is_resolved = true;
    const type_err = type_czech.checkArray_objType0n(sorted_recipes, SPEC_RECIPE_TYPES);
    if (type_err) type_czech.check_assert(`POST_getFilteredRecipes B ` + type_err);
    const empty_issue = type_czech.checkArray_objEmpty0n(sorted_recipes, SPEC_RECIPE_EMPTIES);
    if (empty_issue) type_czech.check_assert(`POST_getFilteredRecipes C ` + empty_issue);

    const count_err = type_czech.checkParam_type(count_recipes, "number");
    if (count_err) type_czech.check_assert(`POST_getFilteredRecipes D ` + count_err);
  });
  setTimeout(
    () => (is_resolved ? "" : type_czech.check_assert(`POST_getFilteredRecipes E did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)),
    MAX_TEST_AJAX_DELAY_SEC
  );
}

function PRE_remakeOldComments(poss_comments, new_title, old_title) {
  const type_err = type_czech.checkArray_objType0n(poss_comments, SPEC_RECIPE_COMMENTS_TYPE);
  if (type_err) type_czech.check_assert(`PRE_remakeOldComments A-poss_comments ` + type_err);
  const empty_issue = type_czech.checkArray_objEmpty0n(poss_comments, SPEC_RECIPE_COMMENTS_EMPTY);
  if (empty_issue) type_czech.check_assert(`PRE_remakeOldComments B-poss_comments ` + empty_issue);

  const the_params = [poss_comments, new_title, old_title];

  const type_title = type_czech.checkParam_type(the_params, ["array", "string", "string"]);
  if (type_title) return type_title;
  const empty_title = type_czech.checkParam_empty(the_params, ["IG", "EMPTY-ERROR", "EMPTY-ERROR"]);
  if (empty_title) return empty_title;
}

function POST_remakeOldComments(save_promise) {
  if (!save_promise instanceof Promise) {
    return "POST_remakeOldComments A not returning promise, but : " + save_promise.toString();
  }
  let is_resolved = false;

  save_promise.then((comment_ids) => {
    is_resolved = true;
    const type_issue00 = type_czech.checkParam_type(comment_ids, "array"); // GOOD !!!!
    if (type_issue00) return type_issue00;
    if (comment_ids.length === 0) return "";
    const type_err = type_czech.checkParam_type(comment_ids, ["strings"]);
    if (type_err) type_czech.check_assert(`POST_remakeOldComments B is not a correct recipe, but ` + type_err);
  });

  setTimeout(
    () =>
      is_resolved
        ? "POST_remakeOldComments D just fine thank you" // ''
        : type_czech.check_assert(`POST_remakeOldComments E did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`),
    MAX_TEST_AJAX_DELAY_SEC
  );
}

module.exports = {
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
  type_czech,
};
