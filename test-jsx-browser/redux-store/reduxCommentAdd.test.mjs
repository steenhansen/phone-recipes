//  cd /
//  npx vitest /test-jsx-browser/redux-store/reduxCommentAdd.test.mjs  --silent
//  npx vitest /test-jsx-browser/redux-store/reduxCommentAdd.test.mjs

//  npx vitest /test-jsx-browser --silent

// To see Type-Czech messages
// npx vitest /test-jsx-browser

import { VITEST_CONFIG } from "../vitestGlobal";
global.GLOBAL_CONFIG = VITEST_CONFIG;
import { reduxCommentAdd } from "../../redux-store/recipe-store.js";
import { expect, describe, it } from "vitest";

const start_state = {
  current_recipes: [
    {
      _id: "jjx342@gmail.com~the-title~",
      cook: "jjx342@gmail.com",
      title: "the-title",
      steps: "str",
      serves: "str",
      time: "str",
      meal: "str",
      cuisine: "str",
      diet: "str",
      internal: "str",
      search: "str",
      minutes: 17,
      ingredients: [],
      comments: [],
    },
  ],
  current_remarks: [],
};

const start_action = {
  type: "add-comment",
  payload: {
    recipe_id: "jjx342@gmail.com~the-title~",
    by: "mrt828@gmail.com",
    remark: "abcdefg",
  },
};
const actual_state = reduxCommentAdd(start_state, start_action);
const expected_state = {
  current_recipes: [
    {
      _id: "jjx342@gmail.com~the-title~",
      comments: ["jjx342@gmail.com~the-title~mrt828@gmail.com~abcdefg"],
      cook: "jjx342@gmail.com",
      title: "the-title",
      steps: "str",
      serves: "str",
      time: "str",
      meal: "str",
      cuisine: "str",
      diet: "str",
      internal: "str",
      search: "str",
      minutes: 17,
      ingredients: [],
    },
  ],
  current_remarks: [], // comments are added on home page. Cook's page has the cook's commets
};

describe("Recipe-Collections", () => {
  describe("#addComment", () => {
    it("#addComment", () => {
      expect(actual_state).toEqual(expected_state);
      //expect(actual_state).toEqual(expected_state);
    });
  });
});
