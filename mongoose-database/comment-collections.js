


Comments_coll = 'un-defined';



const { REMOVE_RECORD_VERSION, ID_SEPARATOR, commentIdToRecipeId, safeStrip } = require("../import-2-require/common-2-require");
const { PRE_getCookComments, POST_getCookComments,
  PRE_removeComment, POST_removeComment,
  PRE_deleteCommentsOnRecipe, POST_deleteCommentsOnRecipe,
  PRE_addComment, POST_addComment,
  PRE_getOneComment, POST_getOneComment,
  PRE_getRecipeComments, POST_getRecipeComments,
  type_czech } = require('./tc-comment-collections');

const { deVersionMongo } = require("./mongo-database");   

getCookComments = type_czech.linkUp(getCookComments, PRE_getCookComments, POST_getCookComments)
async function getCookComments(cook) {
  const mongo_comments = await Comments_coll.find({ by: { $eq: cook } }).select(REMOVE_RECORD_VERSION);
  const plain_comments = deVersionMongo(mongo_comments);  
  return plain_comments;
}

removeComment = type_czech.linkUp(removeComment, PRE_removeComment, POST_removeComment)
async function removeComment(comment_id) {
  const the_res = await Comments_coll.deleteOne({ _id: comment_id });
  const recipe_id = commentIdToRecipeId(comment_id);
  const comment_recipe = await getOneRecipe(recipe_id);
  if (comment_recipe[0]) {
    const edit_recipe = comment_recipe[0];
    const the_comments = edit_recipe.comments;
    const winnnowed_comments = the_comments.filter(a_comment => a_comment !== comment_id);
    edit_recipe.comments = winnnowed_comments;
    const mongo_del_comment = await edit_recipe.save();
    const plain_del_comment = deVersionMongo(mongo_del_comment);  
    return plain_del_comment;
  }
  return the_res;
}

deleteCommentsOnRecipe = type_czech.linkUp(deleteCommentsOnRecipe, PRE_deleteCommentsOnRecipe, POST_deleteCommentsOnRecipe)
async function deleteCommentsOnRecipe(user_recipe) {
  const startwith_user_recipe = new RegExp("^" + user_recipe);
  const recipe_comments = await Comments_coll.deleteMany({ _id: startwith_user_recipe });
  return recipe_comments;
}

addComment = type_czech.linkUp(addComment, PRE_addComment, POST_addComment)
async function addComment(new_comment) {
  const { recipe_id, by, remark } = new_comment;
  const safe_remark = safeStrip(remark);
  const _id = recipe_id + by + ID_SEPARATOR + safe_remark;
  const new_record = { _id, by }
  const created_comments0 = await Comments_coll.create(new_record);
  const created_comments = deVersionMongo(created_comments0);    
  delete created_comments['__v']
  const old_recipe = await Recipes_coll.findOne({ _id: recipe_id }).select(REMOVE_RECORD_VERSION);
  old_recipe.comments.push(_id);
  const new_recipe0 = await old_recipe.save();
  const new_recipe = deVersionMongo(new_recipe0);     
  delete new_recipe['__v']
  return new_recipe;
}

getOneComment = type_czech.linkUp(getOneComment, PRE_getOneComment, POST_getOneComment)
async function getOneComment(comment_id) {
  const with_blanks_id = comment_id.replace('%20', ' ')    // ?? valid?
  const mongo_comment = await Comments_coll.find({ _id: with_blanks_id }).select(REMOVE_RECORD_VERSION);
  const plain_comment = deVersionMongo(mongo_comment);  
  return plain_comment
}

getRecipeComments = type_czech.linkUp(getRecipeComments, PRE_getRecipeComments, POST_getRecipeComments)
async function getRecipeComments(recipe_id) {
  const startwith_recipe_id = new RegExp("^" + recipe_id)
  const mongo_comments = await Comments_coll.find({ _id: startwith_recipe_id }).select(REMOVE_RECORD_VERSION);
  const plain_comments = deVersionMongo(mongo_comments);  
  return plain_comments
}


async function countComments() {
  const count_comments = await Comments_coll.countDocuments();
  return count_comments;
}




module.exports = {
  getRecipeComments, getOneComment, removeComment,
  addComment, getCookComments, deleteCommentsOnRecipe, countComments
};

const { getOneRecipe } = require("./recipe-collections");




