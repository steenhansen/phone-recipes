

/*

  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ./selenium-tests/selenium-config.js

  terminal 2:
    cd /selenium-tests/

    node retitle-recipe/reTitle_comment_delete.sel

    node all-selenium-tests

*/

const { safeInitSelenium, stopDriver, deleteRecipe, changeRecipeTitle, buildRecipe, idAlive, makeComment, startDriver, assertRecipeCount, assertCommentCount, waitThenClick, clickId, textId, waitThenText } = require("../load-db-selenium");
const { testIdStrip } = require('../../import-2-require/common-2-require');
const TEST_RECIPE_NAME = 's_r_title';
const TEST_NEW_NAME = 's_r_title--changed';
const TEST_TITLE_ID = testIdStrip(TEST_RECIPE_NAME);     //test-id-s_r_title

async function reTitle_comment_delete() {
  const sel_driver = await startDriver('/#selenium_createRecipe_addComment_delRecipe', TEST_RECIPE_NAME);
  try {

    await buildRecipe(sel_driver, TEST_RECIPE_NAME)
    assertRecipeCount(1)

    await clickId(sel_driver, TEST_TITLE_ID);

    await makeComment(sel_driver, TEST_RECIPE_NAME)
    await idAlive(sel_driver, TEST_RECIPE_NAME)
    assertCommentCount(1);









    await changeRecipeTitle(sel_driver,  TEST_NEW_NAME);
    assertRecipeCount(1);
    assertCommentCount(1);

    await deleteRecipe(sel_driver, TEST_NEW_NAME)
    assertCommentCount(0);
    assertRecipeCount(0);

  } finally {
    await stopDriver(sel_driver);
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await reTitle_comment_delete();
    console.log("Finished - " + TEST_RECIPE_NAME);
  })();
}

module.exports = { reTitle_comment_delete };

