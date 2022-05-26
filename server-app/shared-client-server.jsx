import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { EncaseStore } from "../pages/EncaseStore";
import { Provider } from "react-redux";
import { makeReduxStore } from "../redux-store/recipe-store";
import { print, vanillaPageContext, isNode } from "../import-2-require/common-2-import.js";

import TypeCzech_obj from "../import-2-require/TypeCzech-2-import";
import { databasePost } from "../redux-store/ajax-calls.js";

const ROOT_ELEMENT_ID = "page-view";
const { TypeCzech } = TypeCzech_obj;

function saveExceptionsToDb() {
  if (isNode()) {
    let type_czech = TypeCzech(...global.GLOBAL_CONFIG.G_TYPE_CZECH_OPTIONS);
    if (global.GLOBAL_CONFIG.G_TYPE_CZECH_ON) {
      if (type_czech.isPruned()) {
        print("~");
        print("~ EEROR TypeCzech-2-import.js IS NOT large 4700 line development file for type checking.");
        print("~");
      }
    } else {
      if (!type_czech.isPruned()) {
        print("~");
        print("~ ERROR TypeCzech-2-import.js IS NOT small 30 line pruned file for Type-Czech to be turned off in browser.");
        print("~");
      }
    }
  } else {
    window.onerror = function (msg, url = "", lineNo = "", columnNo = "", error = "") {
      console.log("window.onerror - ", msg, url, lineNo, columnNo, error);
      const browser_csrfToken = vanillaPageContext("shared_csrfToken");
      let browser_error;
      if (url === "") {
        browser_error = msg;
      } else {
        browser_error = [
          "Window.onError --- ",
          "Message: " + msg,
          "URL: " + url,
          "Line: " + lineNo,
          "Column: " + columnNo,
          "Error object: " + JSON.stringify(error),
        ].join(" - ");
      }
      const non_react_error = { browser_error };
      databasePost("record-error", browser_csrfToken, non_react_error);
      return false;
    };
  }
}

saveExceptionsToDb();

function serverVarsToClient() {
  const passToClient = [
    "pageProps", // automatic sharing
    "routeParams", // automatic sharing
    "url",
    "G_TYPE_CZECH_ON",
    "G_TYPE_CZECH_OPTIONS",
    "shared_auth_email",
    "shared_csrfToken",
    "shared_store_recipes",
    "shared_total_count",
    "shared_store_cooks_comments",
  ];
  return passToClient;
}

function sharedClientServer(server_variables) {
  const init_redux_store2 = {
    current_recipes: server_variables.shared_store_recipes,
    current_remarks: server_variables.shared_store_cooks_comments,
  };
  var recipe_store2 = makeReduxStore(init_redux_store2);
  return (
    <Provider store={recipe_store2}>
      <EncaseStore server_variables={server_variables}></EncaseStore>
    </Provider>
  );
}

function serverRender(server_variables) {
  const shared_client_server = sharedClientServer(server_variables);
  const server_html = ReactDOMServer.renderToString(shared_client_server);
  return server_html;
}

function clientRender(server_variables, root_element_id) {
  const shared_client_server = sharedClientServer(server_variables);
  const root_elem = document.getElementById(root_element_id);
  ReactDOM.hydrate(shared_client_server, root_elem);
}

export { serverRender, clientRender, serverVarsToClient, ROOT_ELEMENT_ID };
