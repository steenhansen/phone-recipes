
const { safeEmail, MAX_TEST_AJAX_DELAY_SEC } = require("../import-2-require/common-2-require");

module.exports = {
  PRE_getCookComments, POST_getCookComments,
  PRE_removeComment, POST_removeComment,
  PRE_deleteCommentsOnRecipe, POST_deleteCommentsOnRecipe,
  PRE_addComment, POST_addComment,
  PRE_getOneComment, POST_getOneComment,
  PRE_getRecipeComments, POST_getRecipeComments
};

const { type_czech } = require('../import-2-require/make-Type-Czech-require.js');

const {
  SPEC_RECIPE_COMMENTS_TYPE, SPEC_RECIPE_COMMENTS_EMPTY,
  SPEC_DELETE_COUNT, SPEC_NEW_COMMENT_TYPE,
  SPEC_NEW_COMMENT_EMPTY,
  SPEC_RECIPE_TYPES,
  SPEC_RECIPE_EMPTIES
} = require('../import-2-require/tc-types-2-require');

function PRE_getCookComments(cook) {
  const type_issue = type_czech.checkParam_type(cook, 'string')
  if (type_issue)
    return type_issue
  if (!safeEmail(cook))
    return `PRE_getCookComments cook name does not match safeEmail() ${cook}`
}

