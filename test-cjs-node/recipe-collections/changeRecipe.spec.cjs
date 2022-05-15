//  cd rs
// npm run test-node
//  npm run test-single -- test-cjs-node/**/changeRecipe.spec.cjs

const { GLOBAL_CONFIG } = require('../node-config.cjs');
global.GLOBAL_CONFIG = GLOBAL_CONFIG;

const { newRecipe, changeRecipe } = require('../../mongoose-database/recipe-collections');

require('../load-db.cjs');
const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);
const { expect } = chai;

const start_recipe = {
  _id: 'lio111@gmail.com~-SAME-TITLE-~',
  cook: 'lio111@gmail.com',
  comments: [],
  search: ' -SAME-TITLE- steps ',
  title: '-SAME-TITLE-',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
};

const change_meal_recipe = {
  _id: 'lio111@gmail.com~-same-title-~',
  old_title: '-SAME-TITLE-',
  title: '-SAME-TITLE-',
  search: ' -same-title- steps ',
  cook: 'lio111@gmail.com',
  comments: [],
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Breakfast', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
};

async function do_change_Title() {
  const d1 = await Recipes_coll.deleteMany();
  const d2 = await Comments_coll.deleteMany();
  const d3 = await newRecipe(start_recipe);
  const result_update = await changeRecipe(change_meal_recipe);
  return result_update;
}

describe('changeRecipe.spec', () => {
  describe('#changeRecipe', () => {
    it('returns changed recipe', async () => {
      const result_update = await do_change_Title();
      expect(result_update).to.deep.equalInAnyOrder(change_meal_recipe);
    });
  });
});



