const { dbConnect } = require("../mongoose-database/mongo-database");
const credentials_file = "./node-config.cjs";
const the_collections = dbConnect(__dirname, credentials_file);

GLOBAL_CONFIG.G_RECIPES_COLLECTION = the_collections.Recipes_coll;
GLOBAL_CONFIG.G_COMMENTS_COLLECTION = the_collections.Comments_coll;
