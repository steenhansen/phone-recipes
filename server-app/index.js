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

async function postData(req, res) {
  const post_res = await postToDb(req, res);
  res.send(post_res);
}

async function startServer() {
  app = appUseAuth();
  viteDevServer = await prodOrDevServer(app);
  const renderPage = createPageRenderer({ viteDevServer, isProduction, root: prog_root });
  app.post("*", postData);
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
