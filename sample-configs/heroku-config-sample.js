// real config files should be outside of the project
// npm run prod ../heroku-config.js

// For testing real run-time process.env values during local dev on real MongoDB Atlas server

process.env["GOOGLE_CLIENT_ID"] = "google-client-id.apps.googleusercontent.com";
process.env["GOOGLE_CLIENT_SECRET"] = "google-client-secret";
process.env["SESSION_SECRET"] = "session-secret";

process.env.MONGO_URI = "mongodb+srv://the-username:the-password@cluster-name.abc123.mongodb.net/db-name";
