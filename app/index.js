
const { herokuEnvOrConfigFile, FAKE_TEST_GMAIL, HTTP_PORT} = require("../import-2-require/common-2-require");
const prog_root = `${__dirname}/..`;
global.GLOBAL_CONFIG = herokuEnvOrConfigFile(prog_root);

const { googleCreds } = require('../passport-auth/init-google');
googleCreds(prog_root, process.argv[2]);

const { postToDb, getFromDb } = require('../redux-store/ajax-execute.js');
const express = require('express')
const favicon = require('express-favicon');

const { createPageRenderer } = require('vite-plugin-ssr')

const { dbConnect } = require('../mongoose-database/mongo-database');

const { PageContextInit } = require('./server-to-client-vars');
try {
  var appUseAuth = require('../passport-auth/app-auth');
} catch (e) {
  throw 'You forgot to set the Heroku env vars';
}

const { getLoggedIn } = require('../passport-auth/auth-consts');

const { FILTER_FIRST_SECTION } = require('../import-2-require/common-2-require');

const isProduction = process.env.NODE_ENV === 'production'
const the_collections = dbConnect(prog_root, process.argv[2]);
GLOBAL_CONFIG.G_RECIPES_COLLECTION = the_collections.Recipes_coll;
GLOBAL_CONFIG.G_COMMENTS_COLLECTION = the_collections.Comments_coll;
GLOBAL_CONFIG.G_UNCAUGHT_COLLECTION = the_collections.Uncaught_coll;

startServer()


//   <a href="https://www.flaticon.com/free-icons/food" title="food icons">Food icons created by Freepik - Flaticon</a>
app.use(favicon('./pages/restaurant_5.png'));

process.on('uncaughtException', function (err) {
  const { recordException } = require('../mongoose-database/uncaught-collections');
  recordException(err)
});



async function prodOrDevServer(app) {
  app.use(express.static('pages/images'))
  if (isProduction) {
    app.use(express.static(`${prog_root}/dist/client`))
  } else {
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      root: prog_root,
      server: { middlewareMode: 'ssr' },
    })
    app.use(viteDevServer.middlewares)
    return viteDevServer;
  }
}



async function postData(req, res) {
  const post_res = await postToDb(req, res)
  res.send(post_res)
}

async function startServer() {
  app = appUseAuth();
  viteDevServer = await prodOrDevServer(app);
  const renderPage = createPageRenderer({ viteDevServer, isProduction, root: prog_root })

  app.post('*', postData)

  const get_filter_url = '/' + FILTER_FIRST_SECTION + '/*'





  app.get(get_filter_url, async (req, res, next) => {
    try {
      const the_recipes = await getFromDb(req)
      const the_json = JSON.stringify(the_recipes);
      res.send(the_json)
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log('xxx', err)
      next();
    }
  });



  app.get('*', async (req, res, next) => {
    const shared_csrfToken = res.locals.shared_csrfToken;
    let auth_email
    if (global.GLOBAL_CONFIG.G_SELENIUM_TESTING) {
      auth_email = FAKE_TEST_GMAIL;
    } else {
      auth_email = getLoggedIn(req);
    }
    var server_variables_init = await PageContextInit(req.originalUrl, shared_csrfToken, auth_email)
    const server_variables = await renderPage(server_variables_init);
    const { httpResponse } = server_variables;
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const port = process.env.PORT || HTTP_PORT;
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
