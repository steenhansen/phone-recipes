/*

  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
        npm run dev ./test-selenium/selenium-config.js

  terminal 2:
    cd /test-selenium/

    node create-recipe/createRecipe_delRecipe.sel

   node all-selenium-tests

*/
const { print } = require('../../import-2-require/common-2-require');
const { safeInitSelenium, stopDriver, deleteRecipe, buildRecipe, startDriver, checkDbRecipeCount } = require("../load-db-selenium");

const TEST_RECIPE_NAME = 'selenium_createRecipe_delRecipe';

async function createRecipe_delRecipe() {
  print("0 createRecipe_delRecipe - start");
  const sel_driver = await startDriver('/#createRecipe', TEST_RECIPE_NAME);
  try {
    print("1 createRecipe_delRecipe - build recipe");
    await buildRecipe(sel_driver, TEST_RECIPE_NAME);
    print("2 createRecipe_delRecipe - assert 1 recipe");
    await checkDbRecipeCount(1);
    print("3 createRecipe_delRecipe - delete recipe");
    await deleteRecipe(sel_driver, 'test-id-selenium_createrecipe_delrecipe--title--toggle--');
    print("4 createRecipe_delRecipe - assert 0 recipes");
    await checkDbRecipeCount(0);
  } finally {
    await stopDriver(sel_driver);
    print("5 createRecipe_delRecipe - finished");
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await createRecipe_delRecipe();

  })();
}

module.exports = { createRecipe_delRecipe };
