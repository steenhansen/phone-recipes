const { print, herokuEnvOrConfigFile, FAKE_TEST_GMAIL, HTTP_PORT, DEFAULT_CONFIG, FAVICON_FLATICON } = require("../import-2-require/common-2-require");
global.GLOBAL_CONFIG = DEFAULT_CONFIG;
const prog_root = `${__dirname}/..`;
global.GLOBAL_CONFIG = herokuEnvOrConfigFile(prog_root);
const { googleCreds } = require("../passport-auth/init-google");
googleCreds(prog_root, process.argv[2]);

const { postToDb, getFromDb, getUserFromDb } = require("../redux-store/ajax-execute.js");
const express = require("express");
const cors = require("cors");
const favicon = require("express-favicon");
const { createPageRenderer } = require("vite-plugin-ssr");
const { dbConnect } = require("../mongoose-database/mongo-database");
const { PageContextInit } = require("./server-to-client-vars");
try {
  var appUseAuth = require("../passport-auth/app-auth");
} catch (e) {
  throw "Heroku env vars are not set. (MONGO_URI/GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET/SESSION_SECRET) " + e;
}
const { getLoggedIn } = require("../passport-auth/auth-consts");
const { FILTER_FIRST_SECTION, USER_GET_RECIPES } = require("../import-2-require/common-2-require");
const isProduction = process.env.NODE_ENV === "production";
const the_collections = dbConnect(prog_root, process.argv[2]);
global.GLOBAL_CONFIG.G_RECIPES_COLLECTION = the_collections.Recipes_coll;
global.GLOBAL_CONFIG.G_COMMENTS_COLLECTION = the_collections.Comments_coll;
global.GLOBAL_CONFIG.G_UNCAUGHT_COLLECTION = the_collections.Uncaught_coll;

const fetch = require("node-fetch");

startServer();

//   <a href="https://www.flaticon.com/free-icons/food" title="food icons">Food icons created by Freepik - Flaticon</a>
app.use(favicon(FAVICON_FLATICON));

app.use(
  cors({
    origin: "*",
  })
);

process.on("uncaughtException", function (err) {
  const { recordException } = require("../mongoose-database/uncaught-collections");
  recordException(err);
});

async function prodOrDevServer(app) {
  app.use(express.static("pages/images"));
  if (isProduction) {
    app.use(express.static(`${prog_root}/dist/client`));
  } else {
    const vite = require("vite");
    viteDevServer = await vite.createServer({
      root: prog_root,
      server: { middlewareMode: "ssr" },
    });
    app.use(viteDevServer.middlewares);
    return viteDevServer;
  }
}

// stop urls ending with %20 from crashing vite
app.get(/%20$/, (req, res) => {
  const org_url = req.url;
  const url_20s = org_url.replaceAll("%20", " ");
  const trimmed_url = url_20s.trim();
  res.redirect(trimmed_url);
});

////////////////////////////////////////////////////////////////////////////////
//   https://phone-recipes.herokuapp.com/validate-token/9876543210
const { OAuth2Client } = require('google-auth-library');
const web_Client_Id = "703366983526-rqp153lgutts5rhlhit133tuv77p0pja.apps.googleusercontent.com";
const oauth2client = new OAuth2Client(web_Client_Id);

