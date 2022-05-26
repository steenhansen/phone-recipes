import React from "react";
import { RecipeSingleBoundary } from "./RecipeSingle";

export default {
  title: "Display/RecipeSingle",
  component: RecipeSingleBoundary,
};

export const RecipeSingle_three_ingredients = () => {
  const three_ingredients_recipe = {
    _id: "_id",
    cook: "r2c8a2@gmail.com",
    title: "title_x",
    steps: "steps",
    serves: "serves",
    time: "time",
    meal: "Lunch",
    cuisine: "French",
    diet: "Vegan",
    ingredients: [
      { ingredient: "flour", amount: "one cup" },
      { ingredient: "an apple", amount: "" },
      { ingredient: "milk", amount: "123ml" },
    ],
    internal: "145c",
    minutes: 12,
    comments: [],
    search: " s ",
  };
  return <RecipeSingleBoundary a_recipe={three_ingredients_recipe} is_minimal={false}></RecipeSingleBoundary>;
};

export const RecipeSingle_one_ingredient = () => {
  const one_ingredient_recipe = {
    _id: "_id",
    cook: "r2c8a2@gmail.com",
    title: "title_x",
    steps: "steps",
    serves: "serves",
    time: "time",
    meal: "Lunch",
    cuisine: "French",
    diet: "Vegan",
    ingredients: [{ ingredient: "flour", amount: "one cup" }],
    internal: "145c",
    minutes: 12,
    comments: [],
    search: " s ",
  };
  return <RecipeSingleBoundary a_recipe={one_ingredient_recipe} is_minimal={false}></RecipeSingleBoundary>;
};

export const RecipeSingle_no_ingredients = () => {
  const no_ingredient_recipe = {
    _id: "_id",
    cook: "r2c8a2@gmail.com",
    title: "title_x",
    steps: "1\n2\n3\n4",
    serves: "serves",
    time: "time",
    meal: "Lunch",
    cuisine: "French",
    diet: "Vegan",
    ingredients: [],
    internal: "145c",
    minutes: 12,
    comments: [],
    search: " s ",
  };
  return <RecipeSingleBoundary a_recipe={no_ingredient_recipe} is_minimal={false}></RecipeSingleBoundary>;
};

export const Error_boundary_RecipeSingle = () => {
  const no_ingredient_recipe = {
    _id: "_id",
    cook: "r2c8a2@gmail.com",
    title: "title_x",
    steps: "1\n2\n3\n4",
    serves: "serves",
    time: "time",
    meal: "Lunch",
    cuisine: "French",
    diet: "Vegan",
    ingredients: [],
    internal: "17",
    minutes: 12,
    comments: [],
    search: " s ",
  };
  return <RecipeSingleBoundary is_storybook={"boundary-crash"} a_recipe={no_ingredient_recipe} is_minimal={false}></RecipeSingleBoundary>;
};
