import { createStore } from "redux";
import {
  PRE_reduxChangeRecipe, POST_reduxChangeRecipe
} from './tc-recipe-store'
import { commentIdToRecipeId, ID_SEPARATOR } from "../import-2-require/common-2-import";
import { type_czech } from '../import-2-require/make-Type-Czech-import.js';
import { safeRecipe } from "../import-2-require/safe-recipe-2-import";

export {
  makeReduxStore, recipeReducer, reduxChangeRecipe, reduxReTitleRecipe,
  reduxCommentRemove, reduxNewRecipe, reduxCommentAdd, reduxDeleteRecipe, reduxFilteredRecipes
}

function reduxNewRecipe(state, action) {
  const next_recipes = [...state.current_recipes];
  const next_remarks = [...state.current_remarks];
  const new_recipe = action.payload
  const safe_recipe = safeRecipe(new_recipe);
  const { _id } = safe_recipe;
  let a_new_recipe = true;
  for (let recipe_index = 0; recipe_index < next_recipes.length; recipe_index++) {
    const a_recipe = next_recipes[recipe_index];
    const an_id = a_recipe._id;
    if (an_id === _id) {
      a_new_recipe = false;
      break;
    }
  }
  if (a_new_recipe) {
    next_recipes.push(safe_recipe);
  }
  const sorted_recipes = sortRecipes(next_recipes);
  const next_state = { current_recipes: sorted_recipes, current_remarks: next_remarks };
  return next_state;
}

function reduxReTitleRecipe(state, action) {
  const next_recipes = [...state.current_recipes];
  const next_remarks = [...state.current_remarks];
  const { re_titled_recipe, old_title } = action.payload;
  const safe_recipe = safeRecipe(re_titled_recipe);
  const cased_title = safe_recipe.title;
  const cook = safe_recipe.cook;
  const lower_old_id = old_title.toLowerCase();
  const old_recipe_id = cook + ID_SEPARATOR + lower_old_id + ID_SEPARATOR
  const safe_id = safe_recipe._id;
  // we dont touch the recipes, but we need to touch the remarks !!!!
  if (safe_id === old_recipe_id) {
    const same_state = { current_recipes: next_recipes, current_remarks: next_remarks };
    return same_state;
  }
  const change_index = next_recipes.findIndex((a_recipe) => a_recipe._id === old_recipe_id)
  safe_recipe.comments = next_recipes[change_index].comments;
  const new_recipe_title = safe_recipe.title;
  const changed_remarks = updateCurrentRemarks(next_remarks, new_recipe_title, old_recipe_id, cased_title);

  const winnowed_recipes = next_recipes.filter((_a_recipe, index) => index !== change_index);
  winnowed_recipes.push(safe_recipe);
  const sorted_recipes = sortRecipes(winnowed_recipes);
  const changed_state = { current_recipes: sorted_recipes, current_remarks: changed_remarks };
  return changed_state;
}

reduxChangeRecipe = type_czech.linkUp(reduxChangeRecipe, PRE_reduxChangeRecipe, POST_reduxChangeRecipe)
function reduxChangeRecipe(state, action) {
  const next_recipes = [...state.current_recipes];
  const next_remarks = [...state.current_remarks];
  const edited_recipe = action.payload.edited_recipe;
  const edited_recipe_id = edited_recipe._id;
  const change_index = next_recipes.findIndex((a_recipe) => a_recipe._id === edited_recipe_id)
  next_recipes[change_index] = edited_recipe;
  const next_state = { current_recipes: next_recipes, current_remarks: next_remarks };
  return next_state;
}

function updateCurrentRemarks(old_remarks, new_recipe_title, recipe_id, cased_title) {
  const changed_remarks = [];
  old_remarks.forEach(a_comment => {
    const comment_id = a_comment._id;
    const comment_arr = comment_id.split(ID_SEPARATOR);
    const [cook, old_title, by, remark] = comment_arr;
    const old_recipe_id = cook + ID_SEPARATOR + old_title + ID_SEPARATOR;
    let changed_comment = a_comment;
    if (old_recipe_id === recipe_id) {
      const changed_id = cook + ID_SEPARATOR + new_recipe_title + ID_SEPARATOR + by + ID_SEPARATOR + remark;
      changed_comment = { _id: changed_id, by: by, title: cased_title }
    } else {
      changed_comment.title = cased_title;
    }
    changed_remarks.push(changed_comment);
  });
  return changed_remarks;
}

