var sqlite3 = require('sqlite3');
var {google_auth_db} = require('./auth-consts');
var sqlite_connect = new sqlite3.Database(google_auth_db);

sqlite_connect.serialize(function() {
  sqlite_connect.run(`CREATE TABLE IF NOT EXISTS users (
    username TEXT UNIQUE,
    hashed_password BLOB,
    salt BLOB,
    auth_email TEXT,
    name TEXT                 )`);
  
  sqlite_connect.run("CREATE TABLE IF NOT EXISTS federated_credentials ( \
    user_id INTEGER NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL, \
    PRIMARY KEY (provider, subject) \
  )");
  
});

module.exports = sqlite_connect;
