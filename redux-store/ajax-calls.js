import { FILTER_FIRST_SECTION } from "../import-2-require/common-2-import.js";
import { PRE_databasePost, POST_databasePost, PRE_databaseGet, POST_databaseGet } from "./tc-ajax-calls";
import { type_czech } from "../import-2-require/make-Type-Czech-import.js";

export { databasePost, databaseGet };

databasePost = type_czech.linkUp(databasePost, PRE_databasePost, POST_databasePost);
async function databasePost(db_request, shared_csrfToken, json_data) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": shared_csrfToken,
    },
    body: JSON.stringify(json_data),
  };
  // if (db_request !=='record-error'){
  //   db_request = db_request +"test-404-POST-is-recorded";
  // }
  const post_response = await fetch("/" + db_request, requestOptions);
  if (post_response.status === 404) {
    const command_error = new Error('databasePost 404, request = "' + db_request + '"');
    return command_error;
  }
  const server_resp_db = await post_response.json();
  return server_resp_db;
}

databaseGet = type_czech.linkUp(databaseGet, PRE_databaseGet, POST_databaseGet);
async function databaseGet(recipe_filters) {
  try {
    const { filter_meal, filter_cuisine, filter_diet, filter_text } = recipe_filters;
    const encoded_search = encodeURI(filter_text);
    const the_url = `/${FILTER_FIRST_SECTION}/${filter_meal}/${filter_cuisine}/${filter_diet}/${encoded_search}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const get_response = await fetch(the_url, requestOptions);
    const filtered_recipes = await get_response.json();
    return filtered_recipes;
  } catch (e) {
    return "databaseGet-Error - " + e.message;
  }
}
