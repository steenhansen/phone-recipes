//  cd /
//  npx vitest /test-jsx-browser/redux-store/reduxFilteredRecipes.test.mjs  --silent

//  npx vitest /test-jsx-browser --silent

// To see Type-Czech messages
// npx vitest /test-jsx-browser

import { VITEST_CONFIG } from "../vitestGlobal";
global.GLOBAL_CONFIG = VITEST_CONFIG;
import { reduxFilteredRecipes } from "../../redux-store/recipe-store.js";
import { expect, describe, it } from "vitest";

const state = {
  current_recipes: [
    {
      _id: "meg999@gmail.com~the-one~",
      cook: "meg999@gmail.com",
      title: "the-one",
      search: "str",
    },
    {
      _id: "cri167@gmail.com~the-two~",
      cook: "cri167@gmail.com",
      title: "the-two",
      search: "str",
    },
  ],
  current_remarks: [],
};

const action = {
  type: "filtered-recipes",
  payload: {
    sorted_recipes: [
      {
        _id: "zed333@gmail.com~the-three~",
        cook: "threeox@gmail.com",
        title: "the-three",
        search: "str",
      },
    ],
    count_recipes: 1,
  },
};
const actual_state = reduxFilteredRecipes(state, action);

const expected_state = {
  current_recipes: [
    {
      _id: "zed333@gmail.com~the-three~",
      cook: "threeox@gmail.com",
      title: "the-three",
      search: "str",
    },
  ],
  current_remarks: [],
  current_count: 1,
};

describe("Recipe-Collections", () => {
  describe("#changeRecipe", () => {
    it("#changeRecipe", () => {
      expect(actual_state).toEqual(expected_state);
    });
  });
});
