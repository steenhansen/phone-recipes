//  cd rs

// npm run test-node


//  npm run test-single -- test-cjs-node/**/changeRecipe.spec.cjs


const { MOCHA_CONFIG } = require('../mochaGlobal');
global.GLOBAL_CONFIG = MOCHA_CONFIG;


require('../load-db.cjs');
const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);
const { expect } = chai;
const { newRecipe, changeRecipe } = require('../../mongoose-database/recipe-collections');

const start_recipe = {
  _id: 'lio111@gmail.com~-SAME-TITLE-~',
  cook: 'lio111@gmail.com',
  comments: [],
  search: ' -SAME-TITLE- steps ',
  title: '-SAME-TITLE-',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
}

const change_meal_recipe = {
  _id: 'lio111@gmail.com~-SAME-TITLE-~',
  old_title: '-SAME-TITLE-',
  title: '-SAME-TITLE-',
  search: ' -SAME-TITLE- steps ',
  cook: 'lio111@gmail.com',
  comments: [],
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Breakfast', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
}

async function do_change_Title() {
  const d1 = await Recipes_coll.deleteMany()
  const d2 = await Comments_coll.deleteMany()
  const d3 = await newRecipe(start_recipe)
  const result_update = await changeRecipe(change_meal_recipe)
  return result_update
}

describe('Recipe-Collections', () => {
  describe('#changeRecipe', () => {
    it('returns changed recipe', async () => {
      const result_update = await do_change_Title()
      expect(result_update).to.deep.equalInAnyOrder(change_meal_recipe);
    })
  })
})



