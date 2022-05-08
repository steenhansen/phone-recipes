
//  cd rs
//  npm run test-single -- test-cjs-node/**/removeRecipe_has_comments.spec.cjs

// npm run test-node

const { MOCHA_CONFIG } = require('../mochaGlobal');
global.GLOBAL_CONFIG = MOCHA_CONFIG;

const { newRecipe, deleteRecipe } = require('../../mongoose-database/recipe-collections');
const { addComment } = require('../../mongoose-database/comment-collections');

require('../load-db.cjs');
const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);
const { expect } = chai;



const start_recipe = {
  _id: 'hwx772@gmail.com~-START-TITLE-~',
  cook: 'hwx772@gmail.com',
  search: ' -START-TITLE- steps ',
  comments: [],
  title: '-START-TITLE-',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
}

const new_comment = {
  recipe_id: 'hwx772@gmail.com~-START-TITLE-~',
  by: 'hwx772@gmail.com',
  remark: 'remark'
}


const changed_recipe = { acknowledged: true, deletedCount: 1 };

async function do_change_Title() {
  const d1 = await Recipes_coll.deleteMany()
  const d2 = await Comments_coll.deleteMany()
  const d3 = await newRecipe(start_recipe)

  const d4 = await addComment(new_comment);

  const d5 = await deleteRecipe('hwx772@gmail.com~-START-TITLE-~')


  return d5
}

describe('Recipe-Collections', () => {
  describe('#deleteRecipe - with comments', () => {
    it('returns how many deleted recipes', async () => {
      const result_update = await do_change_Title()
      expect(result_update).to.deep.equalInAnyOrder(changed_recipe);
    })
  })
})



