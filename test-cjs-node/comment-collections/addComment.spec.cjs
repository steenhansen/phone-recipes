
//  cd rs
//  npm run test-single -- test-cjs-node/**/addComment.spec.cjs
//  npm run test-node

const { GLOBAL_CONFIG } = require('../node-config.cjs');
global.GLOBAL_CONFIG = GLOBAL_CONFIG;

const { newRecipe } = require('../../mongoose-database/recipe-collections');
const { addComment } = require('../../mongoose-database/comment-collections');

require('../load-db.cjs');
const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);
const { expect } = chai;

const new_recipe = {
  _id: 'rwq143@gmail.com~OLD-TITLE~',
  cook: 'rwq143@gmail.com',
  comments: [],
  search: ' OLD-TITLE steps ',
  title: 'OLD-TITLE',
  steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
  ingredients: [], internal: '145c', minutes: 12
};

const new_comment = {
  recipe_id: 'rwq143@gmail.com~OLD-TITLE~',
  by: 'rwq143@gmail.com',
  remark: 'remark',
  title: 'OLD-TITLE'
};

const expected_result = {
  _id: 'rwq143@gmail.com~old-title~',
  cook: 'rwq143@gmail.com',
  title: 'OLD-TITLE',
  steps: 'steps',
  serves: 'serves',
  time: 'time',
  meal: 'Lunch',
  cuisine: 'French',
  diet: 'Vegan',
  internal: '145c',
  minutes: 12,
  ingredients: [],
  comments: [
    'rwq143@gmail.com~old-title~rwq143@gmail.com~remark'
  ],
  search: ' old-title steps ',
};

async function do_Add_Comment() {
  await Recipes_coll.deleteMany();
  await Comments_coll.deleteMany();
  await newRecipe(new_recipe);
  const result_update = await addComment(new_comment);
  return result_update;
}

describe('addComment.spec', () => {
  describe('#addComment', () => {
    it('returns recipe with added comment', async () => {
      const result_update = await do_Add_Comment();
      expect(result_update).to.deep.equalInAnyOrder(expected_result);
    });
  });
});

