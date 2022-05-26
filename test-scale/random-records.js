/* 
  Generate 1,000,000 recipes
    cd  /test-scale
    node random-records.js 
*/

/*
  Check ui speed
    cd /
    npm run dev ./test-scale/scale-config.js
*/

const { print, DEFAULT_CONFIG } = require("../import-2-require/common-2-require");
global.GLOBAL_CONFIG = DEFAULT_CONFIG;
const { dbConnect, clearDb } = require("../mongoose-database/mongo-database");
const credentials_file = "./scale-config.js";
const the_collections = dbConnect(__dirname, credentials_file);

GLOBAL_CONFIG.G_RECIPES_COLLECTION = the_collections.Recipes_coll;
GLOBAL_CONFIG.G_COMMENTS_COLLECTION = the_collections.Comments_coll;
GLOBAL_CONFIG.G_UNCAUGHT_COLLECTION = the_collections.Uncaught_coll;

const THE_MEALS = ["breakfast", "brunch", "lunch", "supper", "dessert", "snack"];
const THE_DIETS = ["omnivore", "vegan", "vegetarian", "halal", "kosher"];
const THE_CUISINES = ["chinese", "indian", "japanese", "mexican", "italian", "french"];

async function randomRecipes(number_recipes, number_cooks) {
  for (i = 0; i < number_recipes; i++) {
    if (i % 100 === 0) print(i);
    const random_cook = Math.floor(Math.random() * number_cooks);
    const the_cook = "cook-" + random_cook + "@gmail.com";
    const random_meal = Math.floor(Math.random() * 6);
    const random_diet = Math.floor(Math.random() * 5);
    const random_cuisine = Math.floor(Math.random() * 6);
    const the_meal = THE_MEALS[random_meal];
    const the_diet = THE_DIETS[random_diet];
    const the_cuisine = THE_CUISINES[random_cuisine];
    const the_title = "title-" + i;
    const the_id = the_cook + "~" + the_title + "~";
    let zero_to_99 = i % 100;
    const the_minutes = zero_to_99;
    if (zero_to_99 < 10) {
      zero_to_99 = "0" + zero_to_99;
    }
    const the_search = " " + the_title + " " + zero_to_99 + " all ";
    const the_steps = the_search;

    const self_comment = the_id + the_cook + "~" + "comment-" + i;
    await Recipes_coll.create({
      _id: the_id,
      cook: the_cook,
      title: the_title,
      steps: the_steps,
      meal: the_meal,
      serves: "",
      time: "",
      internal: "",
      minutes: the_minutes,
      cuisine: the_cuisine,
      diet: the_diet,
      search: the_search,
      comments: [self_comment],
      ingredients: [{ ingredient: "egg", amount: "2" }],
    });

    await Comments_coll.create({
      _id: self_comment,
      by: the_cook,
    });
  }
}

async function createBigDb(num_recipes, number_cooks) {
  await clearDb();
  await randomRecipes(num_recipes, number_cooks);
  print(`There are ${num_recipes} recipes`);
  print(`There are ${number_cooks} cooks`);
  print(` -- Search 00 - 99`);
  print(` -- http://localhost:3000`);
  print(` -- http://localhost:3000/cook-51/gmail.com`);
  process.exit();
}

const number_recipes = 1000000; //        10
//const number_recipes = 100;      //       100
//const number_recipes = 1000;     //     1 000
//const number_recipes = 10000;    //    10 000
//const number_recipes = 100000;   //   100 000    2 minutes to make, keep cursor on terminal
//const number_recipes = 1000000;  // 1 000 000

const number_cooks = 10000;
createBigDb(number_recipes, number_cooks);
