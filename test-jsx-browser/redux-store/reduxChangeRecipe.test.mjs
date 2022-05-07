
//  cd rs
//  npx vitest /test-jsx-browser/redux-store/reduxChangeRecipe.test.mjs  --silent

//  npx vitest /test-jsx-browser --silent

// To see Type-Czech messages
// npx vitest /test-jsx-browser



import { VITEST_CONFIG } from '../vitestGlobal';
global.GLOBAL_CONFIG = VITEST_CONFIG;


import { reduxChangeRecipe } from "../../redux-store/recipe-store.js";



import { expect, describe, it } from 'vitest'

const state = {
  current_recipes: [{
    _id: 'ewq142@gmail.com~the-title~',
    cook: 'ewq142@gmail.com',
    title: 'the-title',
    steps: 'str', serves: 'str', time: 'str', meal: 'str',
    cuisine: 'str', diet: 'str', internal: 'str', search: 'str',
    minutes: 17, ingredients: [], comments: []
  }],
  current_remarks: [{
    _id: "bve815@gmail.com~asdsad44445555~bve815@gmail.com~dddddddddddd",
    by: "bve815@gmail.com"
  }]
};

const action = {
  type: 'change-recipe',
  payload: {
    edited_recipe: {
      _id: 'ewq142@gmail.com~the-title~',
      cook: 'ewq142@gmail.com',
      title: 'the-title',
      steps: 'str', serves: 'str', time: 'str', meal: 'str',
      cuisine: 'str', diet: 'str', internal: 'str', search: 'str',
      minutes: 17, ingredients: [], comments: []
    }
  }
};
const actual_state = reduxChangeRecipe(state, action);

const expected_state = {
  current_recipes: [{
    _id: 'ewq142@gmail.com~the-title~',
    cook: 'ewq142@gmail.com',
    title: 'the-title',
    steps: 'str', serves: 'str', time: 'str', meal: 'str',
    cuisine: 'str', diet: 'str', internal: 'str', search: 'str',
    minutes: 17, ingredients: [], comments: []
  }],
  current_remarks: [{
    _id: 'bve815@gmail.com~asdsad44445555~bve815@gmail.com~dddddddddddd',
    by: 'bve815@gmail.com'
  }]
};

describe('Recipe-Collections', () => {
  describe('#changeRecipe', () => {
    it('#changeRecipe', () => {
      expect(actual_state).toEqual(expected_state);
    })
  })
})

