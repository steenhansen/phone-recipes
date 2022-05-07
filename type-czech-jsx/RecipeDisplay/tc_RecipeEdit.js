import TypeCzech_obj from '../../import-2-require/TypeCzech-2-import'

import {vanillaPageContext,NOP_TYPE_CZECH, isNode } from '../../import-2-require/common-2-import.js'

import { SPEC_RECIPE_TYPES } from '../../import-2-require/tc-types-2-import';

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



export { PRE_RecipeEdit, type_czech }

function PRE_RecipeEdit(the_props, _extra_react_obj_1, _extra_react_obj_2) {
  if (the_props.the_recipe?._id) {      // if a new recipe then no _id and nothing to check
    if (isNode()) {
      throw 'THIS never runs on the server !!!!!!!';
    } else {
      const the_params = [the_props, _extra_react_obj_1, _extra_react_obj_2];
      const props_signature = {
        filtered_recipes: 'array',
        the_recipe: SPEC_RECIPE_TYPES
      };
      // "_typeExtra" ignores the undefined _extra_react_obj_2
      const browser_signature = [props_signature, 'object'];
      const browser_type_issue = type_czech.checkParam_typeExtra(the_params, browser_signature)
      if (browser_type_issue)
        return browser_type_issue;
    }
  }
}


