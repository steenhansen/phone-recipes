
const { safeEmail, MAX_TEST_AJAX_DELAY_SEC } = require("../import-2-require/common-2-require");

const { VALID_REDUCERS, FILTER_FIRST_SECTION } = require('../import-2-require/common-2-require');
const { SPEC_POST_TO_DB_TYPE, SPEC_POST_TO_DB_EMPTY,
  SPEC_RETITLED_TYPE, SPEC_RETITLED_EMPTY,
  SPEC_RECIPE_TYPES, SPEC_RECIPE_EMPTIES,
  SPEC_NEW_COMMENT_TYPE, SPEC_NEW_COMMENT_EMPTY,
  SPEC_DELETE_COUNT,
  SPEC_COMMENT_ID_TYPE, SPEC_COMMENT_ID_EMPTY
} = require('../import-2-require/tc-types-2-require');

const { type_czech } = require('../import-2-require/make-Type-Czech-require.js');

module.exports = {
  PRE_recordBrowserError,
  PRE_deleteServerComment, POST_deleteServerComment,
  PRE_deleteServerRecipe, POST_deleteServerRecipe,
  PRE_addServerComment, POST_addServerComment,
  PRE_reTitleServerRecipe, POST_reTitleServerRecipe,
  PRE_changeServerRecipe, POST_changeServerRecipe,
  PRE_addServerRecipe, POST_addServerRecipe,
  PRE_postToDb, POST_postToDb,
  PRE_getFromDb, POST_getFromDb
};

function PRE_recordBrowserError(auth_email, req_body) {
  const type_issue = type_czech.checkParam_type([auth_email, req_body], ['string', { browser_error: 'string' }])
  if (type_issue)
    return type_issue

  const empty_issue = type_czech.checkParam_empty(req_body, { browser_error: 'EMPTY-ERROR' })
  if (empty_issue)
    return empty_issue;
}

function PRE_deleteServerComment(auth_email, req_body) {
  const type_issue = type_czech.checkParam_type([auth_email, req_body], ['string', SPEC_COMMENT_ID_TYPE])
  if (type_issue)
    return type_issue

  if (!safeEmail(auth_email))
    return `PRE_deleteServerComment cook name does not match safeEmail() ${cook}`

  const empty_issue = type_czech.checkParam_empty(req_body, SPEC_COMMENT_ID_EMPTY)
  if (empty_issue)
    return empty_issue;
}

