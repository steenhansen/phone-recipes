
//NB https://www.selenium.dev/documentation/webdriver/browser/windows/
//   does not seem to work!


const { rootAppRequire, HTTP_PORT} = require("../import-2-require/common-2-require");
const { testIdStrip } = require('../import-2-require/common-2-require');

const prog_root = `${__dirname}/..`;
const credentials_file = '/selenium-tests/selenium-config.js';
const {GLOBAL_CONFIG} = rootAppRequire(prog_root, credentials_file);

global.GLOBAL_CONFIG = GLOBAL_CONFIG;
global.GLOBAL_CONFIG['G_TYPE_CZECH_ON']=true;
global.GLOBAL_CONFIG['G_TYPE_CZECH_OPTIONS']=['LOG-ERRORS'];

const { dbConnect } = require('../mongoose-database/mongo-database');
const the_collections = dbConnect(prog_root, credentials_file);
GLOBAL_CONFIG.G_RECIPES_COLLECTION=the_collections.Recipes_coll;
GLOBAL_CONFIG.G_COMMENTS_COLLECTION=the_collections.Comments_coll;
GLOBAL_CONFIG.G_UNCAUGHT_COLLECTION=the_collections.Uncaught_coll;

var assert = require('assert');

const { countRecipes } = require('../mongoose-database/recipe-collections');
const { countComments } = require('../mongoose-database/comment-collections');

const { clearDb } = require('../mongoose-database/mongo-database');

const {  Builder, Browser, By, Key, until} = require('selenium-webdriver');

const FORGOT_TEST_DESIGNATION = 'TEST SELENIUM WITH: npm run dev ../selenium-config.js in another terminal window';

const WAIT_LOAD_PAGE =6789;


async function stopDriver(sel_driver){
  await clearDb();
  await sel_driver.quit();
}

async function startDriver(start_page, test_name){
  let sel_driver = await new Builder().forBrowser(Browser.FIREFOX).build();
 const start_driver =  `http://localhost:${HTTP_PORT}${start_page}`;
  await sel_driver.get(start_driver);
  //console.log('about to clear the db ', test_name);
  await clearDb();
  //console.log('start test ', test_name);
  return sel_driver;
}

async function waitForLoad(sel_driver, wait_for_id){
  await sel_driver.wait(until.elementLocated(By.id(wait_for_id)), WAIT_LOAD_PAGE);
}

async function idAlive(sel_driver, alive_id){
  const test_id = testIdStrip(alive_id);  
  await sel_driver.wait(until.elementLocated(By.id(test_id)), WAIT_LOAD_PAGE);
}

async function clickId(sel_driver, click_id){
  await sel_driver.findElement(By.id(click_id)).click();
}

async function textId(sel_driver, text_id, typed_text){
  const text_input = sel_driver.findElement(By.id(text_id));
  await text_input.clear();
  await text_input.sendKeys(typed_text, Key.ENTER);
}

async function waitThenClick(sel_driver, click_id){
//  console.log('in async click-id', click_id)
  await waitForLoad(sel_driver, click_id);
  await clickId(sel_driver, click_id);
}

async function waitThenText(sel_driver, text_id, typed_text){
  await waitForLoad(sel_driver, text_id);
  await textId(sel_driver, text_id, typed_text);
}

async function buildRecipe(sel_driver, recipe_title){
  await clickId(sel_driver, '_create-recipe_');
  await waitThenText(sel_driver, '_recipe-title_', recipe_title)
  //console.log(' save_recipe 11111111111')
  await waitThenClick(sel_driver, '_save-recipe_')
 // await clickId(sel_driver, '_save-recipe_');
//have a new record
}

async function changeRecipeTitle(sel_driver, new_title){
  await clickId(sel_driver, '_edit-recipe_');
  await textId(sel_driver, '_recipe-title_', new_title);
  //console.log(' save_recipe 222222222222222')

  await clickId(sel_driver, '_save-recipe_');
  // have a changed record

}

async function deleteRecipe(sel_driver, recipe_title){
  const test_id = testIdStrip(recipe_title);  
  await waitThenClick(sel_driver, test_id)
  await clickId(sel_driver, '_edit-recipe_');
  await clickId(sel_driver, '_delete-recipe_');
}

async function makeComment(sel_driver, comment_text){
  await textId(sel_driver, '_new-comment-text_', comment_text);
  await clickId(sel_driver, '_new-comment-add_');

//we should check that it is actaully on the screen


}

async function safeInitSelenium(){
  await startDriver('/', 'for some reason this stops intermittent selenium test crashes');
}




async function assertRecipeCount(expected_recipes){
  const num_recipes = await countRecipes();
  assert(num_recipes === expected_recipes);
}

async function assertCommentCount(expected_comments){
  const num_comments = await countComments();
  assert(num_comments === expected_comments);
}

(async function ensureWebServerOn() {
  let sel_driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  let web_server = 'no-web-server';
  setTimeout(() => {
    if (web_server === 'no-web-server') {
      throw FORGOT_TEST_DESIGNATION        // sometimes 6.789 seconds was to small
    }
  }, WAIT_LOAD_PAGE)
  web_server = await sel_driver.get(`http://localhost:${HTTP_PORT}/`);
})();

const TRY_EN_MASSE = "\nTRY    node all-selenium-tests    INSTEAD, DOES NOT SEEM TO CRASH? \n";
module.exports = {safeInitSelenium, stopDriver, idAlive, makeComment, deleteRecipe, changeRecipeTitle, buildRecipe, startDriver, assertRecipeCount, assertCommentCount, WAIT_LOAD_PAGE, TRY_EN_MASSE, waitForLoad, clickId,textId, waitThenClick, waitThenText}

