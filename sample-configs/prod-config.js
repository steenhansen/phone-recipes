

// npm run prod ../prod-config.js


const GLOBAL_CONFIG = {
  G_SELENIUM_TESTING: false,     
  G_RECIPES_COLLECTION: 'un-initialized-recipes',
  G_COMMENTS_COLLECTION: 'un-initialized-comments',
  G_UNCAUGHT_COLLECTION: 'un-initialized-uncaughts',
  G_DATABASE_NAME: 'local-ui',
  G_TYPE_CZECH_ON: false,
  G_TYPE_CZECH_OPTIONS: [],
  //G_TYPE_CZECH_OPTIONS: ['NO-ERROR-MESSAGES'],
  //G_TYPE_CZECH_OPTIONS: ['CONSOLE-COUNT', 'LOG-ERRORS']
}



var HIDDEN_CREDENTIALS = {
  MONGO_URI: "mongodb://localhost:27017/" + GLOBAL_CONFIG.G_DATABASE_NAME,
  MONGO_USERNAME: 'real-mongodb-username',
  MONGO_PASSWORD: 'real-mongodb-password',

  GOOGLE_CLIENT_ID: 'google-client-id.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'google-client-secret',

  SESSION_SECRET: 'session-secret'
};

module.exports = {
  HIDDEN_CREDENTIALS,
  GLOBAL_CONFIG
}
