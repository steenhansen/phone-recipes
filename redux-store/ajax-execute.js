const { getOneComment, removeComment, addComment } = require("../mongoose-database/comment-collections");
const { newRecipe, reTitleRecipe, deleteRecipe, changeRecipe, getOneRecipe, getFilteredRecipes } = require("../mongoose-database/recipe-collections");
const { getLoggedIn } = require("../passport-auth/auth-consts");
const { FAKE_TEST_GMAIL } = require("../import-2-require/common-2-require");
const {
  PRE_recordBrowserError,
  PRE_deleteServerComment,
  POST_deleteServerComment,
  PRE_deleteServerRecipe,
  POST_deleteServerRecipe,
  PRE_addServerComment,
  POST_addServerComment,
  PRE_reTitleServerRecipe,
  POST_reTitleServerRecipe,
  PRE_changeServerRecipe,
  POST_changeServerRecipe,
  PRE_addServerRecipe,
  POST_addServerRecipe,
  PRE_postToDb,
  POST_postToDb,
  PRE_getFromDb,
  POST_getFromDb,
} = require("./tc-ajax-execute");

const { type_czech } = require("../import-2-require/make-Type-Czech-require.js");
const { recordException } = require("../mongoose-database/uncaught-collections");

deleteServerComment = type_czech.linkUp(deleteServerComment, PRE_deleteServerComment, POST_deleteServerComment);
async function deleteServerComment(auth_email, req_body) {
  const { _id } = req_body;
  const comment_array = await getOneComment(_id);
  if (comment_array.length > 0) {
    const del_comment = comment_array[0];
    if (auth_email && auth_email === del_comment.by) {
      const result = await removeComment(_id);
      return result;
    }
  }
  return "delete error";
}

deleteServerRecipe = type_czech.linkUp(deleteServerRecipe, PRE_deleteServerRecipe, POST_deleteServerRecipe);
async function deleteServerRecipe(auth_email, req_body) {
  const { _id } = req_body;
  const lower_id = _id.toLowerCase();
  const recipe_array = await getOneRecipe(lower_id);
  if (recipe_array.length > 0) {
    const del_recipe = recipe_array[0];
    if (auth_email && auth_email === del_recipe.cook) {
      const result = await deleteRecipe(lower_id);
      return result;
    }
  }
  return "delete error";
}

addServerComment = type_czech.linkUp(addServerComment, PRE_addServerComment, POST_addServerComment);
async function addServerComment(auth_email, req_body) {
  if (auth_email && req_body.by === auth_email) {
    try {
      const result = await addComment(req_body);
      return result;
    } catch (e) {
      console.log("add server comment exception " + e);
      return e;
    }
  }
  return "comment error email error";
}

reTitleServerRecipe = type_czech.linkUp(reTitleServerRecipe, PRE_reTitleServerRecipe, POST_reTitleServerRecipe);
async function reTitleServerRecipe(auth_email, req_body) {
  const { re_titled_recipe, old_title } = req_body;
  const lower_old_id = old_title.toLowerCase();
  const the_cook = re_titled_recipe.cook;
  if (auth_email && the_cook === auth_email) {
    const reTitleRes = await reTitleRecipe(re_titled_recipe, lower_old_id);
    return reTitleRes;
  }
  return "reTitleServerRecipe error";
}

changeServerRecipe = type_czech.linkUp(changeServerRecipe, PRE_changeServerRecipe, POST_changeServerRecipe);
async function changeServerRecipe(auth_email, req_body) {
  const edited_recipe = req_body;
  const the_cook = edited_recipe.cook;
  if (auth_email && the_cook === auth_email) {
    const changeRes = await changeRecipe(edited_recipe);
    return changeRes;
  }
  return "change error";
}

addServerRecipe = type_czech.linkUp(addServerRecipe, PRE_addServerRecipe, POST_addServerRecipe);
async function addServerRecipe(auth_email, req_body) {
  const new_recipe = req_body;
  const the_cook = new_recipe.cook;
  if (auth_email && the_cook === auth_email) {
    const newRes = await newRecipe(new_recipe);
    return newRes;
  }
  return "add error";
}

recordBrowserError = type_czech.linkUp(recordBrowserError, PRE_recordBrowserError);
async function recordBrowserError(_auth_email, req_body) {
  recordException(req_body);
  return "record error";
}

postToDb = type_czech.linkUp(postToDb, PRE_postToDb, POST_postToDb);
async function postToDb(req, res) {
  let auth_email;
  if (global.GLOBAL_CONFIG.G_SELENIUM_TESTING) {
    auth_email = FAKE_TEST_GMAIL;
  } else {
    auth_email = getLoggedIn(req);
  }
  res.statusCode = 200;
  if (req.url === "/re-title-recipe") {
    return reTitleServerRecipe(auth_email, req.body);
  } else if (req.url === "/change-recipe") {
    return changeServerRecipe(auth_email, req.body);
  } else if (req.url === "/new-recipe") {
    return addServerRecipe(auth_email, req.body);
  } else if (req.url === "/delete-recipe") {
    return deleteServerRecipe(auth_email, req.body);
  } else if (req.url === "/add-comment") {
    return addServerComment(auth_email, req.body);
  } else if (req.url === "/remove-comment") {
    return deleteServerComment(auth_email, req.body);
  } else if (req.url === "/record-error") {
    return recordBrowserError(auth_email, req.body);
  }
  res.statusCode = 404;
  const post_error = "postToDb error" + req.url;
  return post_error;
}

getFromDb = type_czech.linkUp(getFromDb, PRE_getFromDb, POST_getFromDb);
async function getFromDb(req) {
  const the_url = req.originalUrl;
  const [_, _get_api_, meal, cuisine, diet, find] = the_url.split("/");
  const decoded_find = decodeURI(find);
  const my_json = await getFilteredRecipes(meal, cuisine, diet, decoded_find);
  return my_json;
}

module.exports = { postToDb, getFromDb };
