//  cd /
// npm run test-node
//  npm run test-single -- test-cjs-node/**/reTitleRecipe_has_comments.spec.cjs

const { GLOBAL_CONFIG } = require("../node-config.cjs");
global.GLOBAL_CONFIG = GLOBAL_CONFIG;

const { newRecipe, reTitleRecipe } = require("../../mongoose-database/recipe-collections");
const { addComment } = require("../../mongoose-database/comment-collections");

require("../load-db.cjs");
const chai = require("chai");
const deepEqualInAnyOrder = require("deep-equal-in-any-order");
chai.use(deepEqualInAnyOrder);
const { expect } = chai;

const start_recipe = {
  old_title: "",
  _id: "wis447@gmail.com~OLD-TITLE~",
  cook: "wis447@gmail.com",
  search: " OLD-TITLE steps ",
  comments: [],
  title: "OLD-TITLE",
  steps: "steps",
  serves: "serves",
  time: "time",
  meal: "Lunch",
  cuisine: "French",
  diet: "Vegan",
  ingredients: [],
  internal: "145c",
  minutes: 12,
};
const new_comment = {
  recipe_id: "wis447@gmail.com~old-title~",
  by: "wis447@gmail.com",
  remark: "remark",
  title: "OLD-TITLE",
};

const change_title_recipe = {
  search: " -CHANGE-TITLE- steps ",
  title: "-CHANGE-TITLE-",
  _id: "wis447@gmail.com~-new-title-~",
  cook: "wis447@gmail.com",
  comments: [],
  steps: "steps",
  serves: "serves",
  time: "time",
  meal: "Lunch",
  cuisine: "French",
  diet: "Vegan",
  ingredients: [],
  internal: "145c",
  minutes: 12,
};

const expected_recipe = {
  _id: "wis447@gmail.com~-change-title-~",
  cook: "wis447@gmail.com",
  comments: ["wis447@gmail.com~-change-title-~wis447@gmail.com~remark"],
  search: " -change-title- steps ",
  title: "-CHANGE-TITLE-",
  steps: "steps",
  serves: "serves",
  time: "time",
  meal: "Lunch",
  cuisine: "French",
  diet: "Vegan",
  ingredients: [],
  internal: "145c",
  minutes: 12,
};

async function do_change_Title() {
  const d1 = await Recipes_coll.deleteMany();
  const d2 = await Comments_coll.deleteMany();
  const d3 = await newRecipe(start_recipe);
  const d4 = await addComment(new_comment);
  const result_update = await reTitleRecipe(change_title_recipe, "OLD-TITLE");
  return result_update;
}

describe("reTitleRecipe_has_comments.spec", () => {
  describe("#reTitleRecipe", () => {
    it("returns retitled recipe - with comments", async () => {
      const result_update = await do_change_Title();
      expect(result_update).to.deep.equalInAnyOrder(expected_recipe);
    });
  });
});
