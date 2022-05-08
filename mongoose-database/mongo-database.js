const mongoose = require('mongoose');
const { RECIPES_SCHEMA, COMMENTS_SCHEMA, UNCAUGHT_SCHEMA } = require('./db-schemas');

const { print , MONGO_AUTO_INDEX, MONGO_CONNECT_TIMEOUT, rootAppRequire } = require('../import-2-require/common-2-require');


const { type_czech,
  PRE_readConfig, POST_readConfig,
  PRE_getMongoCred, POST_getMongoCred,
  PRE_dbConnect, POST_dbConnect,
  PRE_deVersionMongo, POST_deVersionMongo, } = require('./tc-mongo-database');

readConfig = type_czech.linkUp(readConfig, PRE_readConfig, POST_readConfig);
function readConfig(the_dirname, credentials_file) {
  const { HIDDEN_CREDENTIALS, GLOBAL_CONFIG } = rootAppRequire(the_dirname, credentials_file);
  return { HIDDEN_CREDENTIALS, GLOBAL_CONFIG }
}

getMongoCred = type_czech.linkUp(getMongoCred, PRE_getMongoCred, POST_getMongoCred);
function getMongoCred(the_dirname, credentials_file) {
  let MONGO_URI = process.env.MONGO_URI;
  if (credentials_file) {
    const { HIDDEN_CREDENTIALS } = readConfig(the_dirname, credentials_file);
    if (HIDDEN_CREDENTIALS) {
      MONGO_URI = HIDDEN_CREDENTIALS.MONGO_URI;
    }
  }
  return MONGO_URI;
}

dbConnect = type_czech.linkUp(dbConnect, PRE_dbConnect, POST_dbConnect);
function dbConnect(prog_root, credentials_file = false) {
  print('dbConnect', prog_root, credentials_file);
  const connection_string = getMongoCred(prog_root, credentials_file);
  const db_options = { serverSelectionTimeoutMS: MONGO_CONNECT_TIMEOUT };
  mongoose.connect(connection_string, db_options).
    catch(error => print(error));
  const recipes_schema = new mongoose.Schema(RECIPES_SCHEMA);
  recipes_schema.set('autoIndex', MONGO_AUTO_INDEX);
  recipes_schema.index({ "meal": 1, "cuisine": 1, "diet": 1 })  // meal,[meal,cuisine],[meal,cuisine,diet]
  recipes_schema.index({ "meal": 1, "diet": 1 })                // [meal,diet]
  recipes_schema.index({ "cuisine": 1, "diet": 1 })             // cuisine, [cuisine,diet]
  recipes_schema.index({ "diet": 1 })                            // diet
  Recipes_coll = mongoose.model('recipes', recipes_schema);

  const comments_schema = new mongoose.Schema(COMMENTS_SCHEMA);
  comments_schema.index({ "by": 1 })                            // diet
  Comments_coll = mongoose.model('comments', comments_schema);

  const uncaught_schema = new mongoose.Schema(UNCAUGHT_SCHEMA);
  Uncaught_coll = mongoose.model('uncaught', uncaught_schema);

  print('Database has live models')
  return { Recipes_coll, Comments_coll, Uncaught_coll }
}


const BASE_BLANK_RECIPE = {
  _id: '',
  cook: '',
  title: '',
  steps: '',
  serves: '',
  time: '',
  meal: '',
  cuisine: '',
  diet: '',
  internal: '',
  minutes: 0,
  ingredients: [],
  comments: [],
  search: ''
}



async function testRecipes() {
  //https://mongoosejs.com/docs/api/model.html#model_Model.create
  await Recipes_coll.create(
    {
      _id: "email@gmail.com~green eggs and ham~",
      cook: "email@gmail.com",
      title: 'green eggs and ham',
      steps: "step -A tep--b",
      meal: 'lunch',
      cuisine: 'thai',
      diet: 'meat',
      ingredients: [{ ingredient: 'egg', amount: '2' }]
    });

  await Recipes_coll.create(
    {
      _id: "email@gmail.com~green eggs and hamX~",
      cook: "email@gmail.com",
      title: 'green eggs and ham',
      steps: "step -A step--b",
      meal: 'lunch',
      cuisine: 'sichuan',
      diet: 'vegan',
      ingredients: [{ ingredient: 'egg', amount: '2' }]
    });

  await Comments_coll.create(
    {
      _id: "email@gmail.com~green eggs and ham~bilbobaggins@facebook.com~cut the sugar",
      by: 'bilbobaggins@facebook.com',         // index 2
    });

  await Comments_coll.create(
    {
      _id: "email@gmail.com~green eggs and hamX~bilbobaggins@facebook.com~cut the spice",
      by: 'bilbobaggins@facebook.com',         // index 2
    });


}


deVersionMongo = type_czech.linkUp(deVersionMongo, PRE_deVersionMongo, POST_deVersionMongo);
function deVersionMongo(classified_object) {
  const string_class = JSON.stringify(classified_object);
  const classless_object = JSON.parse(string_class);
  delete classless_object['__v']
  return classless_object;
}

async function clearDb() {
  await Recipes_coll.deleteMany({});
  await Comments_coll.deleteMany({});
  await Uncaught_coll.deleteMany({});
}

module.exports = { clearDb, deVersionMongo, dbConnect, readConfig, BASE_BLANK_RECIPE };

