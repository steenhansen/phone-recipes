var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var csrf = require('csurf');
var passport = require('passport');
const compression = require('compression')
var SQLiteStore = require('connect-sqlite3')(session);
var {google_auth_dir, google_auth_file} = require('./auth-consts');
var auth_router = require('../passport-auth/routes-auth');

function appUseAuth(){
  var app = express()

  app.enable("trust proxy");

  app.set('views', __dirname);
  app.set('view engine', 'ejs');
  app.use(compression())
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(session({
    secret: process.env['SESSION_SECRET'],
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new SQLiteStore({ db: google_auth_file, dir: google_auth_dir })
  }));
  app.use(csrf());
  app.use(passport.authenticate('session'));
  app.use(function(req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
  });
  app.use(function(req, res, next) {
    res.locals.shared_csrfToken = req.csrfToken();
    next();
  });
  app.use('/', auth_router);

  return app;
}

module.exports = appUseAuth;