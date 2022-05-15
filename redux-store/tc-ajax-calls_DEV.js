import { VALID_REDUCERS, MAX_TEST_AJAX_DELAY_SEC } from '../import-2-require/common-2-import.js';
import { type_czech } from '../import-2-require/make-Type-Czech-import';
import {
  SPEC_POST_TO_DB_TYPE,
  SPEC_RECIPE_TYPES, SPEC_RECIPE_EMPTIES
} from '../import-2-require/tc-types-2-import';

export {
  PRE_databasePost, POST_databasePost,
  PRE_databaseGet, POST_databaseGet
};

if (typeof symbol_does_not_exist === 'symbol') {
  throw 'tc-ajax-calls.js';
}

function PRE_databasePost(db_request, shared_csrfToken, json_data) {
  const type_issue = type_czech.checkParam_typeEither(json_data, SPEC_POST_TO_DB_TYPE);
  if (type_issue)
    return type_issue
  if (!VALID_REDUCERS.includes(db_request)) {
    return `Reducer is invalid name '${db_request}'`
  }
  if (shared_csrfToken === '')
    type_czech.check_assert(`PRE_databasePost A an empty csrf value ${shared_csrfToken}`);
}

function POST_databasePost(get_cook_promise) {
  if (!get_cook_promise instanceof Promise) {
    return 'POST_databasePost A not returning promise, but : ' + get_cook_promise.toString();
  }
  let is_resolved = false;
  get_cook_promise.then(
    cook_comments => {
      is_resolved = true;
      const type_issue = type_czech.checkParam_typeEither(cook_comments, SPEC_POST_TO_DB_TYPE);
      if (type_issue)
        return type_issue

    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_databasePost D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_databaseGet(recipe_filters) {
  const the_sig = { filter_meal: 'string', filter_cuisine: 'string', filter_diet: 'string', filter_text: 'string' };
  const type_issue = type_czech.checkParam_type(recipe_filters, the_sig)
  if (type_issue)
    return type_issue
}

function POST_databaseGet(recipes_promise) {
  if (!recipes_promise instanceof Promise) {
    return 'POST_databaseGet A not returning promise, but : ' + recipes_promise.toString();
  }
  let is_resolved = false;
  recipes_promise.then(
    filtered_recipes => {
      is_resolved = true;
      const { sorted_recipes, count_recipes } = filtered_recipes;
      const type_err = type_czech.checkArray_objType0n(sorted_recipes, SPEC_RECIPE_TYPES);
      if (type_err)
        type_czech.check_assert(`POST_databaseGet B did not resolve to an array, but ` + type_err);

      const empty_issue = type_czech.checkArray_objEmpty0n(sorted_recipes, SPEC_RECIPE_EMPTIES);
      if (empty_issue)
        type_czech.check_assert(`POST_databaseGet C did not resolve to an array, but ` + empty_issue);
      const count_err = type_czech.checkParam_type(count_recipes, 'number');
      if (count_err)
        type_czech.check_assert(`POST_databaseGet D ` + count_err);


    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_databaseGet E did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}
