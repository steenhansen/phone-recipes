

/*

  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ./selenium-tests/selenium-config.js

  terminal 2:
    cd /selenium-tests/

    node create-recipe/createRecipe.sel

    node all-selenium-tests

*/



const { safeInitSelenium, stopDriver, buildRecipe, startDriver, assertRecipeCount, waitThenClick, clickId, waitThenText } = require("../load-db-selenium");

const { testIdStrip } = require('../../import-2-require/common-2-require');
const TEST_RECIPE_NAME = 'selenium_createRecipe';
const TEST_TITLE_ID = testIdStrip(TEST_RECIPE_NAME);     //test-id-selenium_createRecipe

async function createRecipe() {
  const sel_driver = await startDriver('/fake-test/gmail.com', TEST_RECIPE_NAME);
  try {
    await buildRecipe(sel_driver, TEST_RECIPE_NAME)
    assertRecipeCount(1)

    await waitThenClick(sel_driver, TEST_TITLE_ID)
  } finally {
    await stopDriver(sel_driver);
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await createRecipe();
    console.log("Finished - " + TEST_RECIPE_NAME);
  })();
}

module.exports = { createRecipe };

