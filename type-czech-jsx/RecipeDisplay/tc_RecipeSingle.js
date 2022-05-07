import TypeCzech_obj from '../../import-2-require/TypeCzech-2-import'

import {vanillaPageContext, NOP_TYPE_CZECH, isNode } from '../../import-2-require/common-2-import.js'

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


export { PRE_RecipeSingle, type_czech }

function PRE_RecipeSingle(the_props, _extra_react_obj_1, _extra_react_obj_2) {
  const the_params = [the_props, _extra_react_obj_1, _extra_react_obj_2];
  const NO_COLOR_RECIPE = { a_recipe: SPEC_RECIPE_TYPES, is_minimal: 'boolean', };
  const HAS_COLOR_RECIPE = { a_recipe: SPEC_RECIPE_TYPES, is_minimal: 'boolean', row_input_colour: 'string' };
  if (isNode()) {
    // NB 'Phone View' uses the two signatures below
    const node_signature = [[NO_COLOR_RECIPE, 'object', 'object'], [HAS_COLOR_RECIPE, 'object', 'object']];
    const node_type_issue = type_czech.checkParam_typeEither(the_params, node_signature);
    if (node_type_issue)
      return node_type_issue;
  } else {
    // "_typeExtra" ignores the undefined _extra_react_obj_2
    const browser_signature = [NO_COLOR_RECIPE, 'object'];
    const browser_type_issue = type_czech.checkParam_typeExtra(the_params, browser_signature)
    if (browser_type_issue)
      return browser_type_issue;
  }

}


