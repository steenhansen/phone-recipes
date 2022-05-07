

/*

  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ./selenium-tests/selenium-config.js

  terminal 2:
    cd /selenium-tests/

    node minimal-deleted/minimal_deleted.sel

    node all-selenium-tests

*/


const { safeInitSelenium, waitForLoad, stopDriver, buildRecipe, startDriver, assertRecipeCount, waitThenClick, clickId, waitThenText } = require("../load-db-selenium");

const { testIdStrip } = require('../../import-2-require/common-2-require');





const TEST_RECIPE_NAME_0 = 'selenium_createRecipe_0';
const TEST_RECIPE_NAME_2 = 'selenium_createRecipe_2';

const TEST_TITLE_ID_0 = testIdStrip(TEST_RECIPE_NAME_0);     //test-id-selenium_createRecipe_1
const TEST_TITLE_ID_2 = testIdStrip(TEST_RECIPE_NAME_2);     //test-id-selenium_createRecipe_2

async function create2Minimal() {
  const sel_driver = await startDriver('/fake-test/gmail.com', TEST_RECIPE_NAME_0);

  try {
    await buildRecipe(sel_driver, TEST_RECIPE_NAME_0)
    assertRecipeCount(1)

    await buildRecipe(sel_driver, TEST_RECIPE_NAME_2)
    assertRecipeCount(2)

    await waitThenClick(sel_driver, TEST_TITLE_ID_0);

    await waitThenClick(sel_driver, TEST_TITLE_ID_2);


    await waitThenClick(sel_driver, '_view-kitchen_0');

    await waitForLoad(sel_driver, TEST_RECIPE_NAME_0);
    await waitForLoad(sel_driver, TEST_RECIPE_NAME_2);

  } finally {
    await stopDriver(sel_driver);
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await create2Minimal();
    console.log("Finished - " + TEST_TITLE_ID_0);
  })();
}

module.exports = { create2Minimal };

