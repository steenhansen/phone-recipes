
const GLOBAL_CONFIG = {
  G_SELENIUM_TESTING: false,
  G_TYPE_CZECH_ON: false,
  G_TYPE_CZECH_OPTIONS: [],
};

var HIDDEN_CREDENTIALS = {
  MONGO_URI: "mongodb://localhost:27017/scale-test-db",
  GOOGLE_CLIENT_ID: 'google-client-id.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'google-client-secret',
  SESSION_SECRET: 'session-secret'
};

module.exports = {
  HIDDEN_CREDENTIALS,
  GLOBAL_CONFIG
};
