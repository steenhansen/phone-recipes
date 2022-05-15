/*
  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ../selenium-config.js

  terminal 2:
    cd test-selenium
    node all-test-selenium

*/

global.en_masse_selenium = true;

const { print } = require('../import-2-require/common-2-require');
const { createRecipe } = require("./create-recipe/createRecipe.sel");
const { createRecipe_delRecipe } = require("./create-recipe/createRecipe_delRecipe.sel");
const { createRecipe_addComment_delRecipe } = require("./create-recipe/createRecipe_addComment_delRecipe.sel");
const { minimal_deleted } = require("./minimal-deleted/minimal_deleted.sel");
const { recipe_20_multiple_blanks } = require("./minimal-deleted/recipe_20_multiple_blanks.sel");
const { reTitle } = require("./reTitle-recipe/reTitle.sel");
const { reTitle_delete } = require("./reTitle-recipe/reTitle_delete.sel");
const { reTitle_comment_delete } = require("./reTitle-recipe/reTitle_comment_delete.sel");
const { safeInitSelenium } = require("./load-db-selenium");

(async function () {
  print(".");
  await safeInitSelenium();

  print(".");
  await createRecipe();
  print(".");
  await createRecipe_delRecipe();
  print(".");
  await createRecipe_addComment_delRecipe();
  print("   .");

  await minimal_deleted();

  print("   .");
  await recipe_20_multiple_blanks();

  print("   .");


  print("   .");
  await reTitle();
  print("   .");
  await reTitle_delete();
  print("   .");
  await reTitle_comment_delete();


  print("   .");
  print("   .");
  print("Finished - all-test-selenium - CLOSE ALL FIREFOX INSTANCES TO SAVE GIGABYTES ON HARDRIVE ! ");
})();