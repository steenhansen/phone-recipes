//  cd rs
//  npm run test-single -- test-cjs-node/**/getOneComment.spec.cjs
//  npm run test-node

const { GLOBAL_CONFIG } = require('../node-config.cjs');
global.GLOBAL_CONFIG = GLOBAL_CONFIG;

const { newRecipe } = require('../../mongoose-database/recipe-collections');
const { addComment, getOneComment } = require('../../mongoose-database/comment-collections');

require('../load-db.cjs');
const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);
const { expect } = chai;

const new_recipe = {
  _id: 'yyy333@gmail.com~old-title~',
  cook: 'yyy333@gmail.com',
  comments: [],
  search: ' OLD-TITLE steps ',
  title: 'OLD-TITLE',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
};

const new_comment = {
  recipe_id: 'yyy333@gmail.com~old-title~',
  by: 'yyy333@gmail.com',
  remark: 'remark',
  title: 'OLD-TITLE'
};

const expected_result = [{
  _id: 'yyy333@gmail.com~old-title~yyy333@gmail.com~remark',
  by: 'yyy333@gmail.com',
  title: 'OLD-TITLE'
}];

async function do_get_One_Comment() {
  await Recipes_coll.deleteMany();
  await Comments_coll.deleteMany();
  await newRecipe(new_recipe);
  await addComment(new_comment);
  const result_update = await getOneComment('yyy333@gmail.com~old-title~yyy333@gmail.com~remark');
  return result_update;
}

describe('getOneComment.spec', () => {
  describe('#getOneComment', () => {
    it('returns identified single comment', async () => {
      const result_update = await do_get_One_Comment();
      expect(result_update).to.deep.equalInAnyOrder(expected_result);
    })
  })
})

