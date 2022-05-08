/*

  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ../selenium-config.js

  terminal 2:
    cd selenium-tests
    node all-selenium-tests

*/

global.en_masse_selenium = true;


const { print } = require('../import-2-require/common-2-require');

const { createRecipe } = require("./create-recipe/createRecipe.sel");
const { createRecipe_delRecipe } = require("./create-recipe/createRecipe_delRecipe.sel");
const { createRecipe_addComment_delRecipe } = require("./create-recipe/createRecipe_addComment_delRecipe.sel");

const { create2Minimal } = require("./minimal-deleted/minimal_deleted.sel");



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

  await create2Minimal();



  print("   .");
  await reTitle();
  print("   .");
  await reTitle_delete();
  print("   .");
  await reTitle_comment_delete();


  print("   .");
  print("   .");
  print("Finished - all-selenium-tests");
})();