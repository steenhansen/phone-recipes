/*
  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ./test-selenium/selenium-config.js

  terminal 2:
    cd /test-selenium/

    node retitle-recipe/reTitle_delete.sel

   node all-selenium-tests

*/
const { print } = require('../../import-2-require/common-2-require');

const { safeInitSelenium, changeRecipeTitle, buildRecipe, deleteRecipe, startDriver, stopDriver,
  checkDbRecipeCount, clickId } = require("../load-db-selenium");
const TEST_RECIPE_NAME = 's_r_title';
const TEST_NEW_NAME = 's_r_title--changed';

async function reTitle_delete() {
  print("0 reTitle_delete - start");

  const sel_driver = await startDriver('/#selenium_createRecipe_addComment_delRecipe', TEST_RECIPE_NAME);
  try {
    print("1 reTitle_delete - build recipe");
    await buildRecipe(sel_driver, TEST_RECIPE_NAME);

    print("2 reTitle_delete - assert 1 recipe");
    await checkDbRecipeCount(1)

    print("3 reTitle_delete - show entire recipe", 'test-id-s_r_title--title--toggle--');
    await clickId(sel_driver, 'test-id-s_r_title--title--toggle--');

    print("4 reTitle_delete - change recipe of ", TEST_NEW_NAME);
    await changeRecipeTitle(sel_driver, TEST_NEW_NAME);

    print("5 reTitle_delete - assert still 1 recipe");
    await checkDbRecipeCount(1);

    print("6 reTitle_delete - delete recipe");
    await deleteRecipe(sel_driver, 'test-id-s_r_title--changed--title--toggle--');

    print("7 reTitle_delete - assert 0 recipes");
    await checkDbRecipeCount(0);
  } finally {
    await stopDriver(sel_driver);
    print("8 reTitle_delete - finished");
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await reTitle_delete();

  })();
}

module.exports = { reTitle_delete };

