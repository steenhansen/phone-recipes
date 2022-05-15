//  cd rs
// npm run test-node
//  npm run test-single -- test-cjs-node/**/reTitleRecipe_no_comments.spec.cjs

const { GLOBAL_CONFIG } = require('../node-config.cjs');
global.GLOBAL_CONFIG = GLOBAL_CONFIG;

const { newRecipe, reTitleRecipe } = require('../../mongoose-database/recipe-collections');

require('../load-db.cjs');
const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);
const { expect } = chai;

const start_recipe = {
  old_title: '',
  _id: 'ahr348@gmail.com~-start-title-~',
  cook: 'ahr348@gmail.com',
  search: ' -START-TITLE- steps ',
  comments: [],
  title: 'OLD-TITLE',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
};

const change_title_recipe = {
  search: ' -START-TITLE- steps ',
  title: '-CHANGE-TITLE-',
  _id: 'ahr348@gmail.com~-new-title-~',
  cook: 'ahr348@gmail.com',
  comments: [],
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
};

const changed_recipe = {
  _id: 'ahr348@gmail.com~-change-title-~',
  cook: 'ahr348@gmail.com',
  comments: [],
  search: " -change-title- steps ",
  title: '-CHANGE-TITLE-',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
};

async function do_change_Title() {
  const d1 = await Recipes_coll.deleteMany();
  const d2 = await Comments_coll.deleteMany();
  const d3 = await newRecipe(start_recipe);
  const result_update = await reTitleRecipe(change_title_recipe, 'START-TITLE-');
  return result_update;
}

describe('reTitleRecipe_no_comments.spec', () => {
  describe('#reTitleRecipe', () => {
    it('returns retitled recipe - without comments', async () => {
      const result_update = await do_change_Title();
      expect(result_update).to.deep.equalInAnyOrder(changed_recipe);
    });
  });
});

