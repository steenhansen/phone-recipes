/*
  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
        npm run dev ./test-selenium/selenium-config.js

  terminal 2:
    cd /test-selenium/

    node create-recipe/createRecipe_addComment_delRecipe.sel

    node all-selenium-tests

*/

const { safeInitSelenium, stopDriver, deleteRecipe, idAlive, makeComment, buildRecipe, startDriver,
  checkDbRecipeCount, checkDbCommentCount, waitThenClick, clickId } = require("../load-db-selenium");
const { print } = require('../../import-2-require/common-2-require');

const TEST_RECIPE_NAME = 'selenium_createRecipe_addComment_delRecipe';

async function createRecipe_addComment_delRecipe() {
  print("0 createRecipe_addComment_delRecipe - Start");
  const sel_driver = await startDriver('/#selenium_createRecipe_addComment_delRecipe', TEST_RECIPE_NAME);
  try {
    print("1 createRecipe_addComment_delRecipe - build recipe");
    await buildRecipe(sel_driver, TEST_RECIPE_NAME);
    // have a new record
    print("2 createRecipe_addComment_delRecipe - show recipe");
    await waitThenClick(sel_driver, 'test-id-selenium_createrecipe_addcomment_delrecipe--title--toggle--');

    print("3 createRecipe_addComment_delRecipe - assert 1 recipe");
    await checkDbRecipeCount(1);

    print("4 createRecipe_addComment_delRecipe - add comment to recipe");
    await makeComment(sel_driver, TEST_RECIPE_NAME);

    print("5 createRecipe_addComment_delRecipe - check expected comment");
    await idAlive(sel_driver, 'test-id-selenium_createrecipe_addcomment_delrecipe--title--toggle--');

    print("6 createRecipe_addComment_delRecipe - assert 1 comment");
    await checkDbCommentCount(1);

    print("7 createRecipe_addComment_delRecipe - goto cook page");
    await clickId(sel_driver, '--my--recipes--');

    print("8 createRecipe_addComment_delRecipe - delete recipe");
    await deleteRecipe(sel_driver, 'test-id-selenium_createrecipe_addcomment_delrecipe--title--toggle--');

    print("9 createRecipe_addComment_delRecipe - assert no recipe nor comment");
    await checkDbRecipeCount(0);
    await checkDbCommentCount(0);
  } finally {
    await stopDriver(sel_driver);
    print("10 createRecipe_addComment_delRecipe - Finished ");
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await createRecipe_addComment_delRecipe();

  })();
}

module.exports = { createRecipe_addComment_delRecipe };