function POST_deleteServerComment(delete_comment_promise) {
  if (!delete_comment_promise instanceof Promise) {
    return 'POST_deleteServerComment A not returning promise, but : ' + delete_comment_promise.toString();
  }
  let is_resolved = false;
  delete_comment_promise.then(
    delete_comment => {
      is_resolved = true;
      const type_issue = type_czech.checkParam_type(delete_comment, SPEC_DELETE_COUNT);
      if (type_issue)
        return type_issue
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_deleteServerComment D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_deleteServerRecipe(auth_email, req_body) {
  const type_issue = type_czech.checkParam_type([auth_email, req_body], ['string', SPEC_COMMENT_ID_TYPE])
  if (type_issue)
    return type_issue

  if (!safeEmail(auth_email))
    return `PRE_deleteServerRecipe cook name does not match safeEmail() ${auth_email}`

  const empty_issue = type_czech.checkParam_empty(req_body, SPEC_COMMENT_ID_EMPTY)
  if (empty_issue)
    return empty_issue;
}

function POST_deleteServerRecipe(delete_recipe_promise) {
  if (!delete_recipe_promise instanceof Promise) {
    return 'POST_deleteServerRecipe A not returning promise, but : ' + delete_recipe_promise.toString();
  }
  let is_resolved = false;
  delete_recipe_promise.then(
    delete_recipe => {
      is_resolved = true;
      const type_issue = type_czech.checkParam_type(delete_recipe, SPEC_DELETE_COUNT);
      if (type_issue)
        return type_issue
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_deleteServerRecipe D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_addServerComment(auth_email, req_body) {
  const type_issue = type_czech.checkParam_type([auth_email, req_body], ['string', SPEC_NEW_COMMENT_TYPE])
  if (type_issue)
    return type_issue
  if (!safeEmail(auth_email))
    return `PRE_addServerComment cook name does not match safeEmail() ${auth_email}`
  const empty_issue = type_czech.checkParam_empty(req_body, SPEC_NEW_COMMENT_EMPTY)
  if (empty_issue)
    return empty_issue;
}

function POST_addServerComment(add_comment_promise) {
  if (!add_comment_promise instanceof Promise) {
    return 'POST_addServerComment A not returning promise, but : ' + add_comment_promise.toString();
  }
  let is_resolved = false;
  add_comment_promise.then(
    reTitle_recipe => {
      is_resolved = true;
      const type_issue = type_czech.checkParam_type(reTitle_recipe, SPEC_NEW_COMMENT_TYPE);
      if (type_issue)
        return type_issue
      const empty_issue = type_czech.checkParam_emptyEither(reTitle_recipe, SPEC_NEW_COMMENT_EMPTY)
      if (empty_issue)
        return empty_issue;
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_addServerComment D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_reTitleServerRecipe(auth_email, req_body) {
  const type_issue = type_czech.checkParam_type([auth_email, req_body], ['string', SPEC_RETITLED_TYPE])
  if (type_issue)
    return type_issue
  if (!safeEmail(auth_email))
    return `PRE_reTitleServerRecipe cook name does not match safeEmail() ${auth_email}`
  const empty_issue = type_czech.checkParam_empty(req_body, SPEC_RETITLED_EMPTY)
  if (empty_issue)
    return empty_issue;
}

function POST_reTitleServerRecipe(reTitle_recipe_promise) {
  if (!reTitle_recipe_promise instanceof Promise) {
    return 'POST_reTitleServerRecipe A not returning promise, but : ' + reTitle_recipe_promise.toString();
  }
  let is_resolved = false;
  reTitle_recipe_promise.then(
    reTitle_recipe => {
      is_resolved = true;
      const type_issue = type_czech.checkParam_type(reTitle_recipe, SPEC_RETITLED_TYPE);
      if (type_issue)
        return type_issue
      const empty_issue = type_czech.checkParam_emptyEither(reTitle_recipe, SPEC_RETITLED_EMPTY)
      if (empty_issue)
        return empty_issue;
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_reTitleServerRecipe D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_changeServerRecipe(auth_email, req_body) {
  const type_issue = type_czech.checkParam_type([auth_email, req_body], ['string', SPEC_RECIPE_TYPES])
  if (type_issue)
    return type_issue
  if (!safeEmail(auth_email))
    return `PRE_changeServerRecipe cook name does not match safeEmail() ${auth_email}`
  const empty_issue = type_czech.checkParam_empty(req_body, SPEC_RECIPE_EMPTIES)
  if (empty_issue)
    return empty_issue;
}

function POST_changeServerRecipe(change_recipe_promise) {
  if (!change_recipe_promise instanceof Promise) {
    return 'POST_addServerRecipe A not returning promise, but : ' + change_recipe_promise.toString();
  }
  let is_resolved = false;
  change_recipe_promise.then(
    added_recipe => {
      is_resolved = true;
      const type_issue = type_czech.checkParam_type(added_recipe, SPEC_RECIPE_TYPES);
      if (type_issue)
        return type_issue
      const empty_issue = type_czech.checkParam_emptyEither(added_recipe, SPEC_RECIPE_EMPTIES)
      if (empty_issue)
        return empty_issue;
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_addServerRecipe D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_addServerRecipe(auth_email, req_body) {
  const type_issue = type_czech.checkParam_type([auth_email, req_body], ['string', SPEC_RECIPE_TYPES])
  if (type_issue)
    return type_issue
  if (!safeEmail(auth_email))
    return `PRE_getCookComments cook name does not match safeEmail() ${auth_email}`

  const empty_issue = type_czech.checkParam_empty(req_body, SPEC_RECIPE_EMPTIES)
  if (empty_issue)
    return empty_issue;
}

function POST_addServerRecipe(add_recipe_promise) {
  if (!add_recipe_promise instanceof Promise) {
    return 'POST_addServerRecipe A not returning promise, but : ' + add_recipe_promise.toString();
  }
  let is_resolved = false;
  add_recipe_promise.then(
    added_recipe => {
      is_resolved = true;
      const type_issue = type_czech.checkParam_type(added_recipe, SPEC_RECIPE_TYPES);
      if (type_issue)
        return type_issue
      const empty_issue = type_czech.checkParam_emptyEither(added_recipe, SPEC_RECIPE_EMPTIES)
      if (empty_issue)
        return empty_issue;
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_addServerRecipe D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_postToDb(req, res) {
  const { url, body } = req;
  const no_slash_url = url.substring(1);
  if (!VALID_REDUCERS.includes(no_slash_url)) {
    return `Reducer is invalid name '${url}'`
  }
  const type_err = type_czech.checkParam_typeEither(body, SPEC_POST_TO_DB_TYPE);
  if (type_err)
    return type_err;

  const empty_issue = type_czech.checkParam_emptyEither(body, SPEC_POST_TO_DB_EMPTY)
  if (empty_issue)
    return empty_issue;
}

function POST_postToDb(change_promise) {
  if (!change_promise instanceof Promise) {
    return 'PRE_postToDb A not returning promise, but : ' + change_promise.toString();
  }
  let is_resolved = false;
  change_promise.then(
    recipe_data => {

      is_resolved = true;
      const type_err = type_czech.checkParam_type(recipe_data, SPEC_RECIPE_TYPES);
      if (type_err) return type_err;
      const empty_issue = type_czech.checkParam_empty(recipe_data, SPEC_RECIPE_EMPTIES)
      if (empty_issue)
        return empty_issue;

    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_postToDb D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

//  PRE_getFromDb /get-api/dessert/chinese/omnivore/cat
function PRE_getFromDb(get_filter_request) {
  const get_url = get_filter_request.originalUrl
  const type_issue = type_czech.checkParam_type(get_url, "string");
  if (type_issue)
    return type_issue
  const slash_regex = /\//g;
  const slash_arr = get_url.match(slash_regex);
  const num_slash = slash_arr.length;
  if (num_slash !== 5)
    return `PRE_getFromDb did not match filter url '${get_url}'`
  const get_filter_url = '/' + FILTER_FIRST_SECTION + '/';
  if (!get_url.startsWith(get_filter_url))
    return `PRE_getFromDb did not start with /'${FILTER_FIRST_SECTION}'`
}

function POST_getFromDb(recipes_promise) {
  if (!recipes_promise instanceof Promise) {
    return 'POST_getFromDb A not returning promise, but : ' + recipes_promise.toString();
  }
  let is_resolved = false;
  recipes_promise.then(
    filtered_recipes => {
      is_resolved = true;
      const { sorted_recipes, count_recipes } = filtered_recipes;
      const type_err = type_czech.checkArray_objType0n(sorted_recipes, SPEC_RECIPE_TYPES);
      if (type_err)
        type_czech.check_assert(`POST_getFromDb B ` + type_err);
      const empty_issue = type_czech.checkArray_objEmpty0n(sorted_recipes, SPEC_RECIPE_EMPTIES);
      if (empty_issue)
        type_czech.check_assert(`POST_getFromDb C ` + empty_issue);

      const count_err = type_czech.checkParam_type(count_recipes, 'number');
      if (count_err)
        type_czech.check_assert(`POST_getFromDb D ` + count_err);
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_getFromDb D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}




