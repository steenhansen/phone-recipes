//  cd /
//  npx vitest /test-jsx-browser/redux-store/reduxCommentRemove.test.mjs  --silent
//  npx vitest /test-jsx-browser/redux-store/reduxCommentRemove.test.mjs

//  npx vitest /test-jsx-browser --silent

// To see Type-Czech messages
// npx vitest /test-jsx-browser

import { VITEST_CONFIG } from "../vitestGlobal";
global.GLOBAL_CONFIG = VITEST_CONFIG;
import { reduxCommentRemove } from "../../redux-store/recipe-store.js";
import { expect, describe, it } from "vitest";

const start_state = {
  current_recipes: [],
  current_remarks: [
    {
      _id: "rpp294@gmail.com~asdsad44445555~tfx567@gmail.com~dddddddddddd7",
      by: "tfx567@gmail.com",
    },
  ],
};

const start_action = {
  type: "remove-comment",
  payload: "rpp294@gmail.com~asdsad44445555~tfx567@gmail.com~dddddddddddd7",
};
const actual_state = reduxCommentRemove(start_state, start_action);
const expected_state = {
  current_recipes: [],
  current_remarks: [], // comments are added on home page. Cook's page has the cook's commets
};

describe("Recipe-Collections", () => {
  describe("#removeComment", () => {
    it("#removeComment", () => {
      expect(actual_state).toEqual(expected_state);
    });
  });
});
