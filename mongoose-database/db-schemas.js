/*
Note the complicated _ids and comments needed for linking the two tables.

It was done this way to easily retreive all of a users comments quickly without table scanning.

"My Scary Haggis" and "Green Eggs and Ham" recipes from email@gmail.com

{ _id: "email@gmail.com~my scary haggis",
 cook: "email@gmail.com",
title: "My Scary Haggis" }

{ _id: "email@gmail.com~green eggs and ham",
 cook: "email@gmail.com",
title: "Green Eggs and Ham",
comments: ["email@gmail.com~green eggs and ham~bilbobaggins@facebook.com~cut the sugar",
           "email@gmail.com~green eggs and ham~bilbobaggins@facebook.com~add some salt"] 
}
*/

const RECIPES_SCHEMA = {
  _id: String, // email@gmail.com~green eggs and ham
  cook: String, // email@gmail.com
  title: String, // Green Eggs and Ham
  steps: String, // 'step1 step b'
  serves: String, // 'step1 step b'
  time: String, // 'step1 step b'
  meal: String, // lunch INDEX
  cuisine: String, // sichuan  - INDEX
  diet: String, // vegetarian, vegan, meat
  internal: String,
  minutes: Number,
  ingredients: [{ ingredient: String, amount: String }],
  comments: [String], // email@gmail.com~green eggs and ham~bilbobaggins@facebook.com~cut the sugar
  search: String,
};

/*
"Cut the Sugar" and "Add Some Salt" comments from bilbobaggins on the recipe "email@gmail.com~green eggs and ham"

{ _id: "email@gmail.com~green eggs and ham~bilbobaggins@facebook.com~cut the sugar",
  by: "bilbobaggins@facebook.com",
  title: "Cut the Sugar" }

{ _id: "email@gmail.com~green eggs and ham~bilbobaggins@facebook.com~add some salt",
  by: "bilbobaggins@facebook.com",
  title: "Add Some Salt" }
*/

const COMMENTS_SCHEMA = {
  _id: String, // email@gmail.com~green eggs and ham~bilbobaggins@facebook.com~cut the sugar
  by: { type: String, index: true }, // bilbobaggins@facebook.com
  title: String, // preserve upper case for display
};

const UNCAUGHT_SCHEMA = {
  _id: String, // 1651336838.036        unix epoch seconds
  uncaught: String,
};

module.exports = { RECIPES_SCHEMA, COMMENTS_SCHEMA, UNCAUGHT_SCHEMA };
