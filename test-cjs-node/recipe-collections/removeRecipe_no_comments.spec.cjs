
//  cd rs
//  npm run test-single -- test-cjs-node/**/removeRecipe_no_comments.spec.cjs

// npm run test-node





const { MOCHA_CONFIG } = require('../mochaGlobal');
global.GLOBAL_CONFIG = MOCHA_CONFIG;

const { newRecipe, deleteRecipe } = require('../../mongoose-database/recipe-collections');

require('../load-db.cjs');
const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);
const { expect } = chai;


const start_recipe = {
  _id: 'fwk554@gmail.com~-START-TITLE-~',
  cook: 'fwk554@gmail.com',
  search: ' -START-TITLE- steps ',
  comments: [],
  title: '-START-TITLE-',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
}

const expected = { acknowledged: true, deletedCount: 1 }

async function do_change_Title() {
  const d1 = await Recipes_coll.deleteMany()
  const d2 = await Comments_coll.deleteMany()
  const d3 = await newRecipe(start_recipe)
  const d4 = await deleteRecipe('fwk554@gmail.com~-START-TITLE-~')
  return d4
}

describe('Recipe-Collections', () => {
  describe('#deleteRecipe - without comments', () => {
    it('returns how many deleted recipes', async () => {
      const actual = await do_change_Title()
      expect(actual).to.deep.equalInAnyOrder(expected);
    })
  })
})



