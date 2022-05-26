import { SPEC_RECIPE_TYPES, SPEC_RECIPE_EMPTIES, SPEC_RECIPE_COMMENTS_TYPE, SPEC_RECIPE_COMMENTS_EMPTY } from "../import-2-require/tc-types-2-import";
import { type_czech } from "../import-2-require/make-Type-Czech-import";

export { PRE_reduxChangeRecipe, POST_reduxChangeRecipe };

if (typeof symbol_does_not_exist === "symbol") {
  throw "tc-recipe-store.js";
}

function POST_reduxChangeRecipe(result) {
  const result_sig2 = {
    current_recipes: "array",
    current_remarks: "array",
  };
  const type_issue2 = type_czech.checkParam_type(result, result_sig2);
  if (type_issue2) return type_issue2;

  const type_err = type_czech.checkArray_objType0n(result.current_remarks, SPEC_RECIPE_COMMENTS_TYPE);
  if (type_err) type_czech.check_assert(`POST_reduxChangeRecipe B ` + type_err);

  const empty_issue = type_czech.checkArray_objEmpty0n(result.current_remarks, SPEC_RECIPE_COMMENTS_EMPTY);
  if (empty_issue) type_czech.check_assert(`POST_reduxChangeRecipe C ` + empty_issue);
}

function PRE_reduxChangeRecipe(state, action) {
  if (action.payload?.cook) {
    const state_type = checkStateType();
    if (state_type) return state_type;

    const state_empty = checkStateEmpty();
    if (state_empty) return state_empty;

    const action_type = checkActionType();
    if (action_type) return action_type;

    const action_empty = checkActionEmpty();
    if (action_empty) return action_empty;
  }
  return;

  function checkStateType() {
    const change_sig = {
      current_recipes: [SPEC_RECIPE_TYPES],
      current_remarks: "array",
    };
    return type_czech.checkParam_type(state, change_sig);
  }
  function checkStateEmpty() {
    const empty_sig = {
      current_recipes: [SPEC_RECIPE_EMPTIES],
      current_remarks: "IG",
    };
    return type_czech.checkParam_empty(state, empty_sig);
  }
  function checkActionType() {
    const redux_action_sig = {
      type: "string",
      payload: { edited_recipe: SPEC_RECIPE_TYPES },
    };
    return type_czech.checkParam_typeExtra(action, redux_action_sig);
  }

  function checkActionEmpty() {
    const redux_action_empty = {
      type: "EMPTY-ERROR",
      payload: { edited_recipe: SPEC_RECIPE_EMPTIES },
    };
    const empty_action = type_czech.checkParam_emptyExtra(action, redux_action_empty);
    if (empty_action) return empty_action;
  }
}
