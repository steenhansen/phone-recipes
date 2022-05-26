/*
  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ./test-selenium/selenium-config.js

  terminal 2:
    cd /test-selenium/

    node create-recipe/createRecipe.sel

    node all-selenium-tests

*/
const { safeInitSelenium, stopDriver, buildRecipe, startDriver, checkDbRecipeCount, waitThenClick } = require("../load-db-selenium");
const { print } = require("../../import-2-require/common-2-require");
const TEST_RECIPE_NAME = "selenium_createRecipe";

async function createRecipe() {
  print("0 createRecipe - start");
  const sel_driver = await startDriver("/fake-test/gmail.com", TEST_RECIPE_NAME);
  try {
    print("1 createRecipe - build recipe");
    await buildRecipe(sel_driver, TEST_RECIPE_NAME);
    print("2 createRecipe - assert 1 recipe");
    await checkDbRecipeCount(1);

    print("3 createRecipe - check expected recipe");
    await waitThenClick(sel_driver, "test-id-selenium_createrecipe--title--toggle--");
  } finally {
    await stopDriver(sel_driver);
    print("4 createRecipe - finished");
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await createRecipe();
  })();
}

module.exports = { createRecipe };
