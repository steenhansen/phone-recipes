/*
  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ./test-selenium/selenium-config.js

  terminal 2:
    cd /test-selenium/

    node minimal-deleted/minimal_deleted.sel

   node all-selenium-tests

*/
const { safeInitSelenium, waitForLoad, stopDriver, buildRecipe, startDriver, checkDbRecipeCount, waitThenClick, } = require("../load-db-selenium");
const { print } = require('../../import-2-require/common-2-require');

const TEST_RECIPE_NAME_0 = 'selenium_createRecipe_0';
const TEST_RECIPE_NAME_2 = 'selenium_createRecipe_2';

const TEST_TITLE_ID_0 = 'selenium_createRecipe_0--minimal--recipe--';
const TEST_TITLE_ID_2 = 'selenium_createRecipe_2--minimal--recipe--';

async function minimal_deleted() {
  print("0 minimal_deleted - start");
  const sel_driver = await startDriver('/fake-test/gmail.com', TEST_RECIPE_NAME_0);
  try {
    print("1 minimal_deleted - build recipe");
    await buildRecipe(sel_driver, TEST_RECIPE_NAME_0);
    print("2 minimal_deleted - assert 1 recipe");
    await checkDbRecipeCount(1);

    print("3 minimal_deleted - build recipe");
    await buildRecipe(sel_driver, TEST_RECIPE_NAME_2);
    print("4 minimal_deleted - assert 2 recipes");
    await checkDbRecipeCount(2);

    print("5 minimal_deleted - show recipe 1");
    await waitThenClick(sel_driver, 'test-id-selenium_createrecipe_0--title--toggle--');

    print("6 minimal_deleted - show recipe 2");
    await waitThenClick(sel_driver, 'test-id-selenium_createrecipe_2--title--toggle--');

    print("7 minimal_deleted - show 2 recipes in kitchen");

    await waitThenClick(sel_driver, '--view--kitchen--0');

    print("8 minimal_deleted - check recipe 1 is shown");
    await waitForLoad(sel_driver, TEST_TITLE_ID_0);
    print("9 minimal_deleted - check recipe 1 is shown");
    await waitForLoad(sel_driver, TEST_TITLE_ID_2);

  } finally {
    await stopDriver(sel_driver);
    print("10 minimal_deleted - finished");
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await minimal_deleted();

  })();
}

module.exports = { minimal_deleted };

