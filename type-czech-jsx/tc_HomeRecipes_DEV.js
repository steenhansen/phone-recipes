import { isNode } from "../import-2-require/common-2-import.js";
import { type_czech } from "../import-2-require/make-Type-Czech-import";

export { PRE_HomeRecipes };

if (typeof symbol_does_not_exist === "symbol") {
  throw "tc_homeRecipes.js"; // so can easily see if the code in this file is in browser javascript
}

function PRE_HomeRecipes(the_props, _extra_react_obj_1, _extra_react_obj_2) {
  const the_params = [the_props, _extra_react_obj_1, _extra_react_obj_2];
  const props_signature = {
    is_visible_array: "array",
    is_story_book_environment: "boolean",
    setVisibleRecipes: "function",
  };
  if (isNode()) {
    const node_signature = [props_signature, "object", "object"];
    const node_type_issue = type_czech.checkParam_type(the_params, node_signature);
    if (node_type_issue) return node_type_issue;
  } else {
    // "_typeExtra" ignores the undefined _extra_react_obj_2 AND is_story_book_environment
    const browser_signature = [props_signature, "object"];
    const browser_type_issue = type_czech.checkParam_typeExtra(the_params, browser_signature);
    if (browser_type_issue) return browser_type_issue;
  }
}
