/*
terminal 1: cd /
            npm run dev /test-selenium/selenium-config.js

terminal 2: cd /test-selenium
            node all-selenium-tests

            node create-recipe/createRecipe_addComment_delRecipe.sel
*/

const GLOBAL_CONFIG = {
  G_SELENIUM_TESTING: true,      // NB   if true then fake-test@gmail.com is automatically logged in 
  G_TYPE_CZECH_ON: false,
  G_TYPE_CZECH_OPTIONS: [],
};

var HIDDEN_CREDENTIALS = {
  MONGO_URI: "mongodb://localhost:27017/selenium-test",
  GOOGLE_CLIENT_ID: 'google-client-id.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'google-client-secret',
  SESSION_SECRET: 'session-secret'
};

module.exports = {
  HIDDEN_CREDENTIALS,
  GLOBAL_CONFIG
};
