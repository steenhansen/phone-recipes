/*

  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ./test-selenium/selenium-config.js

  terminal 2:
    cd /test-selenium/

    node retitle-recipe/reTitle.sel

    node all-selenium-tests

*/
const { print } = require("../../import-2-require/common-2-require");
const {
  safeInitSelenium,
  stopDriver,
  changeRecipeTitle,
  buildRecipe,
  startDriver,
  checkDbRecipeCount,
  waitThenClick,
  clickId,
  waitThenText,
} = require("../load-db-selenium");
const TEST_RECIPE_NAME = "s_r_title";
const TEST_NEW_NAME = "s_r_title--changed";

async function reTitle() {
  print("0 reTitle - start");
  const sel_driver = await startDriver("/#selenium_createRecipe_addComment_delRecipe", TEST_RECIPE_NAME);
  try {
    print("1 reTitle - build recipe");
    await buildRecipe(sel_driver, TEST_RECIPE_NAME);
    print("2 reTitle - assert 1 recipe");
    await checkDbRecipeCount(1);

    print("3 reTitle - show entire recipe", "test-id-s_r_title--title--toggle--");
    await clickId(sel_driver, "test-id-s_r_title--title--toggle--");
    print("4 reTitle - change recipe of ", TEST_NEW_NAME);
    await changeRecipeTitle(sel_driver, TEST_NEW_NAME);

    print("5 reTitle - waitThenClick()", "test-id-s_r_title--changed--title--toggle--");
    await waitThenClick(sel_driver, "test-id-s_r_title--changed--title--toggle--");
    await checkDbRecipeCount(1);
  } finally {
    await stopDriver(sel_driver);
    print("6 reTitle - finished");
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await reTitle();
  })();
}

module.exports = { reTitle };
