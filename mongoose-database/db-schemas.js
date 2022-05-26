const RECIPES_SCHEMA = {
  _id: String, // email@gmail.com~green eggs and ham
  cook: String, // email@gmail.com
  title: String, // green eggs and ham
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
