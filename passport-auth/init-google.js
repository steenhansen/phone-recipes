const { readConfig } = require('../mongoose-database/mongo-database');

function googleCreds(prog_root, credentials_file) {
  if (credentials_file) {
    const { HIDDEN_CREDENTIALS } = readConfig(prog_root, credentials_file);
    if (HIDDEN_CREDENTIALS) {
      process.env['GOOGLE_CLIENT_ID'] = HIDDEN_CREDENTIALS.GOOGLE_CLIENT_ID;
      process.env['GOOGLE_CLIENT_SECRET'] = HIDDEN_CREDENTIALS.GOOGLE_CLIENT_SECRET;
      process.env['SESSION_SECRET'] = HIDDEN_CREDENTIALS.SESSION_SECRET;
    }
  }
}

module.exports = { googleCreds };