//NB https://www.selenium.dev/documentation/webdriver/browser/windows/

const { rootAppRequire, HTTP_PORT } = require("../import-2-require/common-2-require");
const { print } = require("../import-2-require/common-2-require");

const prog_root = `${__dirname}/..`;
const credentials_file = "/test-selenium/selenium-config.js";
const { GLOBAL_CONFIG } = rootAppRequire(prog_root, credentials_file);

global.GLOBAL_CONFIG = GLOBAL_CONFIG;
global.GLOBAL_CONFIG["G_TYPE_CZECH_ON"] = true;
global.GLOBAL_CONFIG["G_TYPE_CZECH_OPTIONS"] = ["LOG-ERRORS"];

const { countRecipes, getTestRecipes } = require("../mongoose-database/recipe-collections");
const { countComments, getTestComments } = require("../mongoose-database/comment-collections");
const { dbConnect } = require("../mongoose-database/mongo-database");
const the_collections = dbConnect(prog_root, credentials_file);
GLOBAL_CONFIG.G_RECIPES_COLLECTION = the_collections.Recipes_coll;
GLOBAL_CONFIG.G_COMMENTS_COLLECTION = the_collections.Comments_coll;
GLOBAL_CONFIG.G_UNCAUGHT_COLLECTION = the_collections.Uncaught_coll;

var assert = require("assert");
const { clearDb } = require("../mongoose-database/mongo-database");
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const FORGOT_TEST_DESIGNATION = "TEST SELENIUM WITH: npm run dev ../selenium-config.js in another terminal window";
const WAIT_LOAD_PAGE = 6789;

async function idText(sel_driver, id_with_text) {
  print("    A idText - getText()", id_with_text);
  const html_text = await sel_driver.findElement(By.id(id_with_text)).getText();
  return html_text;
}

async function waitForLoad(sel_driver, wait_for_id) {
  print("    waitForLoad - wait()", wait_for_id);
  await sel_driver.wait(until.elementLocated(By.id(wait_for_id)), WAIT_LOAD_PAGE);
}

async function idAlive(sel_driver, alive_id) {
  print("    idAlive - wait()", alive_id);
  await sel_driver.wait(until.elementLocated(By.id(alive_id)), WAIT_LOAD_PAGE);
}

async function clickId(sel_driver, click_id) {
  print("    clickId - click()", click_id);
  await sel_driver.findElement(By.id(click_id)).click();
}

async function textId(sel_driver, text_id, typed_text) {
  print("    301 textId - findElement()", text_id);
  const text_input = sel_driver.findElement(By.id(text_id));
  print("    302 textId - clear()");
  await text_input.clear();
  print("    303 textId - sendKeys()", typed_text);
  await text_input.sendKeys(typed_text, Key.ENTER);
  print("    304 textId - finished");
}

async function waitThenClick(sel_driver, click_id) {
  print("    201 waitThenClick - waitForLoad()", click_id);
  await waitForLoad(sel_driver, click_id);
  print("    202 waitThenClick - clickId()", click_id);
  await clickId(sel_driver, click_id);
  print("    203 waitThenClick - finished");
}

async function waitThenText(sel_driver, text_id, typed_text) {
  print("    401 waitThenText - waitForLoad()", text_id);
  await waitForLoad(sel_driver, text_id);
  print("    402 waitThenText - textId()", typed_text);
  await textId(sel_driver, text_id, typed_text);
  print("    403 waitThenText - finished");
}

async function buildRecipe(sel_driver, recipe_title) {
  print("    501 buildRecipe - clickId()", recipe_title);
  await clickId(sel_driver, "--create--recipe--");
  print("    502 buildRecipe - waitThenText() _recipe-title_", recipe_title);
  await waitThenText(sel_driver, "_recipe-title_", recipe_title);
  print("    503 buildRecipe - waitThenClick() --save--recipe--");
  await waitThenClick(sel_driver, "--save--recipe--");
  print("    504 buildRecipe - finished");
}

async function changeRecipeTitle(sel_driver, new_title) {
  print("    601 changeRecipeTitle - clickId() --edit--recipe--");
  await clickId(sel_driver, "--edit--recipe--");
  print("    602 changeRecipeTitle - textId() _recipe-title_", new_title);
  await textId(sel_driver, "_recipe-title_", new_title);
  print("    603 changeRecipeTitle - clickId() --save--recipe--");
  await clickId(sel_driver, "--save--recipe--");
  print("    604 changeRecipeTitle - finished");
}

async function deleteRecipe(sel_driver, recipe_title) {
  print("    101 deleteRecipe - waitThenClick()", recipe_title);
  await waitThenClick(sel_driver, recipe_title);
  print("    102 deleteRecipe - clickId() --edit--recipe--");
  await clickId(sel_driver, "--edit--recipe--");
  print("    103 deleteRecipe - clickId() --delete--recipe--");
  await clickId(sel_driver, "--delete--recipe--");
  print("    104 deleteRecipe - finished");
}

async function makeComment(sel_driver, comment_text) {
  print("    701 makeComment - textId()", comment_text);
  await textId(sel_driver, "--new--comment--text--", comment_text);
  print("    702 makeComment - clickId() --new--comment--add--");
  await clickId(sel_driver, "--new--comment--add--");
  print("    703 makeComment - finished");
}

async function safeInitSelenium() {
  await startDriver("/", "safeInitSelenium"); // for some reason this stops intermittent selenium test crashes, warm up?
}

async function stopDriver(sel_driver) {
  await sel_driver.quit();
}

async function startDriver(start_page, test_name) {
  let sel_driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  const start_driver = `http://localhost:${HTTP_PORT}${start_page}`;
  await sel_driver.get(start_driver);
  if (test_name !== "safeInitSelenium") {
    await clearDb();
  }
  return sel_driver;
}

async function checkDbRecipeCount(expected_recipes) {
  const num_recipes = await countRecipes();
  assert(num_recipes === expected_recipes);
}

async function testRecipes() {
  const test_recipes = await getTestRecipes();
  return test_recipes;
}

async function checkDbCommentCount(expected_comments) {
  const num_comments = await countComments();
  assert(num_comments === expected_comments);
}

async function testComments() {
  const test_comments = await getTestComments();
  return test_comments;
}

(async function ensureWebServerOn() {
  let sel_driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  let web_server = "no-web-server";
  setTimeout(() => {
    if (web_server === "no-web-server") {
      throw FORGOT_TEST_DESIGNATION; // sometimes 6.789 seconds was to small
    }
  }, WAIT_LOAD_PAGE);
  web_server = await sel_driver.get(`http://localhost:${HTTP_PORT}/`);
})();

const TRY_EN_MASSE = "\nTRY    node all-test-selenium    INSTEAD, DOES NOT SEEM TO CRASH? \n";
module.exports = {
  testRecipes,
  testComments,
  idText,
  safeInitSelenium,
  stopDriver,
  idAlive,
  makeComment,
  deleteRecipe,
  changeRecipeTitle,
  buildRecipe,
  startDriver,
  checkDbRecipeCount,
  checkDbCommentCount,
  WAIT_LOAD_PAGE,
  TRY_EN_MASSE,
  waitForLoad,
  clickId,
  textId,
  waitThenClick,
  waitThenText,
};
