
// real config files should be outside of the project
// npm run dev ../dev-config.js

const GLOBAL_CONFIG = {
  G_SELENIUM_TESTING: false,
  G_TYPE_CZECH_ON: true,
  //G_TYPE_CZECH_OPTIONS: ['LOG-ERRORS'],
  //G_TYPE_CZECH_OPTIONS: ['NO-ERROR-MESSAGES'],
  G_TYPE_CZECH_OPTIONS: ['CONSOLE-COUNT', 'LOG-ERRORS']
};

var HIDDEN_CREDENTIALS = {
  MONGO_URI: "mongodb://localhost:27017/local-ui",
  GOOGLE_CLIENT_ID: 'google-client-id.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'google-client-secret',
  SESSION_SECRET: 'session-secret'
};

module.exports = {
  HIDDEN_CREDENTIALS,
  GLOBAL_CONFIG
};
