import React from "react";
import { Provider } from "react-redux";
import { HomePageBoundary } from "./HomePage";
import { makeReduxStore } from "../../redux-store/recipe-store";
import { CreateContextProvider, ServerContextProvider } from "../../server-app/serverBrowserContext";

export default {
  title: "Pages/HomePage",
  component: HomePageBoundary,
};

export const HomePage = () => {
  const init_redux_store2 = {
    current_recipes: [
      {
        _id: "x4e4r4@gmail.com~Gazpacho Soup A~",
        cook: "x4e4r4@gmail.com",
        comments: [],
        search: " -serach",
        title: "Gazpacho Soup A",
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
      {
        _id: "x4e4r4@gmail.com~Gazpacho Soup B~",
        cook: "x4e4r4@gmail.com",
        comments: [],
        search: " -serach",
        title: "Gazpacho Soup B",
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

  var server_variables = { shared_auth_email: "e2e4t7@gmail.com", url: "/" };
  var create_variables = { create_recipe: false, setCreateRecipe: (x) => x };
  return (
    <ServerContextProvider server_variables={server_variables}>
      <Provider store={recipe_store2}>
        <CreateContextProvider create_variables={create_variables}>
          <HomePageBoundary is_story_book_environment={true}></HomePageBoundary>
        </CreateContextProvider>
      </Provider>
    </ServerContextProvider>
  );
};

export const Error_boundary_HomePage = () => {
  const init_redux_store2 = {
    current_recipes: [],
    current_remarks: [],
  };
  var recipe_store2 = makeReduxStore(init_redux_store2);

  var server_variables = { shared_auth_email: "e2e4t7@gmail.com", url: "/" };
  var create_variables = { create_recipe: false, setCreateRecipe: (x) => x };
  return (
    <ServerContextProvider server_variables={server_variables}>
      <Provider store={recipe_store2}>
        <CreateContextProvider create_variables={create_variables}>
          <HomePageBoundary is_storybook={"boundary-crash"} is_story_book_environment={true}></HomePageBoundary>
        </CreateContextProvider>
      </Provider>
    </ServerContextProvider>
  );
};
