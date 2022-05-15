const google_auth_dir = 'passport-auth/';
const google_auth_file = 'auth-google.db';
const google_auth_db = google_auth_dir + google_auth_file;     // sqlite-connect
const google_redirect = '/oauth2/redirect/google'
const google_identity = '/login/federated/google'

function getLoggedIn(req) {
  let auth_email = '';
  if (typeof req.user?.id !== 'undefined') {
    auth_email = req.user.auth_email;
  }
  return auth_email;
}

module.exports = { getLoggedIn, google_auth_dir, google_auth_file, google_auth_db, google_redirect, google_identity };
