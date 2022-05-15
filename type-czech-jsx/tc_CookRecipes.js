import {isNode } from '../import-2-require/common-2-import.js';


import { type_czech } from '../import-2-require/make-Type-Czech-import';






export { PRE_CookRecipes };



if (typeof symbol_does_not_exist === 'symbol') {
  throw 'tc_CookRecipes.js';
}



function PRE_CookRecipes(the_props, _extra_react_obj_1, _extra_react_obj_2) {
  const the_params = [the_props, _extra_react_obj_1, _extra_react_obj_2];
  const props_signature = {
    is_visible_array: 'array'  };
  if (isNode()) {
    const node_signature = [props_signature, 'object', 'object'];
    const node_type_issue = type_czech.checkParam_type(the_params, node_signature);
    if (node_type_issue)
      return node_type_issue;
  } else {
    // "_typeExtra" ignores the undefined _extra_react_obj_2
    const browser_signature = [props_signature, 'object'];
    const browser_type_issue = type_czech.checkParam_typeExtra(the_params, browser_signature);
    if (browser_type_issue)
      return browser_type_issue;
  }
}


