


//  npm run dev /selenium-tests/selenium-config.js



const GLOBAL_CONFIG = {
  G_SELENIUM_TESTING: true,     
  G_RECIPES_COLLECTION: 'un-initialized-recipes',
  G_COMMENTS_COLLECTION: 'un-initialized-comments',
  G_UNCAUGHT_COLLECTION: 'un-initialized-uncaughts',
  G_DATABASE_NAME: 'selenium-test',

  G_TYPE_CZECH_ON: false,

  G_TYPE_CZECH_OPTIONS: ['LOG-ERRORS'],
  //G_TYPE_CZECH_OPTIONS: ['NO-ERROR-MESSAGES'],
  //G_TYPE_CZECH_OPTIONS: ['CONSOLE-COUNT', 'LOG-ERRORS']
}

var HIDDEN_CREDENTIALS = {
  MONGO_URI: "mongodb://localhost:27017/" + GLOBAL_CONFIG.G_DATABASE_NAME,
  MONGO_USERNAME: 'local-mongo-name',
  MONGO_PASSWORD: 'local-mongo-pass',

  GOOGLE_CLIENT_ID: 'google-client-id.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'google-client-secret',

  SESSION_SECRET: 'session-secret'
};

module.exports = {
  HIDDEN_CREDENTIALS,
  GLOBAL_CONFIG
}
