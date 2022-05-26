import React from "react";
import { Provider } from "react-redux";
import { CookPageBoundary } from "./CookPage";
import { makeReduxStore } from "../../redux-store/recipe-store";
import { CreateContextProvider, FilterContextProvider, ServerContextProvider } from "../../server-app/serverBrowserContext";

export default {
  title: "Pages/CookPage",
  component: CookPageBoundary,
};

export const CookPage = () => {
  const init_redux_store2 = {
    current_recipes: [
      {
        _id: "x4e4r4@gmail.com~Gazpacho Soup~",
        cook: "x4e4r4@gmail.com",
        comments: [],
        search: " -serach",
        title: "Gazpacho Soup",
        steps: "steps",
        serves: "serves",
        time: "time",
        meal: "Lunch",
        cuisine: "French",
        diet: "Vegan",
        ingredients: [],
        internal: "145c",
        minutes: 12,
      },
    ],
    current_remarks: [{ _id: "a0b9c8@gmail.com~Somebody elses Gazpacho Soup~x4e4r4@gmail.com~Mine is hotter", by: "x4e4r4@gmail.com" }],
  };
  var recipe_store2 = makeReduxStore(init_redux_store2);

  const filter_variables = {
    setFilterText: (x) => x,
    setFilterMeal: (x) => x,
    setFilterCuisine: (x) => x,
    setFilterDiet: (x) => x,
    filter_meal: "",
    filter_cuisine: "",
    filter_diet: "",
    filter_text: "",
  };
  var server_variables = { shared_auth_email: "e2e4t7@gmail.com", url: "/" };
  var create_variables = { create_recipe: false, setCreateRecipe: (x) => x };
  return (
    <ServerContextProvider server_variables={server_variables}>
      <Provider store={recipe_store2}>
        <CreateContextProvider create_variables={create_variables}>
          <FilterContextProvider filter_variables={filter_variables}>
            <CookPageBoundary></CookPageBoundary>
          </FilterContextProvider>
        </CreateContextProvider>
      </Provider>
    </ServerContextProvider>
  );
};

export const Error_boundary_CookPage = () => {
  const init_redux_store2 = {
    current_recipes: [],
    current_remarks: [],
  };
  var recipe_store2 = makeReduxStore(init_redux_store2);

  const filter_variables = {
    setFilterText: (x) => x,
    setFilterMeal: (x) => x,
    setFilterCuisine: (x) => x,
    setFilterDiet: (x) => x,
    filter_meal: "",
    filter_cuisine: "",
    filter_diet: "",
    filter_text: "",
  };
  var server_variables = { shared_auth_email: "e2e4t7@gmail.com", url: "/" };
  var create_variables = { create_recipe: false, setCreateRecipe: (x) => x };
  return (
    <ServerContextProvider server_variables={server_variables}>
      <Provider store={recipe_store2}>
        <CreateContextProvider create_variables={create_variables}>
          <FilterContextProvider filter_variables={filter_variables}>
            <CookPageBoundary is_storybook={"boundary-crash"}></CookPageBoundary>
          </FilterContextProvider>
        </CreateContextProvider>
      </Provider>
    </ServerContextProvider>
  );
};
