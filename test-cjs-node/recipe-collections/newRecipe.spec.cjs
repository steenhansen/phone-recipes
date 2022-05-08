//  cd rs
//  npm run test-single -- test-cjs-node/**/newRecipe.spec.cjs

// npm run test-node

const { MOCHA_CONFIG } = require('../mochaGlobal');
global.GLOBAL_CONFIG = MOCHA_CONFIG;

const { newRecipe } = require('../../mongoose-database/recipe-collections');


require('../load-db.cjs');
const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);
const { expect } = chai;


const new_recipe = {
  old_title: '',
  _id: 'tkq244@gmail.com~-NEW-TITLE-~',
  search: ' -NEW-TITLE- steps ',
  cook: 'tkq244@gmail.com',
  comments: [],
  title: '-NEW-TITLE-',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
}

const expected_new = {
  _id: 'tkq244@gmail.com~-NEW-TITLE-~',
  cook: 'tkq244@gmail.com',

  comments: [],
  search: " -new-title- steps ",
  title: '-NEW-TITLE-',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
}

async function do_new_Recipe() {
  await Recipes_coll.deleteMany()
  await Comments_coll.deleteMany()
  const new_result = await newRecipe(new_recipe)
  return new_result
}

describe('Recipe-Collections', () => {
  describe('#newRecipe', () => {
    it('returns new recipe', async () => {
      const result_new = await do_new_Recipe()
      expect(result_new).to.deep.equalInAnyOrder(expected_new);
    })
  })
})