function POST_getCookComments(get_cook_promise) {
  if (!get_cook_promise instanceof Promise) {
    return 'POST_getCookComments A not returning promise, but : ' + get_cook_promise.toString();
  }
  let is_resolved = false;
  get_cook_promise.then(
    cook_comments => {
      is_resolved = true;

      const type_err = type_czech.checkArray_objType0n(cook_comments, SPEC_RECIPE_COMMENTS_TYPE);
      if (type_err)
        type_czech.check_assert(`POST_getCookComments B ` + type_err);

      const empty_issue = type_czech.checkArray_objEmpty0n(cook_comments, SPEC_RECIPE_COMMENTS_EMPTY);
      if (empty_issue)
        type_czech.check_assert(`POST_getCookComments C ` + empty_issue);

    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_getCookComments D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_removeComment(comment_id) {
  const type_issue = type_czech.checkParam_type(comment_id, 'string')
  if (type_issue)
    return type_issue
  //                                  cook@gmail.com~RECIPE-TITLE~commenter@gmail.com~THE-REMARK
  const cook_title_commenter_remark = /^[^@]+@[^~]+~[^~]+~[^@]+@[^~]+~.+$/;
  if (!comment_id.match(cook_title_commenter_remark)) {
    type_czech.check_assert(`PRE_removeComment A did not match "cook@gmail.com~RECIPE-TITLE~commenter@gmail.com~THE-REMARK" but ${comment_id}`);
  }
}

function POST_removeComment(del_comment_promise) {
  if (!del_comment_promise instanceof Promise) {
    return 'POST_removeComment A not returning promise, but : ' + del_comment_promise.toString();
  }
  let is_resolved = false;
  del_comment_promise.then(
    del_comment => {
      is_resolved = true;
      type_err = type_czech.checkParam_type(del_comment, SPEC_RECIPE_TYPES);
      if (type_err) {
        type_czech.check_assert(`POST_removeComment B did not resolve to an array, but ` + typeof del_comment);
      }
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_removeComment C did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_deleteCommentsOnRecipe(user_recipe) {
  const type_issue = type_czech.checkParam_type(user_recipe, 'string')
  if (type_issue)
    return type_issue
  const empty_issue = type_czech.checkParam_empty(user_recipe, 'EMPTY-ERROR')
  if (empty_issue)
    return empty_issue
}

function POST_deleteCommentsOnRecipe(recipe_comments_promise) {
  if (!recipe_comments_promise instanceof Promise) {
    return 'POST_deleteCommentsOnRecipe A not returning promise, but : ' + cook_promise.toString();
  }
  let is_resolved = false;
  recipe_comments_promise.then(
    recipe_comments => {
      is_resolved = true;
      type_err = type_czech.checkParam_type(recipe_comments, SPEC_DELETE_COUNT);
      if (type_err) {
        type_czech.check_assert(`POST_deleteCommentsOnRecipe B did not resolve to an array, but ` + typeof recipe_comments);
      }
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_deleteCommentsOnRecipe C did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_addComment(new_comment) {
  const type_issue = type_czech.checkParam_type(new_comment, SPEC_NEW_COMMENT_TYPE)
  if (type_issue)
    return type_issue

  //                       cook@gmail.com~RECIPE-TITLE~
  const cook_title = /^[^@]+@[^~]+~[^~]+~$/;
  if (!new_comment.recipe_id.match(cook_title)) {
    type_czech.check_assert(`PRE_addComment A did not match "cook@gmail.com~RECIPE-TITLE~" but ${new_comment.recipe_id}`);
  }

  const empty_issue = type_czech.checkParam_empty(new_comment, SPEC_NEW_COMMENT_EMPTY)
  if (empty_issue)
    return empty_issue
}

function POST_addComment(add_comments_promise) {
  if (!add_comments_promise instanceof Promise) {
    return 'POST_addComment A not returning promise, but : ' + add_comments_promise.toString();
  }
  let is_resolved = false;
  add_comments_promise.then(
    recipe_comments => {
      is_resolved = true;
      type_err = type_czech.checkParam_typeEither(recipe_comments, [SPEC_RECIPE_TYPES, SPEC_RECIPE_COMMENTS_TYPE]);
      if (type_err) {
        type_czech.check_assert(`POST_addComment B ${type_err}`);
      }
      empty_err = type_czech.checkParam_emptyEither(recipe_comments, [SPEC_RECIPE_EMPTIES, SPEC_RECIPE_COMMENTS_EMPTY]);
      if (empty_err) {
        type_czech.check_assert(`POST_addComment C ${empty_err}`);
      }
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_addComment C did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_getOneComment(comment_id) {
  const type_issue = type_czech.checkParam_type(comment_id, 'string')
  if (type_issue)
    return type_issue
  const empty_issue = type_czech.checkParam_empty(comment_id, 'EMPTY-ERROR')
  if (empty_issue)
    return empty_issue
}

function POST_getOneComment(add_comments_promise) {
  if (!add_comments_promise instanceof Promise) {
    return 'POST_addComment A not returning promise, but : ' + add_comments_promise.toString();
  }
  let is_resolved = false;
  add_comments_promise.then(
    one_comment => {
      is_resolved = true;
      if (one_comment.length > 0) {
        type_err = type_czech.checkParam_type(one_comment, [SPEC_RECIPE_COMMENTS_TYPE]);
        if (type_err) {
          type_czech.check_assert(`POST_getOneComment B ${type_err}`);
        }
        empty_err = type_czech.checkParam_empty(one_comment, [SPEC_RECIPE_COMMENTS_EMPTY]);
        if (empty_err) {
          type_czech.check_assert(`POST_getOneComment C ${empty_err}`);
        }
      }
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_getOneComment C did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}

function PRE_getRecipeComments(recipe_id) {

  const type_issue = type_czech.checkParam_type(recipe_id, 'string')
  if (type_issue)
    return type_issue

  //                                  cook@gmail.com~RECIPE-TITLE~
  const cook_title = /^[^@]+@[^~]+~[^~]+~$/;
  if (!recipe_id.match(cook_title)) {
    type_czech.check_assert(`PRE_getRecipeComments A did not match "cook@gmail.com~RECIPE-TITLE~" but ${recipe_id}`);
  }
}

function POST_getRecipeComments(recipe_comments_promise) {
  if (!recipe_comments_promise instanceof Promise) {
    return 'POST_getRecipeComments A not returning promise, but : ' + recipe_comments_promise.toString();
  }
  let is_resolved = false;
  recipe_comments_promise.then(
    recipe_comments => {
      is_resolved = true;
      const type_err = type_czech.checkArray_objType0n(recipe_comments, SPEC_RECIPE_COMMENTS_TYPE);
      if (type_err)
        type_czech.check_assert(`POST_getRecipeComments B ` + type_err);

      const empty_issue = type_czech.checkArray_objEmpty0n(recipe_comments, SPEC_RECIPE_COMMENTS_EMPTY);
      if (empty_issue)
        type_czech.check_assert(`POST_getRecipeComments C ` + empty_issue);
    });
  setTimeout(() => is_resolved ? ''
    : type_czech.check_assert(`POST_getRecipeComments D did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`)
    , MAX_TEST_AJAX_DELAY_SEC);
}