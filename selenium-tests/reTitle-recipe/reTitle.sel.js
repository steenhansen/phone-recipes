

/*

  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ./selenium-tests/selenium-config.js

  terminal 2:
    cd /selenium-tests/

    node retitle-recipe/reTitle.sel

    node all-selenium-tests

*/
const { print, testIdStrip } = require('../../import-2-require/common-2-require');
const { safeInitSelenium, stopDriver, changeRecipeTitle, buildRecipe, startDriver, assertRecipeCount, waitThenClick, clickId, textId, waitThenText } = require("../load-db-selenium");
const TEST_RECIPE_NAME = 's_r_title';
const TEST_NEW_NAME = 's_r_title--changed';
const TEST_RECIPE_ID = testIdStrip(TEST_RECIPE_NAME);

async function reTitle() {
  const sel_driver = await startDriver('/#selenium_createRecipe_addComment_delRecipe', TEST_RECIPE_NAME);
  try {
    await buildRecipe(sel_driver, TEST_RECIPE_NAME)
    assertRecipeCount(1)

    await clickId(sel_driver, TEST_RECIPE_ID);
    await changeRecipeTitle(sel_driver, TEST_NEW_NAME);

    const new_test_id = testIdStrip(TEST_NEW_NAME);  
    await waitThenClick(sel_driver, new_test_id)
    assertRecipeCount(1);
  } finally {
    await stopDriver(sel_driver);
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await reTitle();
    print("Finished - " + TEST_RECIPE_NAME);
  })();
}

module.exports = { reTitle };

