//  cd rs
//  npm run test-single -- test-cjs-node/**/deleteComment.spec.cjs
//  npm run test-node

const { GLOBAL_CONFIG } = require("../node-config.cjs");
global.GLOBAL_CONFIG = GLOBAL_CONFIG;

const { newRecipe } = require("../../mongoose-database/recipe-collections");
const { addComment, removeComment } = require("../../mongoose-database/comment-collections");

require("../load-db.cjs");
const chai = require("chai");
const deepEqualInAnyOrder = require("deep-equal-in-any-order");
chai.use(deepEqualInAnyOrder);
const { expect } = chai;

const new_recipe = {
  _id: "uyd349@gmail.com~OLD-TITLE~",
  cook: "uyd349@gmail.com",
  comments: [],
  search: " OLD-TITLE steps ",
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
  recipe_id: "uyd349@gmail.com~old-title~",
  by: "uyd349@gmail.com",
  remark: "remark",
  title: "OLD-TITLE",
};

const expected_result = {
  comments: [],
  _id: "uyd349@gmail.com~old-title~",
  cook: "uyd349@gmail.com",
  cuisine: "French",
  diet: "Vegan",
  ingredients: [],
  internal: "145c",
  meal: "Lunch",
  minutes: 12,
  search: " old-title steps ",
  serves: "serves",
  steps: "steps",
  time: "time",
  title: "OLD-TITLE",
};

const comment_id_to_delete = "uyd349@gmail.com~old-title~uyd349@gmail.com~remark";

async function do_delete_Comment() {
  await Recipes_coll.deleteMany();
  await Comments_coll.deleteMany();
  await newRecipe(new_recipe);
  await addComment(new_comment);
  const result_update = await removeComment(comment_id_to_delete);
  return result_update;
}

describe("deleteComment.spec", () => {
  describe("#removeComment", () => {
    it("returns recipe without deleted comment", async () => {
      const result_update = await do_delete_Comment();
      expect(result_update).to.deep.equalInAnyOrder(expected_result);
    });
  });
});
