
var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var sqlite_connect = require('./sqlite-connect');
var path = require('path');


var {userToUrl} = require('../import-2-require/common-2-require');



var {google_redirect, google_identity} = require('./auth-consts');


function verifyAuth(issuer, profile, cb) {
  const google_email = profile.emails[0].value;
  sqlite_connect.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [issuer, profile.id ],
    function(err, row) {
    if (err) { return cb(err); }
    if (!row) {
      sqlite_connect.run('INSERT INTO users (auth_email) VALUES (?)', [ google_email ], function(err) {
        if (err) { return cb(err); }
        var id = this.lastID;
        sqlite_connect.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          issuer,
          profile.id
        ], function(err) {
          if (err) { return cb(err); }
          var user = {
            id: id,
            auth_email: google_email,
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
        sqlite_connect.get('SELECT rowid AS id, * FROM users WHERE rowid = ?', [ row.user_id , row.auth_email], 
        function(err, row) {
          if (err) { return cb(err); }
          if (!row) { return cb(null, false); }
          return cb(null, row);
        });
    }
  });
}

const GOOGLE_VALUES = {
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: google_redirect,
  scope: [ 'profile' ]
};
            // Configure the Google strategy for use by Passport.
            //
            // OAuth 2.0-based strategies require a `verify` function which receives the
            // credential (`accessToken`) for accessing the Facebook API on the user's
            // behalf, along with the user's profile.  The function must invoke `cb`
            // with a user object, which will be set at `req.user` in route handlers after
            // authentication.
            passport.use(new GoogleStrategy(GOOGLE_VALUES, verifyAuth));
              
            // Configure Passport authenticated session persistence.
            //
            // In order to restore authentication state across HTTP requests, Passport needs
            // to serialize users into and deserialize users out of the session.  In a
            // production-quality application, this would typically be as simple as
            // supplying the user ID when serializing, and querying the user record by ID
            // from the database when deserializing.  However, due to the fact that this
            // example does not have a database, the complete Facebook profile is serialized
            // and deserialized.
            passport.serializeUser(function(user, cb) {
              process.nextTick(function() {
                cb(null, { id: user.id, username: user.username, name: user.name, auth_email: user.auth_email });
              });
            });

            passport.deserializeUser(function(user, cb) {
              process.nextTick(function() {
                return cb(null, user);
              });
            });

            var router = express.Router();

            router.get('/re-direct', function(req, res, next) {
              const google_email = res.req.user.auth_email;
              const the_user_page = userToUrl(google_email)
              res.redirect(the_user_page);
            });

            router.get('/logout-google', function(req, res, next) {
              req.session.destroy();
              res.redirect('/');
            });

            /* GET /login/federated/accounts.google.com
            *
            * This route redirects the user to Google, where they will authenticate.
            *
            * Signing in with Google is implemented using OAuth 2.0.  This route initiates
            * an OAuth 2.0 flow by redirecting the user to Google's identity server at
            * 'https://accounts.google.com'.  Once there, Google will authenticate the user
            * and obtain their consent to release identity information to this app.
            *
            * Once Google has completed their interaction with the user, the user will be
            * redirected back to the app at `GET /oauth2/redirect/accounts.google.com`.
            */
            router.get(google_identity, passport.authenticate('google', {scope: ['email']} ));

            /*
                This route completes the authentication sequence when Google redirects the
                user back to the application.  When a new user signs in, a user account is
                automatically created and their Google account is linked.  When an existing
                user returns, they are signed in to their linked account.
            */

            router.get(google_redirect, passport.authenticate('google', {
              successReturnToOrRedirect: '/re-direct',
              failureRedirect: '/'
            }));

            /* POST /logout
            *
            * This route logs the user out.
            */
            router.post('/logout-google', function(req, res, next) {
              req.logout();
              res.redirect('/');
            });


module.exports = router;
