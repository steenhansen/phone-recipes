/*
  https://www.selenium.dev/documentation/webdriver/elements/locators/

  terminal 1:
    cd /
        npm run dev ./test-selenium/selenium-config.js

  terminal 2:
    cd /test-selenium/

    node minimal-deleted/Recipe_20_multiple_blanks.sel.js

    node all-selenium-tests

*/

const {
  testRecipes,
  testComments,
  changeRecipeTitle,
  idText,
  safeInitSelenium,
  stopDriver,
  deleteRecipe,
  idAlive,
  makeComment,
  buildRecipe,
  startDriver,
  checkDbRecipeCount,
  checkDbCommentCount,
  waitThenClick,
  clickId,
} = require("../load-db-selenium");
var assert = require("assert");
const { print, testIdStrip, safeStrip } = require("../../import-2-require/common-2-require");

const FIRST_RECIPE_NAME = "  rec~ipe  WITH blanks~~  ";
const SECOND_RECIPE_NAME = "X  REC~IPE  with BLANKS~~  ";

const TOGGLE_ID = testIdStrip(FIRST_RECIPE_NAME) + "--title--toggle--";
// test-id-rec-ipewithblanks----title--toggle--

const FIRST_CASED_TITLE = safeStrip(FIRST_RECIPE_NAME);
// rec-ipe WITH blanks--

const FIRST_LOWER_TITLE = FIRST_CASED_TITLE.toLowerCase();
// rec-ipe with blanks--

const SECOND_CASED_TITLE = safeStrip(SECOND_RECIPE_NAME);
// X REC-IPE with BLANKS--

const SECOND_LOWER_TITLE = SECOND_CASED_TITLE.toLowerCase();
// x rec-ipe with blanks--

const A_COMMENT = " a ~~ COMMENT ~ ";
const CASED_COMMENT = safeStrip(A_COMMENT);
//  a -- COMMENT -

const THE_COMMENT_ID = testIdStrip(A_COMMENT) + "--comment--";
// test-id-a--comment---comment--

const FIRST_RECIPE_ID = "fake-test@gmail.com~" + FIRST_LOWER_TITLE + "~";
// fake-test@gmail.com~rec-ipe with blanks--~

const SECOND_RECIPE_ID = "fake-test@gmail.com~" + SECOND_LOWER_TITLE + "~";
// fake-test@gmail.com~x rec-ipe with blanks--~

const FIRST_COMMENT = "fake-test@gmail.com~" + FIRST_LOWER_TITLE + "~fake-test@gmail.com~" + CASED_COMMENT;
// fake-test@gmail.com~rec-ipe with blanks--~fake-test@gmail.com~a -- COMMENT -

const SECOND_COMMENT = "fake-test@gmail.com~" + SECOND_LOWER_TITLE + "~fake-test@gmail.com~" + CASED_COMMENT;
// fake-test@gmail.com~x rec-ipe with blanks--~fake-test@gmail.com~a -- COMMENT -

const FIRST_RECIPE_TOGGLE_ID = testIdStrip(FIRST_LOWER_TITLE) + "--title--toggle--";
// test-id-rec-ipewithblanks----title--toggle--

const SECOND_RECIPE_TOGGLE_ID = testIdStrip(SECOND_LOWER_TITLE) + "--title--toggle--";
// test-id-xrec-ipewithblanks----title--toggle--

async function recipe_20_multiple_blanks() {
  print("0 recipe_20_multiple_blanks - start");
  const sel_driver = await startDriver("/#recipe_20_multiple_blanks", FIRST_RECIPE_NAME);
  try {
    print("1 recipe_20_multiple_blanks - build recipe", FIRST_RECIPE_NAME);
    await buildRecipe(sel_driver, FIRST_RECIPE_NAME);
    print("2 recipe_20_multiple_blanks - assert 1 recipe");
    await checkDbRecipeCount(1);

    print("3 recipe_20_multiple_blanks - check correct recipe", FIRST_LOWER_TITLE);
    const first_recipe = await testRecipes();
    var { _id, cook, title } = first_recipe[0];
    assert(_id === FIRST_RECIPE_ID);
    assert(cook === "fake-test@gmail.com");
    assert(title === FIRST_CASED_TITLE);

    print("4 recipe_20_multiple_blanks - show recipe", TOGGLE_ID);
    const recipe_title = await idText(sel_driver, TOGGLE_ID);
    assert(recipe_title === FIRST_CASED_TITLE);

    print("5 recipe_20_multiple_blanks - show recipe", TOGGLE_ID);
    await waitThenClick(sel_driver, TOGGLE_ID);

    print("6 recipe_20_multiple_blanks - make comment", A_COMMENT);
    await makeComment(sel_driver, A_COMMENT);

    print("7 recipe_20_multiple_blanks - assert 1 comment");
    await checkDbCommentCount(1);

    print("8 recipe_20_multiple_blanks - goto cook page");
    await clickId(sel_driver, "--my--recipes--");

    print("9 recipe_20_multiple_blanks - check correct comment", THE_COMMENT_ID);
    await idAlive(sel_driver, THE_COMMENT_ID);

    print("10 recipe_20_multiple_blanks - check correct comment");
    const first_comment = await testComments();
    var { _id, by, title } = first_comment[0];
    assert(_id === FIRST_COMMENT);
    assert(by === "fake-test@gmail.com");
    assert(title === FIRST_CASED_TITLE);

    ///////////////////

    print("11  waitThenClick()", FIRST_RECIPE_TOGGLE_ID);
    await waitThenClick(sel_driver, FIRST_RECIPE_TOGGLE_ID);

    print("12 recipe_20_multiple_blanks - change recipe titlee", SECOND_RECIPE_NAME);
    await changeRecipeTitle(sel_driver, SECOND_RECIPE_NAME);

    print("13 recipe_20_multiple_blanks - check changed recipe title");
    const second_recipe = await testRecipes();
    var { _id, cook, title, comments } = second_recipe[0];
    assert(_id === SECOND_RECIPE_ID);
    assert(cook === "fake-test@gmail.com");
    assert(title === SECOND_CASED_TITLE);
    assert(comments[0] === SECOND_COMMENT);
    assert(comments.length === 1);

    print("14 recipe_20_multiple_blanks - check changed recipe comment");
    const second_comment = await testComments();
    var { _id, by, title } = second_comment[0];
    assert(_id === SECOND_COMMENT);
    assert(by === "fake-test@gmail.com");
    assert(title === SECOND_CASED_TITLE);

    print("15 recipe_20_multiple_blanks - delete recipe");
    await deleteRecipe(sel_driver, SECOND_RECIPE_TOGGLE_ID);

    print("16 recipe_20_multiple_blanks - assert no recipes");
    await checkDbRecipeCount(0);
    await checkDbCommentCount(0);
  } finally {
    await stopDriver(sel_driver);
    print("17 recipe_20_multiple_blanks - finished");
  }
}

if (!global.en_masse_selenium) {
  (async function () {
    await safeInitSelenium();
    await recipe_20_multiple_blanks();
  })();
}

module.exports = { recipe_20_multiple_blanks };
