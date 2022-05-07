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

const { createRecipe } = require("./create-recipe/createRecipe.sel");
const { createRecipe_delRecipe } = require("./create-recipe/createRecipe_delRecipe.sel");
const { createRecipe_addComment_delRecipe } = require("./create-recipe/createRecipe_addComment_delRecipe.sel");

const { create2Minimal } = require("./minimal-deleted/minimal_deleted.sel");



const { reTitle } = require("./reTitle-recipe/reTitle.sel");
const { reTitle_delete } = require("./reTitle-recipe/reTitle_delete.sel");
const { reTitle_comment_delete } = require("./reTitle-recipe/reTitle_comment_delete.sel");



const { safeInitSelenium } = require("./load-db-selenium");


(async function () {
  console.log(".");
  await safeInitSelenium();

  console.log(".");
  await createRecipe();
  console.log(".");
  await createRecipe_delRecipe();
  console.log(".");
  await createRecipe_addComment_delRecipe();
  console.log("   .");

  await create2Minimal();



  console.log("   .");
  await reTitle();
  console.log("   .");
  await reTitle_delete();
  console.log("   .");
  await reTitle_comment_delete();


  console.log("   .");
  console.log("   .");
  console.log("Finished - all-selenium-tests");
})();