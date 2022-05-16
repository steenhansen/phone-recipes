import { isNode } from '../../import-2-require/common-2-import.js';
import { SPEC_RECIPE_TYPES } from '../../import-2-require/tc-types-2-import';
import { type_czech } from '../../import-2-require/make-Type-Czech-import';

export { PRE_RecipeSingle }

if (typeof symbol_does_not_exist === 'symbol') {
  throw 'tc_RecipeSingle.js';
}

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
    const browser_type_issue = type_czech.checkParam_typeExtra(the_params, browser_signature);
    if (browser_type_issue)
      return browser_type_issue;
  }

}


