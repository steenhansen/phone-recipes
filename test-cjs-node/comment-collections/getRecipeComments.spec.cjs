//  cd rs
//  npm run test-single -- test-cjs-node/**/getRecipeComments.spec.cjs
//  npm run test-node


const { MOCHA_CONFIG } = require('../mochaGlobal');
global.GLOBAL_CONFIG = MOCHA_CONFIG;

const { newRecipe } = require('../../mongoose-database/recipe-collections');
let { addComment, getRecipeComments } = require('../../mongoose-database/comment-collections');


require('../load-db.cjs');
const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);
const { expect } = chai;



const new_recipe = {
  _id: 'nfy374@gmail.com~OLD-TITLE~',
  cook: 'nfy374@gmail.com',
  comments: [],
  search: ' OLD-TITLE steps ',
  title: 'OLD-TITLE',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
}

const new_comment = {
  recipe_id: 'nfy374@gmail.com~OLD-TITLE~',
  by: 'nfy374@gmail.com',
  remark: 'remark'
}

const expected_result = [{
  _id: 'nfy374@gmail.com~OLD-TITLE~nfy374@gmail.com~remark',
  by: 'nfy374@gmail.com',
}];


async function do_get_Recipe_Comments() {
  await Recipes_coll.deleteMany()
  await Comments_coll.deleteMany()
  await newRecipe(new_recipe)
  await addComment(new_comment);
  const result_comments = await getRecipeComments('nfy374@gmail.com~OLD-TITLE~');
  return result_comments
}


describe('Comment-Collections', () => {
  describe('#getRecipeComments', () => {
    it('returns comments on a recipe', async () => {
      const result_update = await do_get_Recipe_Comments();
      expect(result_update).to.deep.equalInAnyOrder(expected_result);
    })
  })
})

