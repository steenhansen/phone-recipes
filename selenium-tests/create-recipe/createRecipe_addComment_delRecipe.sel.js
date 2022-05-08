/*
  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
        npm run dev ./selenium-tests/selenium-config.js

  terminal 2:
    cd /selenium-tests/

    node create-recipe/createRecipe_addComment_delRecipe.sel

    node all-selenium-tests

*/
const { print, testIdStrip } = require('../../import-2-require/common-2-require');
const TEST_RECIPE_NAME = 'selenium_createRecipe_addComment_delRecipe';
const TEST_TITLE_ID = testIdStrip(TEST_RECIPE_NAME);     //test-id-selenium_createRecipe_addComment_delRecipe

const { safeInitSelenium, stopDriver, deleteRecipe, idAlive, makeComment, buildRecipe, startDriver, assertRecipeCount, assertCommentCount, waitThenClick, clickId,textId, waitThenText } = require("../load-db-selenium");


async function createRecipe_addComment_delRecipe() {
  const sel_driver = await startDriver('/#selenium_createRecipe_addComment_delRecipe', TEST_RECIPE_NAME);
  try {
    await buildRecipe(sel_driver, TEST_RECIPE_NAME)
  // have a new record
    await waitThenClick(sel_driver, TEST_TITLE_ID);
    assertRecipeCount(1)

    await makeComment(sel_driver, TEST_RECIPE_NAME)
    await idAlive(sel_driver, TEST_RECIPE_NAME)
    assertCommentCount(1);




    await clickId(sel_driver, '_my-recipes_');

    

    await deleteRecipe(sel_driver, TEST_RECIPE_NAME)




   assertRecipeCount(0);
    assertCommentCount(0);
  } finally {
    await stopDriver(sel_driver);

  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await createRecipe_addComment_delRecipe();
    print("Finished - " + TEST_RECIPE_NAME);
  })();
}

module.exports = { createRecipe_addComment_delRecipe };
