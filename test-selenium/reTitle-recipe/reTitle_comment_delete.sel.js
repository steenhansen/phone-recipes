/*

  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
    npm run dev ./test-selenium/selenium-config.js

  terminal 2:
    cd /test-selenium/

    node retitle-recipe/reTitle_comment_delete.sel

    node all-selenium-tests

*/

const {
  safeInitSelenium,
  stopDriver,
  deleteRecipe,
  changeRecipeTitle,
  buildRecipe,
  idAlive,
  makeComment,
  startDriver,
  checkDbRecipeCount,
  checkDbCommentCount,
  clickId,
} = require("../load-db-selenium");
const { print, testIdStrip } = require("../../import-2-require/common-2-require");
const TEST_RECIPE_NAME = "s_r_title";
const TEST_NEW_NAME = "s_r_title--changed";

async function reTitle_comment_delete() {
  print("0 reTitle_comment_delete - start");

  const sel_driver = await startDriver("/#selenium_createRecipe_addComment_delRecipe", TEST_RECIPE_NAME);
  try {
    print("1 reTitle_comment_delete - build recipe");
    await buildRecipe(sel_driver, TEST_RECIPE_NAME);

    print("2 reTitle_comment_delete - assert 1 recipe");
    await checkDbRecipeCount(1);

    print("3 reTitle_comment_delete - show entire recipe", "test-id-s_r_title--title--toggle--");
    await clickId(sel_driver, "test-id-s_r_title--title--toggle--");

    print("4 reTitle_comment_delete - add commet to recipe");
    await makeComment(sel_driver, TEST_RECIPE_NAME);

    print("5 reTitle_comment_delete - check expected comment");
    await idAlive(sel_driver, "test-id-s_r_title--comment--");

    print("6 reTitle_comment_delete - assert 1 comment");
    await checkDbCommentCount(1);

    print("7 reTitle_comment_delete - change recipe title");
    await changeRecipeTitle(sel_driver, TEST_NEW_NAME);

    print("8 reTitle_comment_delete -  assert 1 recipe");
    await checkDbRecipeCount(1);
    print("9 reTitle_comment_delete - assert 1 comment");
    await checkDbCommentCount(1);

    print("10 reTitle_comment_delete - delete recipe");
    await deleteRecipe(sel_driver, "test-id-s_r_title--changed--title--toggle--");

    print("11 createRecipe_addComment_delRecipe - assert no recipe nor comment");
    await checkDbCommentCount(0);
    await checkDbRecipeCount(0);
  } finally {
    await stopDriver(sel_driver);
    print("12 reTitle_comment_deleteFinished - finished");
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await reTitle_comment_delete();
  })();
}

module.exports = { reTitle_comment_delete };