function makeReduxStore(init_redux_store) {
  const recipe_store = createStore(recipeReducer, init_redux_store)
  return recipe_store;
}

function sortRecipes(next_recipes) {
  next_recipes.sort(function (a, b) {
    const a_lower_title = a.title.toLowerCase();
    const b_lower_title = b.title.toLowerCase();
    return a_lower_title > b_lower_title;
  });
  return next_recipes;
}

function reduxDeleteRecipe(state, action) {
  const next_recipes = [...state.current_recipes];
  const next_remarks = [...state.current_remarks];
  const delete_recipe_id = action.payload
  const delete_id_lower = delete_recipe_id.toLowerCase();
  const remaining_recipes = next_recipes.filter(a_recipe => a_recipe._id !== delete_id_lower);
  const remaining_remarks = next_remarks.filter(a_comment => {
    const comment_id = a_comment._id;
    const comment_arr = comment_id.split(ID_SEPARATOR);
    const [cook, old_title, _by, _remark] = comment_arr;
    const recipe_id = cook + ID_SEPARATOR + old_title + ID_SEPARATOR;
    return recipe_id !== delete_id_lower;
  });
  const next_state = { current_recipes: remaining_recipes, current_remarks: remaining_remarks };
  return next_state;
}

function reduxFilteredRecipes(state, action) {
  const { count_recipes, sorted_recipes } = action.payload;
  const next_recipes = sorted_recipes;
  const next_remarks = [...state.current_remarks];
  const next_state = { current_recipes: next_recipes, current_remarks: next_remarks, current_count: count_recipes };
  return next_state;
}

function reduxCommentAdd(state, action) {
  const { recipe_id, by, remark } = action.payload;
  const embeded_comment = recipe_id + by + ID_SEPARATOR + remark;
  let commented_recipe = state.current_recipes.find(item => item._id === recipe_id);
  const exist_comment_index = commented_recipe.comments.indexOf(embeded_comment);
  if (exist_comment_index === -1) {
    commented_recipe.comments.push(embeded_comment);
  }
  const next_recipes = [...state.current_recipes];
  const next_remarks = [...state.current_remarks];
  const next_state = { current_recipes: next_recipes, current_remarks: next_remarks };
  return next_state;
}

function reduxCommentRemove(state, action) {
  const delete_comment_id = action.payload
  const next_recipes = [...state.current_recipes];
  const next_remarks = [...state.current_remarks];
  const the_recipes = next_recipes.map(a_recipe => {
    const comment_recipe_id = commentIdToRecipeId(delete_comment_id);
    if (a_recipe._id === comment_recipe_id) {
      const old_comments = a_recipe.comments;
      const remaining_remarks = old_comments.filter(a_comment_id => {
        return a_comment_id !== delete_comment_id
      });
      a_recipe.comments = remaining_remarks;
    }
    return a_recipe;
  });
  const remaining_remarks = next_remarks.filter(a_comment => a_comment._id !== delete_comment_id);
  const next_state = { current_recipes: the_recipes, current_remarks: remaining_remarks };
  return next_state;
}

function reduxAjaxError(state, action) {
  const ajax_error = action.payload;
  const ajax_message = ajax_error.toString();
  window.onerror(ajax_message)
  const next_recipes = [...state.current_recipes];
  const next_remarks = [...state.current_remarks];
  const next_state = { current_recipes: next_recipes, current_remarks: next_remarks };
  return next_state;
}

const recipeReducer = (state, action) => {
  let next_state;
  if (action.type === 're-title-recipe') {
    next_state = reduxReTitleRecipe(state, action);
  } else if (action.type === 'change-recipe') {
    next_state = reduxChangeRecipe(state, action);
  } else if (action.type === 'new-recipe') {
    next_state = reduxNewRecipe(state, action);
  } else if (action.type === 'delete-recipe') {
    next_state = reduxDeleteRecipe(state, action);
  } else if (action.type === 'filtered-recipes') {
    next_state = reduxFilteredRecipes(state, action);
  } else if (action.type === 'add-comment') {
    next_state = reduxCommentAdd(state, action);
  } else if (action.type === 'remove-comment') {
    next_state = reduxCommentRemove(state, action);
  } else if (action.type === 'ajax-error') {
    next_state = reduxAjaxError(state, action);
  } else {
    next_state = state;  // Selenium calls here for some reason
  }
  return next_state;
}