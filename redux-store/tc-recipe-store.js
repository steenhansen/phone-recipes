import TypeCzech_obj from '../import-2-require/TypeCzech-2-import'
import { vanillaPageContext, NOP_TYPE_CZECH , isNode} from '../import-2-require/common-2-import.js'

import {
  SPEC_RECIPE_TYPES, SPEC_RECIPE_EMPTIES,
  SPEC_RECIPE_COMMENTS_TYPE, 
 SPEC_RECIPE_COMMENTS_EMPTY
} from '../import-2-require/tc-types-2-import';

let type_czech = NOP_TYPE_CZECH;


const { TypeCzech } = TypeCzech_obj;
if (isNode()) {
  if (global.GLOBAL_CONFIG.G_TYPE_CZECH_ON) {
    type_czech = TypeCzech(...global.GLOBAL_CONFIG.G_TYPE_CZECH_OPTIONS);
  }
}else{
  const G_TYPE_CZECH_ON = vanillaPageContext('G_TYPE_CZECH_ON');
  if (G_TYPE_CZECH_ON) {
    const G_TYPE_CZECH_OPTIONS = vanillaPageContext('G_TYPE_CZECH_OPTIONS');
    type_czech = TypeCzech(G_TYPE_CZECH_OPTIONS);
  }
}




export { PRE_reduxChangeRecipe, POST_reduxChangeRecipe,
  type_czech }

function POST_reduxChangeRecipe(result) {

  ///////////////// bad ///////////////////////
  // const result_sig = {
  //   current_recipes: [SPEC_RECIPE_TYPES],
  //   current_remarks: [SPEC_RECIPE_COMMENTS_TYPE]
  // };
  // const type_issue =  type_czech.checkParam_type(result, result_sig);
  // if (type_issue)
  //   return type_issue;


/////////////////// below good //////////////////////////////////////////////////////////
const result_sig2 = {
  current_recipes: [SPEC_RECIPE_TYPES],
  current_remarks: 'array'
};
const type_issue2 =  type_czech.checkParam_type(result, result_sig2);
if (type_issue2)
  return type_issue2;


  const type_err = type_czech.checkArray_objType0n(result.current_remarks, SPEC_RECIPE_COMMENTS_TYPE);
  if (type_err)
    type_czech.check_assert(`POST_reduxChangeRecipe B ` + type_err);

  const empty_issue = type_czech.checkArray_objEmpty0n(result.current_remarks, SPEC_RECIPE_COMMENTS_EMPTY);
  if (empty_issue)
    type_czech.check_assert(`POST_reduxChangeRecipe C ` + empty_issue);




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
  return;  //////////////////////////////////////////////////////////////


  function checkStateType() {
    const change_sig = {
      current_recipes: [SPEC_RECIPE_TYPES],
      current_remarks: "array"
    };
    return type_czech.checkParam_type(state, change_sig);
  }
  function checkStateEmpty() {
    const empty_sig = {
      current_recipes: [SPEC_RECIPE_EMPTIES],
      current_remarks: "IG"
    };
    return type_czech.checkParam_empty(state, empty_sig);
  }
  function checkActionType() {
    const redux_action_sig = {
      type: 'string',
      payload: {
        edited_recipe: SPEC_RECIPE_TYPES
      }
    };
    return type_czech.checkParam_typeExtra(action, redux_action_sig);
  }



  function checkActionEmpty() {
    const redux_action_empty = {
      type: 'EMPTY-ERROR',
      payload: {
        edited_recipe: SPEC_RECIPE_EMPTIES
      }
    };
    const empty_action = type_czech.checkParam_emptyExtra(action, redux_action_empty);
    if (empty_action)
      return empty_action;
  }
}

