async function verifyIdToken(id_token) {
  const oauth_ticket = await oauth2client.verifyIdToken({
    idToken: id_token,
    audience: web_Client_Id
  });
  const oauth_payload = oauth_ticket.getPayload();
  const user_id = oauth_payload['sub'];
  console.log('user_id google:', user_id);
  return user_id;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

app.get("/validate-token/*", (req, res) => {
  const the_url = req.originalUrl;
  const [_, id_token] = the_url.split("/");
  print("validate-token", id_token);
  const user_id = await verifyIdToken(id_token).catch(console.error);
  print("user_id", user_id);
  res.send('abcd');
});
////////////////////////////////////////////////////////////////////////////////

async function postData(req, res) {
  const post_res = await postToDb(req, res);
  res.send(post_res);
}

async function startServer() {
  app = appUseAuth();
  viteDevServer = await prodOrDevServer(app);
  const renderPage = createPageRenderer({ viteDevServer, isProduction, root: prog_root });
  app.post("*", postData);

  //////////////////////////////////////////////////

  // FROM   https://derk-jan.com/2020/05/expo-facebook-login/

  /*
  1. on mobile we call facebook to get a code, which has no name
    const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
    responseType: ResponseType.Code,
  });

  2. then on mobile we call server with code to get a token, which has a name
     https://phone-recipes.herokuapp.com/facebook-check/abcde-CODE-fghij

  3. facebook returns the token, with name, matching the code to the server
     AND THE FACEBOOK USER/PASS WEB WINDOW SHOULD NOW CLOSE BY ITSELF ?!

  4. the server returns the token to mobile, so we know the facebook name


*/
  const server_facebook_validate = "/facebook-check/*";
  app.get(server_facebook_validate, async (req, res, next) => {
    try {
      const facebook_app_id = process.env["FACEBOOK_APP_ID"];
      const facebook_redirect_uri = process.env["FACEBOOK_REDIRECT_URI"];
      const facebook_secret = process.env["FACEBOOK_SECRET"];
      const the_url = req.originalUrl;
      const [_, _facebook_check_, facebook_mobile_code] = the_url.split("/");
      //https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow#confirm
      const facebook_check_code =
        `https://graph.facebook.com/v14.0/oauth/access_token` +
        `?client_id=${facebook_app_id}` +
        `&redirect_uri=${facebook_redirect_uri}` +
        `&client_secret=${facebook_secret}` +
        //        `&code_verifier=a_cantankerous_crimson_jabberwalky_juggled_some_kittens` +   something to do with v.7 in old example
        `&code=${facebook_mobile_code}`;
      console.log("XXXX facebook_check_code", facebook_check_code);
      const json_token = await fetch(facebook_check_code);
      const facebook_token = await json_token.json();
      console.log("XXXX facebook_token", facebook_token);
      const facebook_user = { facebook_name: facebook_token.name };
      const the_json = JSON.stringify(facebook_user);
      console.log("XXXX the_json", the_json);
      res.send(the_json);
    } catch (err) {
      print("facebook-check-error", err);
      next();
    }
  });

  const get_filter_url = "/" + FILTER_FIRST_SECTION + "/*";
  app.get(get_filter_url, async (req, res, next) => {
    try {
      const the_recipes = await getFromDb(req);
      const the_json = JSON.stringify(the_recipes);
      res.send(the_json);
    } catch (err) {
      // catches errors both in fetch and response.json
      print("get-error", err);
      next();
    }
  });

  //////////////////////////////////////////////////

  //      https://phone-recipes.herokuapp.com/get-api////

  //        https://phone-recipes.herokuapp.com/user-api/steenhansen1942@gmail.com

  const get_user_url = "/" + USER_GET_RECIPES + "/*";
  app.get(get_user_url, async (req, res, next) => {
    try {
      const the_recipes = await getUserFromDb(req);
      const the_json = JSON.stringify(the_recipes);
      res.send(the_json);
    } catch (err) {
      // catches errors both in fetch and response.json
      print("get-error", err);
      next();
    }
  });

  /////////////////

  app.get("*", async (req, res, next) => {
    const shared_csrfToken = res.locals.shared_csrfToken;
    let auth_email;
    if (global.GLOBAL_CONFIG.G_SELENIUM_TESTING) {
      auth_email = FAKE_TEST_GMAIL;
    } else {
      auth_email = getLoggedIn(req);
    }
    var server_variables_init = await PageContextInit(req.originalUrl, shared_csrfToken, auth_email);
    const server_variables = await renderPage(server_variables_init);
    const { httpResponse } = server_variables;
    if (!httpResponse) return next();
    const { body, statusCode, contentType } = httpResponse;
    res.status(statusCode).type(contentType).send(body);
  });

  const port_used = process.env.PORT || HTTP_PORT;
  app.listen(port_used);
  print(`Server running at http://localhost:${port_used}`);
}
