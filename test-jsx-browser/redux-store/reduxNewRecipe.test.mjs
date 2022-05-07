
//  cd rs
//  npx vitest /test-jsx-browser/redux-store/reduxNewRecipe.test.mjs  --silent

//  npx vitest /test-jsx-browser --silent

// To see Type-Czech messages
// npx vitest /test-jsx-browser



import { VITEST_CONFIG } from '../vitestGlobal';
global.GLOBAL_CONFIG = VITEST_CONFIG;


import { reduxNewRecipe } from "../../redux-store/recipe-store.js";



import { expect, describe, it } from 'vitest'

const state = {
  current_recipes: [],
  current_remarks: []
};

const action = {
  type: 'new-recipe',
  payload: {
    _id: 'eij442@gmail.com~the-title~',
    cook: 'eij442@gmail.com',
    title: 'the-title',
    steps: 'str', serves: 'str', time: 'str', meal: 'str',
    cuisine: 'str', diet: 'str', internal: 'str', search: 'str',
    minutes: 17, ingredients: [], comments: []

  }
};
const actual_state = reduxNewRecipe(state, action);

const expected_state = {
  current_recipes: [{
    _id: 'eij442@gmail.com~the-title~',
    cook: 'eij442@gmail.com',
    title: 'the-title',
    steps: 'str', serves: 'str', time: 'str', meal: 'str',
    cuisine: 'str', diet: 'str', internal: 'str', search: 'str',
    minutes: 17, ingredients: [], comments: []
  }],
  current_remarks: []
};

describe('Recipe-Collections', () => {
  describe('#changeRecipe', () => {
    it('#changeRecipe', () => {
      expect(actual_state).toEqual(expected_state);
    })
  })
})

