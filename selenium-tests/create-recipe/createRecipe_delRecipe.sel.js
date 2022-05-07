/*

  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
        npm run dev ./selenium-tests/selenium-config.js

  terminal 2:
    cd /selenium-tests/

    node create-recipe/createRecipe_delRecipe.sel

    node all-selenium-tests

*/

const { safeInitSelenium, stopDriver, deleteRecipe, buildRecipe, startDriver, assertRecipeCount } = require("../load-db-selenium");

const TEST_RECIPE_NAME = 'selenium_createRecipe_delRecipe';

async function createRecipe_delRecipe() {
  const sel_driver = await startDriver('/#createRecipe', TEST_RECIPE_NAME);
  try {
    await buildRecipe(sel_driver, TEST_RECIPE_NAME)
    assertRecipeCount(1)
    await deleteRecipe(sel_driver, TEST_RECIPE_NAME)
    assertRecipeCount(0);
  } finally {
    await stopDriver(sel_driver);

  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await createRecipe_delRecipe();
    console.log("Finished - " + TEST_RECIPE_NAME);
  })();
}

module.exports = { createRecipe_delRecipe };
